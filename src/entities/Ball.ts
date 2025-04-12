import { Graphics } from "pixi.js";

type Bounds = { width: number; height: number };

export class Ball {
  view: Graphics;
  velocity: { x: number; y: number };
  speed: number = 5;
  health = 1;
  bounds: Bounds;

  constructor(bounds: Bounds) {
    this.view = new Graphics();
    this.view.circle(0, 0, 20).fill({ color: "yellow" });

    this.velocity = { x: this.speed, y: this.speed };

    this.view.x = bounds.width / 2;
    this.view.y = bounds.height / 2;
    this.bounds = bounds;

    console.log(this.view.width, this.view.height);
  }

  update(deltaTime: number) {
    this.view.x += deltaTime * this.velocity.x;
    this.view.y += deltaTime * this.velocity.y;
    this._bounce();
  }

  private _bounce() {
    if (
      this.view.x - this.view.width / 2 < 0 ||
      this.view.x + this.view.width / 2 > this.bounds.width
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.view.y - this.view.height / 2 < 0 ||
      this.view.y + this.view.height / 2 > this.bounds.height
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }
}
