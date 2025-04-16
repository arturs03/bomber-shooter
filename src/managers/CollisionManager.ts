import { Ball } from "../entities/Ball";
import {
  BALL_SPEED,
  ENTITY_BALL,
  ENTITY_CANNON,
  ENTITY_PROJECTILE,
} from "../utils/constants";
import { IGameEntity } from "../utils/types";
import { EntityManager } from "./EntityManager";
import { StatsManager } from "./StatsManager";

export class CollisionManager {
  entityManager: EntityManager;
  statsManager: StatsManager;
  lastTimePlayerHit: number = 0;
  playerHitCooldown: number = 1000;

  constructor(entityManager: EntityManager, statsManager: StatsManager) {
    this.entityManager = entityManager;
    this.statsManager = statsManager;
  }

  checkCollisions() {
    const cannonEntities =
      this.entityManager.getEntitiesByType(ENTITY_CANNON) ?? null;
    const ballEntities =
      this.entityManager.getEntitiesByType(ENTITY_BALL) ?? null;
    const projectileEntities =
      this.entityManager.getEntitiesByType(ENTITY_PROJECTILE) ?? null;

    this.checkProjectileOffScreen(projectileEntities);

    const currentTime = Date.now();
    if (currentTime - this.lastTimePlayerHit > this.playerHitCooldown) {
      this.checkCollisionBetweenEntities(
        cannonEntities,
        ballEntities,
        this.resolveCollisionCannonBall.bind(this),
      );
    }

    this.checkCollisionBetweenEntities(
      ballEntities,
      projectileEntities,
      this.resolveCollisionProjectileBall.bind(this),
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

  resolveCollisionCannonBall(cannonEntity: IGameEntity) {
    this.statsManager.removeLife();
    this.lastTimePlayerHit = Date.now();

    if (this.statsManager.isGameOver()) {
      this.entityManager.removeEntity(cannonEntity);
    }
  }

  resolveCollisionProjectileBall(
    ballEntity: IGameEntity,
    projectileEntity: IGameEntity,
  ) {
    this.statsManager.addScore(1);
    this.entityManager.removeEntity(projectileEntity);

    if (ballEntity.type === ENTITY_BALL) {
      const ball = ballEntity as Ball;
      const ballHealth = ball.health % 2 === 0 ? ball.health / 2 : 0;
      if (ballHealth !== 0) {
        this.entityManager.addEntity(
          new Ball({
            position: { x: ball.view.x, y: ball.view.y },
            health: ballHealth,
            velocity: { x: -BALL_SPEED * (BALL_SPEED / ball.health), y: 5 },
          }),
        );
        this.entityManager.addEntity(
          new Ball({
            position: { x: ball.view.x, y: ball.view.y },
            health: ballHealth,
            velocity: { x: BALL_SPEED * (BALL_SPEED / ball.health), y: 5 },
          }),
        );
      }

      this.entityManager.removeEntity(ballEntity);
    }
  }

  checkProjectileOffScreen(
    projectileEntities: Map<number, IGameEntity> | null,
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
