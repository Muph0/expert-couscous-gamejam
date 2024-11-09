import * as ex from 'excalibur';
import { ItemActor } from './items/itemActor';
import {ProductType} from "@/levels/level";

export class Customer extends ex.Actor {
    public desiredProductType: ProductType;

    constructor(desiredProductType: ProductType) {
        super({
            pos: ex.vec(700, 500),
            width: 32,
            height: 32,
            color: ex.Color.Yellow,
            collisionType: ex.CollisionType.Passive,
        });
        this.desiredProductType = desiredProductType;
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Display desired item above customer
    }
}