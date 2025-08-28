# 🛒 Editor de Pedidos  

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)  
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com/)  
[![Deploy on Render](https://img.shields.io/badge/Render-Deployed-success.svg)](https://render.com)  
[![GitHub repo](https://img.shields.io/badge/GitHub-xaviermarcio/editor__pedidos-black.svg?logo=github)](https://github.com/xaviermarcio/editor_pedidos)

Aplicação que permite carregar PDFs de fornecedores, por exemplo um PDF com uma lista de produtos, onde você escolhe o itens da lista e salva em um PDF,ou seja, seleciona os produtos desejados e gera um **pedido final em PDF**.  
O sistema possui **frontend responsivo com PWA** e **backend em FastAPI**.  

---

## 📂 Estrutura do Projeto  

![Estrutura do Projeto](d88671cf-3540-4dd0-b872-75d6d6f284db.png)

```
EDITOR_PEDIDOS/
│── backend/
│   └── backend.py
│
│── frontend/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── index.html
│   ├── manifest.json
│   └── sw.js
│
│── .gitignore
│── Procfile
│── README.md
│── requirements.txt
│── runtime.txt
```

---

## 🚀 Tecnologias Utilizadas  

- **Backend** → FastAPI, Uvicorn, pdfplumber, fpdf, python-multipart  
- **Frontend** → HTML5, Bootstrap, JavaScript, PWA  
- **Infra** → GitHub Pages (frontend), Render (backend)  

---

## ▶️ Como rodar localmente  

1. Clone o repositório:
   ```bash
   git clone git@github.com:xaviermarcio/editor_pedidos.git
   cd editor_pedidos
   ```

2. Ative o ambiente virtual e instale dependências:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate   # (Windows)
   source venv/bin/activate # (Linux/Mac)
   pip install -r ../requirements.txt
   ```

3. Rode o servidor backend:
   ```bash
   uvicorn backend:app --reload
   ```

4. Abra o frontend:  
   Vá até `frontend/index.html` no navegador.  

---

## ☁️ Deploy  

### Backend (Render)
- Conectar o repositório ao Render  
- Build Command:
  ```bash
  pip install -r requirements.txt
  ```
- Start Command:
  ```bash
  uvicorn backend.backend:app --host 0.0.0.0 --port $PORT
  ```

### Frontend (GitHub Pages)
- Hospedar a pasta `frontend/` no GitHub Pages  
- Ajustar `fetch` no `index.html` para apontar para a URL do Render  

---

## 📱 PWA (Progressive Web App)  
- O sistema pode ser instalado no celular como aplicativo.  
- Inclui:
  - `manifest.json` (configuração do app)  
  - `sw.js` (service worker para cache offline)  
  - Ícones (`icon-192.png`, `icon-512.png`)  

---

## 📌 Roadmap Futuro
- Melhorias no design do PDF final  
- Autenticação por usuário  
- Dashboard com histórico de pedidos  
