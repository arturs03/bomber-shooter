import { Container } from "pixi.js";

export interface IGameEntity {
  view: Container;
  update(deltaTime: number): void;
  destroy(): void;
  type: string;
  uid: number;
}
