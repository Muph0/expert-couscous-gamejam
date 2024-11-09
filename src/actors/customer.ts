import * as ex from 'excalibur';
import { Item } from './items/item';

export class Customer extends ex.Actor {
    public desiredItemType: string;

    constructor(desiredItemType: string) {
        super({
            pos: ex.vec(700, 500),
            width: 32,
            height: 32,
            color: ex.Color.Yellow,
            collisionType: ex.CollisionType.Passive,
        });
        this.desiredItemType = desiredItemType;
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Display desired item above customer
    }

    receiveItem(item: Item): boolean {
        if (item.itemType === this.desiredItemType) {
            this.kill(); // Customer leaves after receiving item
            // TODO: Trigger any success feedback
            return true;
        }
        return false;
    }
}
