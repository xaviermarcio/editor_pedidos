# 📄 Editor de Pedidos (Frontend + Backend)

Sistema completo para **edição e gerenciamento de PDFs de pedidos**, com **autenticação via Firebase**, **interface responsiva**, suporte a **PWA** e backend local em **FastAPI (Python)** para processamento de PDFs.

---

## 🟢 Status do Projeto

| Componente | Situação | Observação |
|-------------|-----------|-------------|
| **Frontend** | ✅ Hospedado no Firebase | Totalmente funcional (login, PWA, PDF.js) |
| **Backend** | ⚙️ Rodando localmente (localhost) | Não hospedado, usado apenas para testes e geração de PDFs |

---

## 🚀 Funcionalidades

- Login com **Google** e **e-mail/senha** via Firebase Authentication  
- Recuperação de senha integrada  
- Upload e visualização de PDFs (compatível com iPhone e Android via **PDF.js**)  
- Suporte a **PWA (Progressive Web App)** — instalável e com cache offline  
- Backend em **FastAPI (Python)** para leitura e geração de PDFs  
- Comunicação entre front e back via **localhost**

---

## 🖥️ Tecnologias utilizadas

### 🔹 Frontend
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![PDF.js](https://img.shields.io/badge/PDF.js-FF0000?style=for-the-badge&logo=mozilla&logoColor=white)](https://mozilla.github.io/pdf.js/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

### 🔹 Backend (uso local)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Uvicorn](https://img.shields.io/badge/Uvicorn-4B8BBE?style=for-the-badge&logo=python&logoColor=white)](https://www.uvicorn.org/)
[![FPDF](https://img.shields.io/badge/FPDF-000000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](http://www.fpdf.org/)
[![pdfplumber](https://img.shields.io/badge/pdfplumber-555555?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://github.com/jsvine/pdfplumber)

---

## 📂 Estrutura do projeto

```
/frontend      → Interface web (Firebase Hosting, PWA, PDF.js)
/backend       → API em Python (FastAPI) usada localmente
```

---

## ⚙️ Como rodar o projeto

### 🔹 Frontend (Firebase Hosting)
1. Clone o repositório:
   ```bash
   git clone https://github.com/xaviermarcio/editor_pedidos.git
   ```
2. Vá até a pasta `frontend/`:
   ```bash
   cd frontend
   ```
3. Configure o Firebase:
   - Crie `js/firebase-config.js` com suas credenciais (modelo em `firebase-config.example.js`)
4. Faça o deploy:
   ```bash
   firebase deploy --only hosting
   ```

### 🔹 Backend (FastAPI – uso local)
1. Vá até a pasta `backend/`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Rode localmente:
   ```bash
   uvicorn backend:app --reload
   ```
> ⚠️ O backend é usado **apenas localmente**.  
> Ele roda em **http://127.0.0.1:8000** e é utilizado para testes e processamento de PDFs.  
>
> ⚙️ No entanto, ele está **totalmente preparado para ser hospedado**, bastando usar o arquivo `requirements.txt` e o `Procfile` incluídos no projeto.  
> Pode ser facilmente publicado em plataformas como:
> - [Render](https://render.com) — hospedagem gratuita com suporte a FastAPI  
> - [Railway](https://railway.app) — integração simples e rápida  
> - [Deta Space](https://deta.space) — alternativa gratuita e leve  
> - [Google Cloud Run](https://cloud.google.com/run) — ideal para uso integrado ao Firebase  
> - [PythonAnywhere](https://www.pythonanywhere.com) — ótimo para pequenos projetos  
>
> Assim, quem clonar o repositório pode optar por rodar o backend localmente ou colocá-lo online, conforme a necessidade.

---

## 🧾 requirements.txt

```txt
fastapi
uvicorn
pdfplumber
fpdf2
python-multipart
```

---

## ⚠️ Observações importantes

- O arquivo `frontend/js/firebase-config.js` **não deve ser versionado** (está no `.gitignore`).  
- O `firebase-config.example.js` serve como modelo para credenciais.  
- O **frontend é funcional sozinho**, mas algumas funções dependem do **backend rodando localmente**.  
- O `.gitignore` do projeto já cobre cache, logs, `venv` e configs locais.

---

## 📜 Licença
Projeto desenvolvido por **Márcio Xavier** para **estudo e prática** de integração entre **Frontend (Firebase)** e **Backend (FastAPI)**.  
Distribuído livremente para fins **educacionais e pessoais**, com **créditos obrigatórios ao autor** em menções, forks ou redistribuições.

© 2025 — Márcio Xavier. Todos os direitos reservados.

