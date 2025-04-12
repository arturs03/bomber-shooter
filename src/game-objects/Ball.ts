import { Graphics, Container, Text } from "pixi.js";

type Bounds = { width: number; height: number };

export class BallGameObject {
  view: Container;
  velocity: { x: number; y: number };
  speed: number = 5;
  health = 2;
  bounds: Bounds;

  constructor(bounds: Bounds) {
    this.view = new Container();
    const graphics = new Graphics();
    graphics.circle(0, 0, 20).fill({ color: "yellow" });

    const text = new Text({
      text: this.health.toString(),
      style: {
        fontSize: 20,
        fill: 0x1010ff,
      },
    });
    text.anchor.set(0.5, 0.5);
    this.view.addChild(graphics, text);

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

  destroy() {
    this.view.destroy();
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
