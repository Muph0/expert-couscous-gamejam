import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { Actor, ActorArgs, CollisionType, Color, PreCollisionEvent, Rectangle, vec, Vector } from 'excalibur';

export abstract class Machine extends Actor {
    public isOn: boolean = true;
    intakeActor: Actor;

    constructor(config?: ActorArgs) {
        super({
            color: Color.Gray,
            collisionType: CollisionType.Fixed,
            ...config,
        });

        let [intakeStart, intakeEnd] = this.getIntake();
        this.intakeActor = new Actor({
            pos: intakeStart.add(intakeEnd).scale(1 / 2),
            width: intakeEnd.x - intakeStart.x,
            height: intakeEnd.y - intakeStart.y,
            collisionType: CollisionType.Fixed,
            color: Color.Green,
        });
        this.addChild(this.intakeActor);

        this.intakeActor.on('collisionstart', evt => {
            if (this.isOn && evt.other instanceof ItemActor) {
                const item = evt.other as ItemActor;
                const newItem = this.processItem(item.item);
                if (newItem) {
                    let newActor = new ItemActor(newItem);
                    newActor.pos = this.getOutlet().add(this.pos);
                    this.scene?.add(newActor);
                    item.kill();
                }
            }
        });
    }

    /** Position of intage [start, end] in relative coordinates */
    protected abstract getIntake(): [Vector, Vector];


    /** Position of the outlet */
    protected abstract getOutlet(): Vector;

    protected abstract processItem(item: Item): Item | null;
}
