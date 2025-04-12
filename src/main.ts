import { Application } from "pixi.js";
import { Cannon } from "./entities/Cannon";
import { PlayerController } from "./managers/PlayerController";
import { Stats } from "pixi-stats";
import { DEBUG_ENABLED } from "./utils/constants";
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

  // Listen for animate update
  app.ticker.add((ticker) => {
    cannon.updateState(playerController);
    cannon.update(ticker.deltaTime);
  });
}

init();
