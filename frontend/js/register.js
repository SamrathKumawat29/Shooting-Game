const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {
        const response = await fetch("https://shooting-game-ng0a.onrender.com/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);

        if (response.ok) {

            alert(data.message || "Registration successful!");

            window.location.href = "login.html";

        } else {

            // FastAPI errors use "detail"
            alert(data.detail || "Registration failed.");

        }

    } catch (error) {

        console.error("Error:", error);

        alert("Cannot connect to backend.");
    }
});
