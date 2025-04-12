import { Application } from "pixi.js";
import { Stats } from "pixi-stats";
import { DEBUG_ENABLED } from "./utils/constants";
import { EntityManager } from "./managers/EntityManager";
import { createBallEntity } from "./entities/Ball";
import { createCannonEntity } from "./entities/Cannon";
import { CollisionManager } from "./managers/CollisionManager";

export const app = new Application();

async function init() {
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("game-container")!.appendChild(app.canvas);
  if (DEBUG_ENABLED) {
    new Stats(app.renderer);
  }

  const entityManager = new EntityManager(app.stage);
  entityManager.addEntity(createCannonEntity(entityManager));
  entityManager.addEntity(createBallEntity());

  const collisionManager = new CollisionManager(entityManager);

  app.ticker.add((ticker) => {
    entityManager.update(ticker.deltaTime);
    collisionManager.checkCollisions();
  });
}

init();
