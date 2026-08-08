async function loadDashboard() {
  const response = await fetch("http://127.0.0.1:8000/dashboard/");

  const data = await response.json();

  document.getElementById("users").innerText = data.totalUsers;

  document.getElementById("missions").innerText = data.missionsCompleted;

  document.getElementById("ships").innerText = data.shipsDestroyed;

  document.getElementById("accuracy").innerText = data.accuracy;

  document.getElementById("time").innerText = data.playTime;
}

loadDashboard();
