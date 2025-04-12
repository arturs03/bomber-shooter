import { Container } from "pixi.js";
import { IGameEntity } from "../utils/types";

export class EntityManager {
  // Entities by type
  private _entities: Map<string, Map<number, IGameEntity>> = new Map();
  private _stage: Container;

  constructor(stage: Container) {
    this._stage = stage;
  }

  addEntity(newEntity: IGameEntity) {
    const entitiesGroup = this._entities.get(newEntity.type);
    if (entitiesGroup && entitiesGroup.has(newEntity.uid)) {
      console.warn(`Entity with uid ${newEntity.uid} already exists`);
      return;
    }

    this._entities.set(newEntity.type, new Map().set(newEntity.uid, newEntity));
    this._stage.addChild(newEntity.view);
    console.log(`Added entity: ${newEntity.type} (UID: ${newEntity.uid})`);
  }

  removeEntity(entity: IGameEntity) {
    const entitiesGroup = this._entities.get(entity.type);
    if (entitiesGroup && entitiesGroup.has(entity.uid)) {
      entitiesGroup.delete(entity.uid);
      entity.view.destroy();
      console.log(`Removed entity: ${entity.type} (UID: ${entity.uid})`);
      return;
    }

    console.log(`Not found entity: ${entity.type} (UID: ${entity.uid})`);
  }

  update(deltaTime: number) {
    for (const entitiesGroup of this._entities.values()) {
      for (const entity of entitiesGroup.values()) {
        entity.update(deltaTime);
      }
    }
  }

  getEntitiesByType(type: string) {
    return this._entities.get(type);
  }

  getEntityByUid(uid: number) {
    for (const entitiesGroup of this._entities.values()) {
      const entity = entitiesGroup.get(uid);

      if (entity) {
        return entity;
      }
    }

    return null;
  }
}
