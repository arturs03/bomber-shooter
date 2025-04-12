import { ProjectileGameObject } from "../game-objects/Projectile";
import { ENTITY_PROJECTILE } from "../utils/constants";
import { Entity } from "../utils/Entity";

export function createProjectileEntity(startX: number, startY: number) {
  const projectile = new ProjectileGameObject(startX, startY);

  return new Entity({
    view: projectile.view,
    type: ENTITY_PROJECTILE,
    uid: projectile.view.uid,
    update: projectile.update.bind(projectile),
    destroy: projectile.destroy,
  });
}
