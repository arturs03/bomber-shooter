import { Graphics } from "pixi.js";

export class ProjectileGameObject {
  view: Graphics;
  velocity: { x: number; y: number };
  speed: number = 3.5;

  constructor(startX: number, startY: number) {
    this.view = new Graphics();

    this.view.circle(0, 0, 10).fill({ color: "red" });
    this.view.x = startX;
    this.view.y = startY;

    this.velocity = { x: 0, y: -this.speed };
  }

  update(deltaTime: number) {
    this.view.y += this.velocity.y * this.speed * deltaTime;
  }

  destroy() {
    this.view.destroy();
  }

  isOffScreen(): boolean {
    return 0 >= this.view.y - this.view.height;
  }
}
