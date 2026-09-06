const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = {
    email: document.getElementById("email").value,

    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("https://shooting-game-ng0a.onrender.com/dashboard/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      localStorage.setItem("username", data.username);

      window.location.href = "menu.html";
    } else {
      alert(data.detail);
    }
  } catch (error) {
    alert("Cannot connect to server.");
  }
});
