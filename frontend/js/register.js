const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = {
    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("https://shooting-game-ng0a.onrender.com/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {

      alert(data.message || "Registration successful!");

      window.location.href = "login.html";

    } else {

      alert(data.detail || "Registration failed.");

    }

  } catch (error) {

    console.error("Error:", error);

    alert("Cannot connect to backend.");
  }
});