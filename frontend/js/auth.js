// ================================
// AUTH.JS – Autenticação Firebase
// ================================

const auth = firebase.auth();

// Tradução de erros do Firebase para mensagens amigáveis
function traduzirErroFirebase(code) {
  const erros = {
    "auth/email-already-in-use": "Este e-mail já está em uso.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/user-disabled": "Usuário desativado.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
    "auth/popup-closed-by-user": "Login com Google cancelado.",
  };
  return erros[code] || "Erro ao processar a solicitação.";
}

// ================================
// LOGIN COM EMAIL/SENHA
// ================================
async function login(email, senha) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, senha);
    // Redireciona para o app
    window.location.href = "app.html";
    return userCredential.user;
  } catch (error) {
    throw new Error(traduzirErroFirebase(error.code));
  }
}

// ================================
// LOGIN COM GOOGLE (via popup)
// ================================
async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      console.log("Usuário Google logado:", result.user.email);
      // Redireciona para o app
      window.location.href = "app.html";
    }
  } catch (error) {
    alert(traduzirErroFirebase(error.code));
  }
}

// ================================
// REGISTRAR NOVO USUÁRIO
// ================================
async function register(email, senha) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    return userCredential.user;
  } catch (error) {
    throw new Error(traduzirErroFirebase(error.code));
  }
}

// ================================
// RESETAR SENHA
// ================================
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw new Error(traduzirErroFirebase(error.code));
  }
}

// ================================
// LOGOUT
// ================================
async function logout() {
  try {
    await auth.signOut();
    // Volta para a tela de login (index.html)
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
}


// ================================
// REGISTRAR NOVO USUÁRIO
// ================================
async function register(email, senha) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    return userCredential.user;
  } catch (error) {
    throw new Error(traduzirErroFirebase(error.code));
  }
}

// ================================
// RESETAR SENHA
// ================================
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw new Error(traduzirErroFirebase(error.code));
  }
}

// ================================
// LOGOUT
// ================================
async function logout() {
  try {
    await auth.signOut();
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
}
