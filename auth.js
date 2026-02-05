// ============================
// SISTEMA AUTH SIMPLE
// ============================

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const msg = document.getElementById("msg");

// ============================
// REGISTRO
// ============================

registerBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    msg.textContent = "Completa todos los campos";
    return;
  }

  // Guardamos usuario
  const user = { email, password };
  localStorage.setItem("user", JSON.stringify(user));

  msg.textContent = "Usuario registrado ✔";
  console.log("Usuario guardado:", user);
});

// ============================
// LOGIN
// ============================

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    msg.textContent = "No existe usuario registrado";
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("session", "active");
    console.log("Login correcto ✔");
    window.location.href = "cars.html";
  } else {
    msg.textContent = "Credenciales incorrectas";
  }
});
