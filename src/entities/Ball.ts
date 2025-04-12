import { Entity } from "../utils/Entity";
import { app } from "../main";
import { BallGameObject } from "../game-objects/Ball";

export function createBallEntity() {
  const ballGameObject = new BallGameObject({
    width: app.screen.width,
    height: app.screen.height,
  });

  const entity = new Entity({
    view: ballGameObject.view,
    type: "ball",
    uid: ballGameObject.view.uid,
    update: ballGameObject.update.bind(ballGameObject),
    destroy: ballGameObject.destroy,
  });

  return entity;
}
