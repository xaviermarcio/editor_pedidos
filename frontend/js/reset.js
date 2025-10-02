document.getElementById('resetForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('resetEmail').value;
  try {
    await resetPassword(email);
    document.getElementById('resetMessage').classList.remove('text-danger');
    document.getElementById('resetMessage').classList.add('text-success');
    document.getElementById('resetMessage').innerText = 'E-mail de redefinição enviado!';
  } catch (error) {
    document.getElementById('resetMessage').innerText = error.message;
  }
});
F