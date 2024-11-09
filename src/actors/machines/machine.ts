import * as ex from 'excalibur';
import { Item } from '../items/item';

export abstract class Machine extends ex.Actor {
    public isOn: boolean = true;

    constructor(x: number, y: number) {
        super({
            pos: ex.vec(x, y),
            width: 64,
            height: 32,
            color: ex.Color.Gray,
            collisionType: ex.CollisionType.Passive,
        });
    }

    abstract processItem(item: Item): Item | null;

    onPreCollision(evt: ex.PreCollisionEvent) {
        if (this.isOn && evt.other instanceof Item) {
            const newItem = this.processItem(evt.other);
            if (newItem) {
                newItem.pos = this.pos.clone();
                this.scene.add(newItem);
            }
            evt.other.kill();
        }
    }
}
