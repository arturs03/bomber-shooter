import { Container } from "pixi.js";
import { IGameEntity } from "./types";

export class Entity {
  view: Container;
  update: (deltaTime: number) => void;
  destroy: () => void;
  type: string;
  uid: number;

  constructor(entity: IGameEntity) {
    this.view = entity.view;
    this.type = entity.type;
    this.uid = entity.uid;

    this.update = entity.update.bind(this);
    this.destroy = entity.destroy.bind(this);
  }
}
