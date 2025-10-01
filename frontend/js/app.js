firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "/frontend";
  }
});


// 🔗 URL do backend
const backendURL = "http://127.0.0.1:8000"; // troque pelo Railway/Render depois

// Upload PDF
async function uploadPDF() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    alert("Selecione um arquivo PDF.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const resp = await fetch(`${backendURL}/upload_pdf`, {
    method: "POST",
    body: formData
  });

  const data = await resp.json();
  const itensDiv = document.getElementById("itens");
  itensDiv.innerHTML = "";

  data.produtos.forEach((p, idx) => {
    const rowClass = idx % 2 === 0 ? "linha-branca" : "linha-cinza";
    const itemFormatado = p.item.replaceAll("|", "||");

    const div = document.createElement("div");
    div.className = rowClass + " form-check p-2";

    const precisaQtd = (p.empresa === "imperador" || p.empresa === "megafox");

    div.innerHTML = `
      <div class="d-flex flex-wrap align-items-start justify-content-between w-100">
        <div class="d-flex align-items-start flex-grow-1">
          <input class="form-check-input me-2" type="checkbox" id="item_${idx}" value="${p.item}">
          <label class="form-check-label item-label" for="item_${idx}">${itemFormatado}</label>
        </div>
        ${precisaQtd ? `
          <div class="d-flex align-items-center w-100 mt-2">
            <input type="number" 
                   class="form-control me-2" 
                   style="max-width:80px; flex-shrink:0;" 
                   min="1" value="1" 
                   id="qtd_${idx}">
            <span class="fw-bold">QTD</span>
          </div>
        ` : ""}
      </div>
    `;

    itensDiv.appendChild(div);
  });

  // Destacar linha quando selecionada
  document.querySelectorAll('.form-check-input').forEach(input => {
    input.addEventListener('change', function () {
      const parent = this.closest('.form-check');
      if (this.checked) {
        parent.classList.add('destacado');
      } else {
        parent.classList.remove('destacado');
      }
    });
  });
}

// Gerar Pedido Final
async function gerarPedido() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  if (!checkboxes.length) {
    alert("Selecione ao menos 1 item.");
    return;
  }

  const itens = Array.from(checkboxes).map(c => {
    const idx = c.id.split("_")[1];
    const qtdInput = document.getElementById(`qtd_${idx}`);
    const qtd = qtdInput ? qtdInput.value : 1;
    return `${c.value}||QTD=${qtd}`;
  }).join("|||");

  const formData = new FormData();
  formData.append("itens", itens);

  const resp = await fetch(`${backendURL}/gerar_pedido`, {
    method: "POST",
    body: formData
  });

  if (!resp.ok) {
    alert("Erro ao gerar pedido!");
    return;
  }

  const blob = await resp.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pedido_final.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
