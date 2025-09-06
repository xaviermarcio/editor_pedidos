# 📄 Editor de Pedidos (Frontend + Backend)

Sistema completo para **edição e gerenciamento de PDFs de pedidos** com autenticação, interface responsiva e suporte a PWA.

---

## 🚀 Funcionalidades

- Login com **Google** e **e-mail/senha** via Firebase Authentication.
- Reset de senha integrado ao Firebase.
- Upload e visualização de PDFs (compatível com **iPhone** e **Android** via PDF.js).
- PWA (Progressive Web App): pode ser instalado no celular/desktop.
- Frontend hospedado no **Firebase Hosting**.
- Backend em **Python (FastAPI)** para processar PDFs (precisa ser hospedado separadamente).

---

## 🖥️ Tecnologias utilizadas

### 🔹 Frontend
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![PDF.js](https://img.shields.io/badge/PDF.js-FF0000?style=for-the-badge&logo=mozilla&logoColor=white)](https://mozilla.github.io/pdf.js/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

### 🔹 Backend
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Uvicorn](https://img.shields.io/badge/Uvicorn-4B8BBE?style=for-the-badge&logo=python&logoColor=white)](https://www.uvicorn.org/)
[![FPDF](https://img.shields.io/badge/FPDF-000000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](http://www.fpdf.org/)
[![pdfplumber](https://img.shields.io/badge/pdfplumber-555555?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://github.com/jsvine/pdfplumber)

---

## 📂 Estrutura do projeto

```
/frontend      → Interface web (Firebase Hosting, PWA, PDF.js)
/backend       → API em Python (FastAPI) para processamento de PDFs
```

---

## ⚙️ Como rodar

### 🔹 Frontend (Firebase Hosting)
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPO.git
   ```
2. Vá até a pasta `frontend/`:
   ```bash
   cd frontend
   ```
3. Configure o Firebase (adicione seu `firebase-config.js`).
4. Deploy no Firebase:
   ```bash
   firebase deploy --only hosting
   ```

### 🔹 Backend (FastAPI)
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
4. Para hospedar:
   - Render, Railway ou Google Cloud Run.  
   - O `Procfile` já está pronto para produção.

---

## ⚠️ Observações importantes
- O arquivo `frontend/js/firebase-config.js` **não deve ser versionado** (está no `.gitignore`).  
- No repositório há um `firebase-config.example.js` que deve ser usado como modelo.  
- O **frontend funciona sozinho**, mas algumas funções dependem do **backend rodando**.

---

## 📷 Screenshots
*(adicione prints das telas principais do sistema aqui)*

---

## 📜 Licença
Este projeto foi desenvolvido para **estudo e prática** de integração **Frontend + Backend + Firebase**.
