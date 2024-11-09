import { Item } from '@/actors/items/items';
import { Resources } from '@/resources';
import {Actor, CollisionType, Color, Engine, Vector} from 'excalibur';

export class ItemActor extends Actor {

    constructor(readonly item: Item, spawnPos?: Vector) {
        super({
            radius: 8,
            collisionType: CollisionType.Active,
        });
        if (spawnPos) {
            this.pos = spawnPos.clone();
        }

        this.graphics.use(item.getSprite());
    }

    onPostUpdate(engine: Engine, delta: number): void {
        this.angularVelocity = this.vel.x / 10;
    }
}
