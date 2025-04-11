import { Graphics } from "pixi.js";

export class Projectile {
  view: Graphics;
  velocity: { x: number; y: number };
  speed: number = 5;

  constructor(startX: number, startY: number) {
    this.view = new Graphics();

    this.view.circle(0, 0, 10).fill({ color: "red" });
    this.view.x = startX;
    this.view.y = startY;

    this.velocity = { x: 0, y: -this.speed };
  }

  update(deltaTime: number) {
    // this.view.x += this.velocity.x * this.speed * deltaTime;
    this.view.y += this.velocity.y * this.speed * deltaTime;
  }

  isOffScreen(screenHeight: number): boolean {
    // Assumes y=0 is the top edge. Adjust if your coordinate system differs.
    return screenHeight < this.view.y - this.view.height;
  }
}
