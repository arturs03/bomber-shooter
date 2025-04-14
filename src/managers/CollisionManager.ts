import { Ball } from "../entities/Ball";
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

    this.checkProjectileOffScreen(projectileEntities);

    this.checkCollisionBetweenEntities(
      cannonEntities,
      ballEntities,
      this.resolveCollisionCannonBall.bind(this)
    );

    this.checkCollisionBetweenEntities(
      ballEntities,
      projectileEntities,
      this.resolveCollisionProjectileBall.bind(this)
    );
  }

  private isColliding(entity1: IGameEntity, entity2: IGameEntity) {
    if (!entity1?.view || !entity2?.view) {
      return false;
    }

    const entity1Bounds = entity1.view.getBounds()?.rectangle;
    const entity2Bounds = entity2.view.getBounds()?.rectangle;

    if (entity1Bounds && entity2Bounds) {
      return entity2Bounds.intersects(entity1Bounds);
    }

    return false;
  }

  checkCollisionBetweenEntities(
    entities1: Map<number, IGameEntity> | null,
    entities2: Map<number, IGameEntity> | null,
    callback: (entity1: IGameEntity, entity2: IGameEntity) => void
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
    ballEntity: IGameEntity
  ) {
    console.log("game over");
    // this.entityManager.removeEntity(cannonEntity);
    this.entityManager.removeEntity(ballEntity);
  }

  resolveCollisionProjectileBall(
    ballEntity: IGameEntity,
    projectileEntity: IGameEntity
  ) {
    this.entityManager.removeEntity(projectileEntity);

    console.log(ballEntity);
    if (ballEntity.type === ENTITY_BALL) {
      const ball = ballEntity as Ball;
      const ballHealth = ball.health % 2 === 0 ? ball.health / 2 : 0;
      if (ballHealth !== 0) {
        this.entityManager.addEntity(
          new Ball({
            position: { x: ball.view.x, y: ball.view.y },
            health: ballHealth,
            velocity: { x: -5, y: 5 },
          })
        );
        this.entityManager.addEntity(
          new Ball({
            position: { x: ball.view.x, y: ball.view.y },
            health: ballHealth,
            velocity: { x: 5, y: 5 },
          })
        );
      }

      this.entityManager.removeEntity(ballEntity);
    }
  }

  checkProjectileOffScreen(
    projectileEntities: Map<number, IGameEntity> | null
  ) {
    if (!projectileEntities?.size) {
      return;
    }

    for (const projectileEntity of projectileEntities.values()) {
      if (projectileEntity.view.y - projectileEntity.view.height <= 0) {
        this.entityManager.removeEntity(projectileEntity);
      }
    }
  }
}
