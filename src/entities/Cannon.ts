import { Entity } from "../utils/Entity";
import { CannonGameObject } from "../game-objects/Cannon";
import { app } from "../main";

export function createCannonEntity() {
  const cannon = new CannonGameObject();
  cannon.view.x = app.screen.width / 2;
  cannon.view.y = app.screen.height - cannon.view.height;

  return new Entity({
    view: cannon.view,
    type: "cannon",
    uid: cannon.view.uid,
    update: cannon.update.bind(cannon),
    destroy: cannon.destroy,
  });
}
