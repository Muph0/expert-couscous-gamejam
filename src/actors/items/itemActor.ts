import { Item } from '@/actors/items/items';
import { Actor, CollisionType, Color, Vector } from 'excalibur';

export class ItemActor extends Actor {

    constructor(readonly item: Item, spawnPos?: Vector) {
        super({
            radius: 8,
            collisionType: CollisionType.Active,
        });
        if (spawnPos) {
            this.pos = spawnPos.clone();
        }
    }
}