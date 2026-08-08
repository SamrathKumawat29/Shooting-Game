class EnemySystem {
  constructor() {
    this.enemies = [];
  }

  spawnEnemy(options = {}) {
    const enemy = {
      x: options.x ?? 0,
      y: options.y ?? 0,
      speed: options.speed ?? 1.5,
      angle: options.angle ?? 0,
      health: options.health ?? 100,
    };

    this.enemies.push(enemy);
    return enemy;
  }

  update(dt, player) {
    this.enemies.forEach((enemy) => {
      enemy.angle = Math.atan2(player.x - enemy.x, -(player.y - enemy.y));
      enemy.x += Math.sin(enemy.angle) * enemy.speed * dt * 60;
      enemy.y -= Math.cos(enemy.angle) * enemy.speed * dt * 60;
    });

    this.enemies = this.enemies.filter((enemy) => {
      return Math.abs(enemy.x) < 3000 && Math.abs(enemy.y) < 3000;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#E63946";

    this.enemies.forEach((enemy) => {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.angle);

      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(10, 8);
      ctx.lineTo(0, 4);
      ctx.lineTo(-10, 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#F1FAEE";
      ctx.fillRect(-3, -4, 6, 6);
      ctx.restore();

      ctx.fillStyle = "#E63946";
    });
  }
}
