from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from fpdf import FPDF
import uvicorn
import tempfile
from datetime import datetime
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Detectar Empresa
# ---------------------------
def detect_empresa(text: str) -> str:
    text_upper = text.upper()
    if "MEGAFOX" in text_upper:
        return "megafox"
    elif "IMPERADOR" in text_upper or "FLORBEL" in text_upper:
        return "imperador"
    elif "RIO VERMELHO" in text_upper:
        return "rio_vermelho"
    return "rio_vermelho"  # padrão


# ---------------------------
# Regras de filtro por empresa
# ---------------------------
def is_product_line(line: str, empresa: str) -> bool:
    line = line.strip()
    if not line:
        return False

    if empresa == "rio_vermelho":
        return line.split()[0].isdigit() and re.search(r"\d+[.,]\d{2}", line)

    elif empresa == "megafox":
        return (
            line.split()[0].isdigit()
            and re.search(r"\d{10,13}", line)
            and re.search(r"\d+[.,]\d{2}", line)
        )

    elif empresa == "imperador":  # inclui Florbel
        return (
            line.split()[0].isdigit()
            and re.search(r"\d{10,13}", line)
            and re.search(r"\d+[.,]\d{2}", line)
        )

    return False


# ---------------------------
# Parsers específicos
# ---------------------------
def parse_rio_vermelho(line: str) -> str:
    parts = line.split()
    if len(parts) < 8:
        return line
    try:
        return " | ".join(parts)
    except Exception:
        return line


def parse_megafox(line: str) -> str:
    parts = line.split()
    if len(parts) < 6:
        return line
    try:
        codigo = parts[0]
        descricao = " ".join(parts[1:-4])
        un = parts[-4]
        vlr_cx = parts[-3]
        cod_barras = parts[-2]
        vlr_unit = parts[-1]  # preço unitário correto
        return f"{codigo}|{descricao}|{un}|{vlr_cx}|{cod_barras}|{vlr_unit}|MEGAFOX"
    except Exception:
        return line


def parse_imperador(line: str) -> str:  # Imperador e Florbel compartilham parser
    parts = line.split()
    if len(parts) < 6:
        return line
    try:
        codigo = parts[0]
        descricao = " ".join(parts[1:-4])
        un = parts[-4]
        vlr_cx = parts[-3]
        cod_barras = parts[-2]
        vlr_unit = parts[-1]
        return f"{codigo}|{descricao}|{un}|{vlr_cx}|{cod_barras}|{vlr_unit}|IMPERADOR"
    except Exception:
        return line


# ---------------------------
# Upload e Processamento
# ---------------------------
@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile):
    items = []
    empresa_detectada = "rio_vermelho"

    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            if text.strip():
                empresa_detectada = detect_empresa(text)

            rows = text.split("\n")
            for line in rows:
                if not is_product_line(line, empresa_detectada):
                    continue

                if empresa_detectada == "rio_vermelho":
                    parsed = parse_rio_vermelho(line)
                elif empresa_detectada == "megafox":
                    parsed = parse_megafox(line)
                elif empresa_detectada == "imperador":  # inclui Florbel
                    parsed = parse_imperador(line)
                else:
                    parsed = line

                if parsed:
                    items.append({"item": parsed, "empresa": empresa_detectada})

    print(f"➡️ Empresa: {empresa_detectada} | Produtos encontrados: {len(items)}")
    return {"produtos": items}


# ---------------------------
# Gerar Pedido Final
# ---------------------------
@app.post("/gerar_pedido")
async def gerar_pedido(itens: str = Form(...)):
    itens = itens.split("|||")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 14)

    # Cabeçalho
    pdf.set_fill_color(25, 135, 84)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(190, 10, "PEDIDO - Hortifruti La Rose - CNPJ:37.319.385/0001-64", ln=True, align="C", fill=True)

    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", "", 10)
    data_pedido = datetime.now().strftime("%d/%m/%Y %H:%M") + " - Michele Moreira"
    pdf.ln(5)
    pdf.cell(190, 6, f"Data: {data_pedido}", ln=1, align="R")
    pdf.ln(10)

    # Itens
    pdf.set_font("Arial", "", 9)
    total = 0.0
    for line in itens:
        qtd_editada = 1
        if "||QTD=" in line:
            produto, qtd = line.split("||QTD=")
            qtd_editada = int(qtd)
        else:
            produto = line

        texto = produto.encode("latin-1", "replace").decode("latin-1")
        texto = texto.replace("|", "|")

        # 🔹 Mostrar UN no Imperador
        if "IMPERADOR" in produto.upper():
            qtd_texto = f"QTD: {qtd_editada} UN"
        else:
            qtd_texto = f"QTD: {qtd_editada}"

        if "MEGAFOX" in produto.upper():
            # Megafox → quebra de linha automática
            pdf.multi_cell(190, 8, f"{texto} | {qtd_texto}", border=0)
            pdf.ln(2)      # espaço extra opcional
            pdf.set_x(10)  # volta para a margem esquerda
        else:
            # Rio Vermelho e Imperador → seguem iguais
            pdf.cell(190, 8, f"{texto} | {qtd_texto}", ln=1, border=0)
            y = pdf.get_y()
            pdf.line(10, y, 200, y)

        try:
            valores = re.findall(r"\d+[.,]\d{2}", produto)
            if valores:
                preco_unit = float(valores[-1].replace(",", ".").replace("$", ""))
                total += preco_unit * qtd_editada
        except:
            pass

    pdf.ln(5)
    pdf.set_font("Arial", "B", 12)
    pdf.cell(190, 8, f"TOTAL GERAL: R${total:,.2f}", ln=True, align="R")

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(tmp.name)
    return FileResponse(tmp.name, filename="pedido_final.pdf", media_type="application/pdf")


if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
