class Game {
  constructor() {
    // Canvas
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Player
    this.player = {
      x: 0,
      y: 0,
      speed: 4,
      angle: 0,
    };

    // Animation
    this.time = 0;

    // Keyboard
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  update() {
    this.time += 0.03;

    if (this.keys["w"]) {
      this.player.x += this.player.speed * Math.sin(this.player.angle);
      this.player.y -= this.player.speed*Math.cos(this.player.angle);
    }
    if (this.keys["s"]) {
      this.player.x -= this.player.speed * Math.sin(this.player.angle);
      this.player.y += this.player.speed*Math.cos(this.player.angle);
    }
    if (this.keys["a"]) this.player.angle -= 0.05;
    if (this.keys["d"]) this.player.angle += 0.05;
  }

  drawOcean() {
    // Background
    this.ctx.fillStyle = "#0A3D62";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();

    // Camera
    this.ctx.translate(
      this.canvas.width / 2 - this.player.x,
      this.canvas.height / 2 - this.player.y,
    );

    // Animated Ocean Waves
    this.ctx.strokeStyle = "rgba(255,255,255,0.05)";
    this.ctx.lineWidth = 2;

    for (let y = -3000; y <= 3000; y += 40) {
      this.ctx.beginPath();

      for (let x = -3000; x <= 3000; x += 20) {
        let wave = Math.sin(x * 0.01 + this.time) * 6;

        this.ctx.lineTo(x, y + wave);
      }

      this.ctx.stroke();
    }

    // Ocean Grid
    this.ctx.strokeStyle = "rgba(255,255,255,0.08)";
    this.ctx.lineWidth = 1;

    for (let x = -3000; x <= 3000; x += 100) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, -3000);
      this.ctx.lineTo(x, 3000);
      this.ctx.stroke();
    }

    for (let y = -3000; y <= 3000; y += 100) {
      this.ctx.beginPath();
      this.ctx.moveTo(-3000, y);
      this.ctx.lineTo(3000, y);
      this.ctx.stroke();
    }

    // Ship
    this.ctx.save();

    this.ctx.translate(this.player.x, this.player.y);
    this.ctx.rotate(this.player.angle);
    
    

    // Ship Body
    this.ctx.fillStyle = "#D9D9D9";

    this.ctx.beginPath();
    this.ctx.moveTo(0, -30);
    this.ctx.lineTo(18, 20);
    this.ctx.lineTo(0, 10);
    this.ctx.lineTo(-18, 20);
    this.ctx.closePath();
    this.ctx.fill();

    // Deck
    this.ctx.fillStyle = "#666";
    this.ctx.fillRect(-6, -12, 12, 22);

    // Bridge
    this.ctx.fillStyle = "#999";
    this.ctx.fillRect(-4, -22, 8, 8);

    // Gun
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(-2, -35, 4, 12);

    this.ctx.restore();

    this.ctx.restore();
  }

  drawUI() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";

    this.ctx.fillText("Naval Combat Simulator", 20, 35);
    this.ctx.fillText("Move : W A S D", 20, 65);

    this.ctx.fillText(
      "Position : (" +
        Math.round(this.player.x) +
        ", " +
        Math.round(this.player.y) +
        ")",
      20,
      95,
    );
  }

  draw() {
    this.drawOcean();
    this.drawUI();
  }
}
