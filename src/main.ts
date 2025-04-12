import { Application } from "pixi.js";
import { Cannon } from "./entities/Cannon";
import { PlayerController } from "./managers/PlayerController";
import { Stats } from "pixi-stats";
import { DEBUG_ENABLED } from "./utils/constants";
import { Ball } from "./entities/Ball";
export const app = new Application();

async function init() {
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("game-container")!.appendChild(app.canvas);
  if (DEBUG_ENABLED) {
    new Stats(app.renderer);
  }

  const cannon = new Cannon();
  cannon.view.x = app.screen.width / 2;
  cannon.view.y = app.screen.height - cannon.view.height;
  app.stage.addChild(cannon.view);

  const playerController = new PlayerController();

  const ball = new Ball({ width: app.screen.width, height: app.screen.height });
  app.stage.addChild(ball.view);

  // Listen for animate update
  app.ticker.add((ticker) => {
    cannon.updateState(playerController);
    cannon.update(ticker.deltaTime);
    ball.update(ticker.deltaTime);
  });
}

init();
