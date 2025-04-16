import { EventEmitter } from "pixi.js";

export class StatsManager extends EventEmitter {
  private _score: number = 0;
  private _lives: number = 3;

  constructor() {
    super();
  }

  public addScore(score: number) {
    this._score += score;
    this.emit('scoreUpdated', this._score);
  }

  public get score(): number {
    return this._score;
  }

  public get lives(): number {
    return this._lives;
  }

  public removeLife() {
    this._lives--;
    this.emit('livesUpdated', this._lives);
    if (this.isGameOver()) {
      this.emit('gameOver');
    }
  }

  public isGameOver(): boolean {
    return this._lives <= 0;
  }
}
