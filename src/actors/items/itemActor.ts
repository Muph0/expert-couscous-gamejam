import { Item } from '@/actors/items/items';
import { Resources } from '@/resources';
import {Actor, CollisionType, Color, Engine, Vector} from 'excalibur';

export class ItemActor extends Actor {
    public allocatedToCustomer: boolean = false;

    constructor(readonly item: Item, spawnPos?: Vector) {
        super({
            radius: 6,
            collisionType: CollisionType.Active,
            z: 10,
        });
        if (spawnPos) {
            this.pos = spawnPos.clone();
        }

        this.graphics.use(item.getSprite());
    }

    onPostUpdate(engine: Engine, delta: number): void {
        this.angularVelocity = this.vel.x / 10;

        this.vel.x *= 0.99;
    }
}
