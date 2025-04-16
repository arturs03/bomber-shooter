import { Graphics } from "pixi.js";
import { IGameEntity } from "../utils/types";
import { ENTITY_PROJECTILE, PROJECTILE_SPEED } from "../utils/constants";

export class Projectile implements IGameEntity {
  view: Graphics;
  velocity: { x: number; y: number };
  speed: number = PROJECTILE_SPEED;
  type = ENTITY_PROJECTILE;

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
