import { Application } from "pixi.js";
import { Cannon } from "./entities/Cannon";
import { PlayerController } from "./managers/PlayerController";

(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("game-container")!.appendChild(app.canvas);

  const cannon = new Cannon();
  cannon.view.x = app.screen.width / 2;
  cannon.view.y = app.screen.height - cannon.view.height;
  app.stage.addChild(cannon.view);

  const playerController = new PlayerController();

  // Listen for animate update
  app.ticker.add((ticker) => {
    cannon.updateState(playerController);
    cannon.update(ticker.deltaTime, app.screen.width, app.stage);
  });
})();
