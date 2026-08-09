class enemy {
  constructor() {
    this.enemies = [];
    this.spawnTimer = 2; // first enemy appears after 2 seconds
    this.spawnInterval = 4; // then every 4 seconds
  }

  spawn(map) {
    const x = Math.random() * (map.right - map.left) + map.left;
    const y = Math.random() * (map.bottom - map.top) + map.top;

    this.enemies.push({
      x: x,
      y: y,
      angle: 0,
      speed: 1.5,
      radius: 30,
      health: 3,
    });
  }

  update(dt, player, map) {
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawn(map);
      this.spawnTimer = this.spawnInterval;
    }

    this.enemies.forEach((enemy) => {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      enemy.angle = Math.atan2(dx, -dy);

      enemy.x += Math.sin(enemy.angle) * enemy.speed;
      enemy.y -= Math.cos(enemy.angle) * enemy.speed;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#e63946";
    this.enemies.forEach((enemy) => {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.angle);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(12, 15);
      ctx.lineTo(-12, 15);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }
}