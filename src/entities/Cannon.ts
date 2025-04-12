import { Container, Graphics } from "pixi.js";
import { PlayerController } from "../managers/PlayerController";
import { Projectile } from "./Projectile";
import { app } from "../main";
const SHOOT_COOLDOWN = 200;

export class Cannon {
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
  canShoot = true;
  projectiles: Map<number, Projectile> = new Map();
  lastShotTime = 0;

  constructor() {
    this.view = new Container();
    this.view.addChild(this.drawCannon());
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

  updateState(controller: PlayerController) {
    this.state.move =
      controller.keys.left.pressed || controller.keys.right.pressed;

    this.state.direction = controller.keys.left.pressed ? -1 : 1;
    this.state.shoot = controller.keys.space.pressed;
  }

  update(deltaTime: number) {
    if (this.state.idle) {
      return;
    }

    if (this.state.move) {
      this._drawCannonMovement(deltaTime);
    }

    if (this.state.shoot && Date.now() > this.lastShotTime + SHOOT_COOLDOWN) {
      this._shoot();
    }

    this._drawProjectiles(deltaTime);
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
    const projectile = new Projectile(projectileX, projectileY);
    this.projectiles.set(projectile.view.uid, projectile);
    
    app.stage.addChild(projectile.view);
    this.lastShotTime = Date.now();
  }

  private _drawProjectiles(deltaTime: number) {
    for (const projectile of this.projectiles.values()) {
      if (projectile.isOffScreen()) {
        projectile.view.destroy();
        this.projectiles.delete(projectile.view.uid);
        
        continue;
      }

      projectile.update(deltaTime);
    }
  }
}
