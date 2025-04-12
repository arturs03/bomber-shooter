import { Container, Graphics } from "pixi.js";
import { PlayerController } from "../managers/PlayerController";
import { app } from "../main";
import { createProjectileEntity } from "../entities/Projectile";
import { EntityManager } from "../managers/EntityManager";

const SHOOT_COOLDOWN = 500;

export class CannonGameObject {
  view: Container;
  state: {
    idle: boolean;
    move: boolean;
    shoot: boolean;
    direction: number;
  } = {
    idle: false,
    move: false,
    shoot: false,
    direction: 1,
  };
  speed = 5;
  lastShotTime = 0;
  controller: PlayerController;
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.view = new Container();
    this.view.addChild(this.drawCannon());

    this.controller = new PlayerController();
    this.entityManager = entityManager;
  }

  drawCannon() {
    const graphics = new Graphics();

    graphics.rect(20, 0, 40, 80).fill({ color: "black", alpha: 1 });
    graphics
      .circle(20, 70, 20)
      .fill({ color: "gray", alpha: 1 })
      .stroke({ color: "black", width: 1 });
    graphics
      .circle(60, 70, 20)
      .fill({ color: "gray", alpha: 1 })
      .stroke({ color: "black", width: 1 });

    return graphics;
  }

  updateState() {
    this.state.move =
      this.controller.keys.left.pressed || this.controller.keys.right.pressed;

    this.state.direction = this.controller.keys.left.pressed ? -1 : 1;
    this.state.shoot = this.controller.keys.space.pressed;
  }

  update(deltaTime: number) {
    this.updateState();

    if (this.state.idle) {
      return;
    }

    if (this.state.move) {
      this._drawCannonMovement(deltaTime);
    }

    if (this.state.shoot && Date.now() > this.lastShotTime + SHOOT_COOLDOWN) {
      this._shoot();
    }
  }

  destroy() {
    this.view.destroy();
  }

  private _drawCannonMovement(deltaTime: number) {
    let intendedX = this.view.x;
    intendedX += deltaTime * 10 * this.state.direction;

    const minX = 0;
    const maxX = app.screen.width - this.view.width;
    this.view.x = Math.max(minX, Math.min(intendedX, maxX));
  }

  private _shoot() {
    const projectileX = this.view.x + this.view.width / 2;
    const projectileY = this.view.y;
    const projectile = createProjectileEntity(projectileX, projectileY);
    this.entityManager.addEntity(projectile);

    this.lastShotTime = Date.now();
  }
}
