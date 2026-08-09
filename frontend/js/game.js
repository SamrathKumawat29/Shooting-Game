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

      velocity: 0,
      acceleration: 0.1,
      maxspeed: 4,
      friction: 0.98,
      radius: 35,
    };

    

    // ship image
    this.shipImg = new Image();
    this.shipImg.src = "../assets/ship.png";

    this.map = {
      left: -1000,
      right: 1000,
      top: -600,
      bottom: 600,
    };

    this.missileSystem = new MissileSystem();
    this.enemy = new enemy();
    this.maxAmmo = this.missileSystem.maxAmmo;
    this.missileAmmo = this.missileSystem.missileAmmo;
    this.reloadDuration = this.missileSystem.reloadDuration;
    this.reloadTimer = this.missileSystem.reloadTimer;
    this.fireCooldown = this.missileSystem.fireCooldown;
    this.missile = this.missileSystem.missiles;

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
    const dt = 0.03;
    this.time += dt;

    if (this.keys["w"]) {
      this.player.velocity += this.player.acceleration;
    }

    if (this.keys["s"]) {
      this.player.velocity -= this.player.acceleration;
    }

    if (this.player.velocity > this.player.maxspeed) {
      this.player.velocity = this.player.maxspeed;
    }

    if (this.player.velocity < -this.player.maxspeed) {
      this.player.velocity = -this.player.maxspeed;
    }

    this.missileSystem.update(dt, this.keys, this.player);
    this.missile = this.missileSystem.missiles;
    this.missileAmmo = this.missileSystem.missileAmmo;
    this.reloadTimer = this.missileSystem.reloadTimer;
    this.fireCooldown = this.missileSystem.fireCooldown;

    this.enemy.update(dt, this.player, this.map,this.missileSystem.missiles)
    

    this.player.velocity *= this.player.friction;

    this.player.x += Math.sin(this.player.angle) * this.player.velocity;
    this.player.y -= Math.cos(this.player.angle) * this.player.velocity;

    this.player.x = Math.max(
      this.map.left + this.player.radius,
      Math.min(this.player.x, this.map.right - this.player.radius),
    );
    this.player.y = Math.max(
      this.map.top + this.player.radius,
      Math.min(this.player.y, this.map.bottom - this.player.radius),
    );

    if (this.keys["a"]) this.player.angle -= 0.05;
    if (this.keys["d"]) this.player.angle += 0.05;
  }

  drawOcean() {
    this.ctx.save();

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.clip();

    // Camera
    this.ctx.translate(
      this.canvas.width / 2 - this.player.x,
      this.canvas.height / 2 - this.player.y,
    );

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(this.map.left, this.map.top, this.map.right - this.map.left, this.map.bottom - this.map.top);
    this.ctx.clip();

    this.ctx.fillStyle = "#0a3d62";
    this.ctx.fillRect(this.map.left, this.map.top, this.map.right - this.map.left, this.map.bottom - this.map.top);

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

    this.ctx.strokeStyle = "rgba(255,255,255,0.9)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(
      this.map.left,
      this.map.top,
      this.map.right - this.map.left,
      this.map.bottom - this.map.top,
    );
    
    

    // Ship
    this.ctx.save();

    this.ctx.translate(this.player.x, this.player.y);
    this.ctx.rotate(this.player.angle);
    

    this.ctx.drawImage(this.shipImg, -80, -70, 160, 140);

    this.ctx.restore();

    this.missileSystem.draw(this.ctx);
    this.enemy.draw(this.ctx)

    this.ctx.restore();
    this.ctx.restore();
  }

  drawUI() {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";

    this.ctx.fillText("Naval Combat Simulator", 20, 35);
    this.ctx.fillText("Move : W A S D", 20, 65);

    const panelX = 20;
    const panelY = 180;
    const panelWidth = 260;
    const panelHeight = 110;

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

    this.ctx.fillStyle = "#FFD166";
    this.ctx.font = "bold 18px Arial";
    this.ctx.fillText("Missile Status", panelX + 16, panelY + 28);

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Ammo : " + this.missileAmmo + " / " + this.maxAmmo,
      panelX + 16,
      panelY + 56,
    );

    const isReloading = this.reloadTimer > 0;
    const progress = isReloading
      ? Math.max(0, 1 - this.reloadTimer / this.reloadDuration)
      : 1;
    const barWidth = 180;
    const barHeight = 12;
    const barX = panelX + 16;
    const barY = panelY + 74;

    this.ctx.fillStyle = "rgba(255,255,255,0.2)";
    this.ctx.fillRect(barX, barY, barWidth, barHeight);

    this.ctx.fillStyle = isReloading ? "#FFB703" : "#2ECC71";
    this.ctx.fillRect(barX, barY, barWidth * progress, barHeight);

    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      isReloading ? "Reloading..." : "Ready to fire",
      barX,
      panelY + 96,
    );

    this.ctx.fillText(
      "Position : (" +
        Math.round(this.player.x) +
        ", " +
        Math.round(this.player.y) +
        ")",
      20,
      155,
    );

    this.ctx.restore();
  }

  draw() {
    this.drawOcean();
    this.drawUI();
  }
}
