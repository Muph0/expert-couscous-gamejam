import * as ex from 'excalibur';
import { ItemActor } from './items/itemActor';
import {Resources} from "@/resources";

export class AutomaticSquirrel extends ex.Actor {
    private carryingItem: ItemActor | null = null;

    constructor() {
        super({
            pos: ex.vec(200, 500),
            width: 32,
            height: 32,
            color: ex.Color.Gray,
            collisionType: ex.CollisionType.Active,
        });
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Implement AI logic to collect items and deliver to customers
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);
        // TODO: Implement AI movement and item handling
    }
}
