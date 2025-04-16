import { Container, Text } from "pixi.js";
import { StatsManager } from "../managers/StatsManager"; // Adjust path if needed
import { app } from "../main";

export class StatsDisplay {
  private statsManager: StatsManager;
  private scoreText: Text;
  private livesText: Text;
  public view: Container;

  constructor(statsManager: StatsManager) {
    this.statsManager = statsManager;
    this.view = new Container();

    this.scoreText = new Text({
      text: `Score: ${this.statsManager.score}`,
      style: { fill: "white", fontSize: 20 },
    });
    this.scoreText.position.set(app.screen.width - 100, 10);

    this.livesText = new Text({
      text: `Lives: ${this.statsManager.lives}`,
      style: { fill: "white", fontSize: 20 },
    });
    this.livesText.position.set(app.screen.width - 100, 30);

    this.view.addChild(this.scoreText, this.livesText);

    this.statsManager.on("scoreUpdated", this.handleScoreUpdate);
    this.statsManager.on("livesUpdated", this.handleLivesUpdate);
    this.statsManager.on("gameOver", this.handleGameOver);
  }

  private handleScoreUpdate = (newScore: number) => {
    this.scoreText.text = `Score: ${newScore}`;
  };

  private handleLivesUpdate = (newLives: number) => {
    this.livesText.text = `Lives: ${newLives}`;
  };

  private handleGameOver = () => {
    const gameOverText = new Text({
      text: "Game Over",
      style: { fill: "white", fontSize: 50 },
    });
    gameOverText.position.set(
      app.screen.width / 2 - gameOverText.width / 2,
      app.screen.height / 2,
    );
    this.view.addChild(gameOverText);
  };

  public destroy() {
    this.statsManager.off("scoreUpdated", this.handleScoreUpdate);
    this.statsManager.off("livesUpdated", this.handleLivesUpdate);
    this.statsManager.off("gameOver", this.handleGameOver);
    this.view.destroy();
  }
}
