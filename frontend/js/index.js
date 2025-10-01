document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  try {
    await login(email, senha);
    window.location.href = "app.html";
  } catch (error) {
    document.getElementById("loginMessage").innerText = error.message;
  }
});
