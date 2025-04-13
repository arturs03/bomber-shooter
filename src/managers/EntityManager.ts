import { Container } from "pixi.js";
import { IGameEntity } from "../utils/types";
import { DEBUG_ENABLED } from "../utils/constants";

export class EntityManager {
  // Entities by type
  private _entities: Map<string, Map<number, IGameEntity>> = new Map();
  private _stage: Container;

  constructor(stage: Container) {
    this._stage = stage;
  }

  addEntity(newEntity: IGameEntity) {
    const entitiesGroup = this._entities.get(newEntity.type);
    if (entitiesGroup && entitiesGroup.has(newEntity.view.uid)) {
      if (DEBUG_ENABLED) {
        console.warn(`Entity with uid ${newEntity.view.uid} already exists`);
      }

      return;
    }

    if (!entitiesGroup?.size) {
      this._entities.set(newEntity.type, new Map());
    }

    this._entities.get(newEntity.type)?.set(newEntity.view.uid, newEntity);
    this._stage.addChild(newEntity.view);

    if (DEBUG_ENABLED) {
      console.log(
        `Added entity: ${newEntity.type} (UID: ${newEntity.view.uid})`,
      );
    }
  }

  removeEntity(entity: IGameEntity) {
    const entitiesGroup = this._entities.get(entity.type);
    if (entitiesGroup && entitiesGroup.has(entity.view.uid)) {
      entitiesGroup.delete(entity.view.uid);
      entity.view.destroy();

      if (DEBUG_ENABLED) {
        console.log(
          `%cRemoved entity: ${entity.type} (UID: ${entity.view.uid})`,
          "color: red",
        );
      }

      return;
    }

    if (DEBUG_ENABLED) {
      console.log(
        `%cNot found entity: ${entity.type} (UID: ${entity.view.uid})`,
        "color: red",
      );
    }
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
