import * as ex from 'excalibur';

export abstract class Item extends ex.Actor {
    public itemType: string;

    constructor(itemType: string, color: ex.Color) {
        super({
            width: 16,
            height: 16,
            color: color,
            collisionType: ex.CollisionType.Passive,
        });
        this.itemType = itemType;
    }
}
