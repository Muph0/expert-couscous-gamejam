import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import {Actor, ActorArgs, Collider, CollisionContact, CollisionType, Color, Engine, Side, Vector} from 'excalibur';

export abstract class Machine extends Actor {
    public isOn: boolean = true;

    intakeActor: Actor;
    private itemQueue: Array<ItemActor>;
    private isProcessing: boolean = false;
    private remainingProcessingTime = 0;

    constructor(config?: ActorArgs) {
        super({
            color: Color.Gray,
            collisionType: CollisionType.Fixed,
            ...config,
        });

        this.itemQueue = [];

        let [intakeStart, intakeEnd] = this.getIntake();
        this.intakeActor = new Actor({
            pos: intakeStart.add(intakeEnd).scale(1 / 2),
            width: intakeEnd.x - intakeStart.x,
            height: intakeEnd.y - intakeStart.y,
            collisionType: CollisionType.Fixed,
            color: Color.Green,
        });
        this.addChild(this.intakeActor);
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        if (this.isOn && other.owner instanceof ItemActor) {
            const itemActor = other.owner as ItemActor;

            if (!this.itemQueue.includes(itemActor)) {
                this.itemQueue.push(itemActor);
            }
        }
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (!this.isProcessing) {
            if (this.itemQueue.length != 0) {
                this.isProcessing = true;
                this.remainingProcessingTime = 1000;
            }
        } else {
            if (this.remainingProcessingTime < 0) {
                const itemActor = this.itemQueue.shift()!;

                itemActor.kill();
                this.isProcessing = false;

                const newItem = this.processItem(itemActor.item);

                if (newItem) {
                    const newActor = new ItemActor(newItem);
                    newActor.pos = this.getOutlet().add(this.pos);
                    this.scene?.add(newActor);
                }
            }

            this.remainingProcessingTime -= delta;
        }
    }

    /** Position of intake [start, end] in relative coordinates */
    protected abstract getIntake(): [Vector, Vector];

    /** Position of the outlet */
    protected abstract getOutlet(): Vector;

    protected abstract processItem(item: Item): Item | null;
}
