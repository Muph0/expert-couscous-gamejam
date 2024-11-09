import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { Actor, CollisionType, Color, PreCollisionEvent, Rectangle, vec, Vector } from 'excalibur';

export abstract class Machine extends Actor {
    public isOn: boolean = true;
    intakeActor: Actor;

    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            width: 64,
            height: 32,
            color: Color.Gray,
            collisionType: CollisionType.Passive,
        });

        let [intakeStart, intakeEnd] = this.getIntake();
        this.intakeActor = new Actor({
            pos: intakeStart.add(intakeEnd).scale(1 / 2),
            width: intakeEnd.x - intakeStart.x,
            height: intakeEnd.y - intakeStart.y,
        });
    }

    protected abstract getIntake(): [Vector, Vector];
    protected abstract getOutlet(): Vector;
    protected abstract processItem(item: Item): Item | null;

    onPreCollision(evt: PreCollisionEvent) {
        if (this.isOn && evt.other instanceof ItemActor) {
            const item = evt.other as ItemActor;
            const newItem = this.processItem(item.item);
            if (newItem) {
                let newActor = new ItemActor(newItem, this.getOutlet());
                this.scene?.add(newActor);
                item.kill();
            }
        }
    }
}
