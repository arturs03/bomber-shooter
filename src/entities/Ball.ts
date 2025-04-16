import { Graphics, Container, Text } from "pixi.js";
import { IGameEntity } from "../utils/types";
import { ENTITY_BALL } from "../utils/constants";
import { IBallParams } from "./types";
import { app } from "../main";

export class Ball implements IGameEntity {
  view: Container;
  velocity: { x: number; y: number };
  speed: number = 5;
  health: number;
  type = ENTITY_BALL;

  constructor(params: IBallParams) {
    this.view = new Container();
    this.health = params.health;
    this.velocity = params.velocity;
    this.view.x = params.position.x;
    this.view.y = params.position.y;

    const text = new Text({
      text: this.health.toString(),
      style: {
        fontSize: 20,
        fill: 0x1010ff,
      },
    });
    text.anchor.set(0.5, 0.5);

    const graphics = new Graphics();
    graphics
      .circle(0, 0, Math.max(10, 10 * this.health))
      .fill({ color: "yellow" });

    this.view.addChild(graphics, text);
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
      this.view.x + this.view.width / 2 > app.screen.width
    ) {
      this.velocity.x = -this.velocity.x;
    }

    if (
      this.view.y - this.view.height / 2 < 0 ||
      this.view.y + this.view.height / 2 > app.screen.height
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }
}
