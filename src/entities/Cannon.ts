import { Container, Graphics } from "pixi.js";
import { PlayerController } from "../managers/PlayerController";
import { Projectile } from "./Projectile";

const SHOOT_COOLDOWN = 2000;

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
  projectiles: Projectile[] = [];
  lastShotTime = 0;
  constructor() {
    this.view = new Container();
    this.view.addChild(this.drawCannon());
    // draw rectangle of view size
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

  update(deltaTime: number, screenWidth: number, stage: Container) {
    if (this.state.idle) {
      return;
    }

    if (this.state.move) {
      let intendedX = this.view.x;
      intendedX += deltaTime * 10 * this.state.direction;

      const minX = 0;
      const maxX = screenWidth - this.view.width;
      this.view.x = Math.max(minX, Math.min(intendedX, maxX));
    }

    const now = Date.now();
    if (this.state.shoot && now > this.lastShotTime + SHOOT_COOLDOWN) {
      const projectileX = this.view.x + this.view.width / 2;
      const projectileY = this.view.y; // Spawn at the top of the cannon
      const projectile = new Projectile(projectileX, projectileY);
      this.projectiles.push(projectile);
      stage.addChild(projectile.view);
      this.lastShotTime = now; // Update last shot time
    }

    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime);
    });
  }
}
