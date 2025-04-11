import { Container, Graphics } from "pixi.js";
import { PlayerController } from "../managers/PlayerController";

const ANIMATION_MAP = {
  idle: {
    name: "idle",
  },
  move: {
    name: "move",
    loop: true,
  },
  shoot: {
    name: "shoot",
    loop: true,
  },
};

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

  constructor() {
    this.view = new Container();
    this.view.addChild(this.drawCannon());
  }

  drawCannon() {
    const graphics = new Graphics();

    graphics.rect(5, 0, 40, 80).fill({ color: 0x555555, alpha: 1 });
    graphics.circle(0, 70, 20).fill({ color: 0x000000, alpha: 1 });
    graphics.circle(50, 70, 20).fill({ color: 0x000000, alpha: 1 });

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
      this.view.x += deltaTime * 10 * this.state.direction;
    }

    if (this.state.shoot) {
      // this.view.rotation += delta * 0.01;
      // play sound ?
    }
  }
}
