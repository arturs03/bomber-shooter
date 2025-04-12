import {
  ENTITY_BALL,
  ENTITY_CANNON,
  ENTITY_PROJECTILE,
} from "../utils/constants";
import { IGameEntity } from "../utils/types";
import { EntityManager } from "./EntityManager";

export class CollisionManager {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  checkCollisions() {
    const cannonEntities =
      this.entityManager.getEntitiesByType(ENTITY_CANNON) ?? null;
    const ballEntities =
      this.entityManager.getEntitiesByType(ENTITY_BALL) ?? null;
    const projectileEntities =
      this.entityManager.getEntitiesByType(ENTITY_PROJECTILE) ?? null;

    this.checkCollisionBetweenEntities(
      cannonEntities,
      ballEntities,
      this.resolveCollisionCannonBall.bind(this),
    );

    this.checkCollisionBetweenEntities(
      ballEntities,
      projectileEntities,
      this.resolveCollisionProjectileBall.bind(this),
    );
  }

  private isColliding(entity1: IGameEntity, entity2: IGameEntity) {
    const entity1Bounds = entity1.view.getBounds().rectangle;
    const entity2Bounds = entity2.view.getBounds().rectangle;

    return entity1Bounds.intersects(entity2Bounds);
  }

  checkCollisionBetweenEntities(
    entities1: Map<number, IGameEntity> | null,
    entities2: Map<number, IGameEntity> | null,
    callback: (entity1: IGameEntity, entity2: IGameEntity) => void,
  ) {
    if (!(entities1 && entities1.size > 0 && entities2 && entities2.size > 0)) {
      return false;
    }

    for (const entity1 of entities1.values()) {
      for (const entity2 of entities2.values()) {
        if (this.isColliding(entity1, entity2)) {
          callback(entity1, entity2);
        }
      }
    }
  }

  resolveCollisionCannonBall(
    cannonEntity: IGameEntity,
    ballEntity: IGameEntity,
  ) {
    console.log("game over");
    this.entityManager.removeEntity(cannonEntity);
    this.entityManager.removeEntity(ballEntity);
  }

  resolveCollisionProjectileBall(
    projectileEntity: IGameEntity,
    ballEntity: IGameEntity,
  ) {
    console.log("projectileEntity", projectileEntity);
    this.entityManager.removeEntity(projectileEntity);
    this.entityManager.removeEntity(ballEntity);
  }
}
