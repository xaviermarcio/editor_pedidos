const senhaInput = document.getElementById("regSenha");
const senhaConfirmInput = document.getElementById("regSenhaConfirm");
const checklist = document.getElementById("checklist");
const registerMessage = document.getElementById("registerMessage");

// Mostra/esconde checklist e valida em tempo real
senhaInput.addEventListener("input", () => {
  if (senhaInput.value.length > 0) {
    checklist.style.display = "block";
  } else {
    checklist.style.display = "none";
  }

  document.getElementById("minChar").style.color =
    senhaInput.value.length >= 6 ? "green" : "red";

  document.getElementById("upper").style.color = /[A-Z]/.test(senhaInput.value)
    ? "green"
    : "red";

  document.getElementById("number").style.color = /[0-9]/.test(senhaInput.value)
    ? "green"
    : "red";
});

// Confirmação de senha em tempo real
senhaConfirmInput.addEventListener("input", () => {
  if (senhaConfirmInput.value.length > 0) {
    if (senhaConfirmInput.value !== senhaInput.value) {
      registerMessage.innerText = "❌ As senhas não coincidem";
      registerMessage.classList.remove("text-success");
      registerMessage.classList.add("text-danger");
    } else {
      registerMessage.innerText = "✅ Senhas coincidem";
      registerMessage.classList.remove("text-danger");
      registerMessage.classList.add("text-success");
    }
  } else {
    registerMessage.innerText = "";
  }
});

// Cadastro no Firebase
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value;
    const senha = senhaInput.value;
    const senhaConfirm = senhaConfirmInput.value;

    // Verifica se senhas coincidem antes de cadastrar
    if (senha !== senhaConfirm) {
      registerMessage.innerText = "❌ As senhas não coincidem";
      registerMessage.classList.remove("text-success");
      registerMessage.classList.add("text-danger");
      return;
    }

    try {
      // Função register() vem do seu auth.js
      const user = await register(email, senha);

      registerMessage.innerText = "✅ Cadastro realizado com sucesso!";
      registerMessage.classList.remove("text-danger");
      registerMessage.classList.add("text-success");

      // Redireciona após 2 segundos
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {
      registerMessage.innerText = "❌ " + error.message;
      registerMessage.classList.remove("text-success");
      registerMessage.classList.add("text-danger");
    }
  });
