const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = {
    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    password: document.getElementById("password").value,
  };

  const response = await fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  const data = await response.json();

  alert(data.message);

  if (response.ok) {
    window.location.href = "login.html";
  }
});
