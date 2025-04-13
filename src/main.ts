import { Application } from "pixi.js";
import { Stats } from "pixi-stats";
import { DEBUG_ENABLED } from "./utils/constants";
import { EntityManager } from "./managers/EntityManager";
import { CollisionManager } from "./managers/CollisionManager";
import { Cannon } from "./entities/Cannon";
import { Ball } from "./entities/Ball";

export const app = new Application();

async function init() {
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("game-container")!.appendChild(app.canvas);
  if (DEBUG_ENABLED) {
    new Stats(app.renderer);
  }

  const entityManager = new EntityManager(app.stage);

  const cannon = new Cannon(entityManager);
  cannon.view.x = app.screen.width / 2;
  cannon.view.y = app.screen.height - cannon.view.height;
  entityManager.addEntity(cannon);

  entityManager.addEntity(
    new Ball({ width: app.screen.width, height: app.screen.height }),
  );

  const collisionManager = new CollisionManager(entityManager);

  app.ticker.add((ticker) => {
    entityManager.update(ticker.deltaTime);
    collisionManager.checkCollisions();
  });
}

init();
