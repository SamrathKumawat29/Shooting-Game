class MissileSystem {
  constructor(maxAmmo = 6, reloadDuration = 3) {
    this.missiles = [];
    this.maxAmmo = maxAmmo;
    this.missileAmmo = this.maxAmmo;
    this.reloadDuration = reloadDuration;
    this.reloadTimer = 0;
    this.fireCooldown = 0;
  }

  update(dt, keys, player) {
    if (this.fireCooldown > 0) {
      this.fireCooldown -= dt;
    }

    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt;

      if (this.reloadTimer <= 0) {
        this.reloadTimer = 0;
        this.missileAmmo = this.maxAmmo;
      }
    }

    if (keys["r"] && this.reloadTimer <= 0 && this.missileAmmo < this.maxAmmo) {
      this.reloadTimer = this.reloadDuration;
    }

    if (keys[" "] && this.fireCooldown <= 0 && this.reloadTimer <= 0) {
      if (this.missileAmmo > 0) {
        this.missiles.push({
          x: player.x,
          y: player.y,
          angle: player.angle,
          speed: 8,
        });

        this.missileAmmo -= 1;
        this.fireCooldown = 0.18;
      } else {
        this.reloadTimer = this.reloadDuration;
      }
    }

    this.missiles.forEach((shot) => {
      shot.x += Math.sin(shot.angle) * shot.speed;
      shot.y -= Math.cos(shot.angle) * shot.speed;
    });

    this.missiles = this.missiles.filter((shot) => {
      return Math.abs(shot.x) < 3000 && Math.abs(shot.y) < 3000;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#FFB703";
    this.missiles.forEach((shot) => {
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
