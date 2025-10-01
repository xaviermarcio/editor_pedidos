const senhaInput = document.getElementById("regSenha");
const checklist = document.getElementById("checklist");

senhaInput.addEventListener("focus", () => (checklist.style.display = "block"));
senhaInput.addEventListener("blur", () => {
  if (senhaInput.value === "") checklist.style.display = "none";
});

senhaInput.addEventListener("input", () => {
  const senha = senhaInput.value;
  document.getElementById("minChar").style.color =
    senha.length >= 6 ? "green" : "red";
  document.getElementById("upper").style.color = /[A-Z]/.test(senha)
    ? "green"
    : "red";
  document.getElementById("number").style.color = /\d/.test(senha)
    ? "green"
    : "red";
});

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const senha = document.getElementById("regSenha").value;
    const confirm = document.getElementById("regSenhaConfirm").value;

    if (senha !== confirm) {
      document.getElementById("registerMessage").innerText =
        "As senhas não coincidem.";
      return;
    }

    try {
      await register(email, senha);
      window.location.href = "index.html";
    } catch (error) {
      document.getElementById("registerMessage").innerText = error.message;
    }
  });
