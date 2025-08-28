from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber, re, tempfile
from fpdf import FPDF
from datetime import datetime
import uvicorn

app = FastAPI()

# 🔹 Ativar CORS (mantém liberado, pode restringir futuramente)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Servir frontend (index.html, manifest.json, sw.js, icons…)
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

# ---------- Funções auxiliares ----------
def is_product_line(line: str) -> bool:
    parts = line.strip().split()
    if not parts:
        return False
    if not parts[0].isdigit():
        return False
    if not re.search(r"\d+[.,]\d{2}", line):
        return False
    return True

def formatar_linha(line: str) -> str:
    parts = line.split()
    if len(parts) < 5:
        return line
    try:
        codigo1 = parts[0]
        codigo2 = parts[1]
        descricao = " ".join(parts[2:-5])
        unid = parts[-5]
        cod_barras = parts[-4]
        embalagem = parts[-3]
        preco_unit = parts[-2]
        preco_total = parts[-1]
        return f"{codigo1}|{codigo2}|{descricao}|{unid}|{cod_barras}|{embalagem}|{preco_unit}|{preco_total}"
    except Exception:
        return line

# ---------- Rotas ----------
@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile):
    items = []
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            rows = (page.extract_text() or "").split("\n")
            for line in rows:
                if is_product_line(line):
                    items.append({"item": formatar_linha(line)})
    return {"produtos": items}

@app.post("/gerar_pedido")
async def gerar_pedido(itens: str = Form(...)):
    itens = itens.split("|||")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 14)

    # Cabeçalho
    pdf.set_fill_color(0, 102, 204)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(190, 10, "PEDIDO FINAL", ln=True, align="C", fill=True)

    # Data
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", "", 10)
    data_pedido = datetime.now().strftime("%d/%m/%Y %H:%M")
    pdf.ln(5)
    pdf.cell(190, 6, f"Data: {data_pedido}", ln=1, align="R")
    pdf.ln(10)

    # Produtos
    pdf.set_font("Arial", "", 9)
    total = 0.0
    for line in itens:
        texto = line.encode("latin-1", "replace").decode("latin-1")
        texto = texto.replace("|", "  |  ")
        pdf.cell(190, 8, texto, ln=1, border=0)

        # linha divisória
        y = pdf.get_y()
        pdf.line(10, y, 200, y)

        try:
            valor = re.findall(r"\d+[.,]\d{2}", line)[-1]
            valor = valor.replace(",", ".")
            total += float(valor)
        except:
            pass

    # Total
    pdf.ln(5)
    pdf.set_font("Arial", "B", 12)
    pdf.cell(190, 8, f"TOTAL GERAL: R${total:,.2f}", ln=True, align="R")

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(tmp.name)
    return FileResponse(tmp.name, filename="pedido_final.pdf", media_type="application/pdf")

# ---------- Start ----------
if __name__ == "__main__":
    uvicorn.run("backend.backend:app", host="0.0.0.0", port=8000)
