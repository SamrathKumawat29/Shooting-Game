// ==========================================
// Naval Combat Simulator
// Main JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // If we're not on the login page, do nothing.
  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", function (event) {
    // Stop page refresh
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (email === "" || password === "") {
      alert("Please fill in all fields.");

      return;
    }

    // Temporary Login
    // Later this will connect to FastAPI

    if (email === "admin@gmail.com" && password === "123456") {
      alert("Login Successful!");

      window.location.href = "menu.html";
    } else {
      alert("Invalid Email or Password!");
    }
  });
});
