import { Application } from "pixi.js";
import { Stats } from "pixi-stats";
import { DEBUG_ENABLED } from "./utils/constants";
import { EntityManager } from "./managers/EntityManager";
import { CollisionManager } from "./managers/CollisionManager";
import { Cannon } from "./entities/Cannon";
import { Ball } from "./entities/Ball";
import { StatsManager } from "./managers/StatsManager";
import { StatsDisplay } from "./display/Stats";

export const app = new Application();

async function init() {
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("game-container")!.appendChild(app.view);

  if (DEBUG_ENABLED) {
    new Stats(app.renderer);
  }

  const entityManager = new EntityManager(app.stage);
  const statsManager = new StatsManager();
  const collisionManager = new CollisionManager(entityManager, statsManager);

  const cannon = new Cannon(entityManager);
  cannon.view.x = app.screen.width / 2;
  cannon.view.y = app.screen.height - cannon.view.height;
  entityManager.addEntity(cannon);

  entityManager.addEntity(
    new Ball({
      position: { x: app.screen.width / 2, y: app.screen.height / 2 },
      health: 4,
      velocity: { x: 5, y: 5 },
    })
  );

  const scoreDisplay = new StatsDisplay(statsManager);
  app.stage.addChild(scoreDisplay.view);

  app.ticker.add((ticker) => {
    entityManager.update(ticker.deltaTime);
    collisionManager.checkCollisions();
  });
}

init();
