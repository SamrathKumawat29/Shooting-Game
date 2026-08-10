class Ship {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 4;
    this.angle = 0;

    this.velocity = 0;
    this.acceleration = 0.1;
    this.maxspeed = 4;
    this.friction = 0.98;
    this.radius = 35;
    
    this.health = 100;
    this.maxHealth = 100;

    this.shipImg = new Image();
    this.shipImg.src = "../assets/ship.png";
  }

  update(keys, map) {
    if (keys["w"]) {
      this.velocity += this.acceleration;
    }

    if (keys["s"]) {
      this.velocity -= this.acceleration;
    }

    if (this.velocity > this.maxspeed) {
      this.velocity = this.maxspeed;
    }

    if (this.velocity < -this.maxspeed) {
      this.velocity = -this.maxspeed;
    }

    this.velocity *= this.friction;

    this.x += Math.sin(this.angle) * this.velocity;
    this.y -= Math.cos(this.angle) * this.velocity;

    this.x = Math.max(
      map.left + this.radius,
      Math.min(this.x, map.right - this.radius),
    );
    this.y = Math.max(
      map.top + this.radius,
      Math.min(this.y, map.bottom - this.radius),
    );

    if (keys["a"]) this.angle -= 0.05;
    if (keys["d"]) this.angle += 0.05;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.shipImg, -80, -70, 160, 140);
    ctx.restore();
  }
}
