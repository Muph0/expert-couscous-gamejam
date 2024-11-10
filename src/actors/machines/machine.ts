import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import {
    Actor,
    ActorArgs, BaseAlign,
    Collider,
    CollisionContact,
    CollisionType,
    Color,
    Engine, Font, FontUnit,
    Label,
    Side, TextAlign, vec,
    Vector
} from 'excalibur';

export abstract class Machine extends Actor {
    public isOn: boolean = true;

    intakeActor: Actor;

    private itemQueue: Array<ItemActor> = [];
    private blacklistedItemQueue: Array<ItemActor> = [];

    private isProcessing: boolean = false;
    private manual: boolean;

    public remainingProcessingTime = 0;

    private tooltip: Label;

    constructor(config?: ActorArgs, manual: boolean = false) {
        super({
            color: Color.Gray,
            collisionType: CollisionType.Fixed,
            ...config,
        });

        this.manual = manual;

        // Create tooltip (initially hidden)
        this.tooltip = new Label({
            text: '',
            pos: vec(0, 0), // Position the label above the station
            font: new Font({
                textAlign: TextAlign.Center,
                baseAlign: BaseAlign.Middle,
                shadow: {
                    blur: 5,
                    offset: vec(0, 0),
                    color: Color.Black,
                },
                family: 'Silkscreen',
                size: 15,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.tooltip.z = 10;

        let [intakeStart, intakeEnd] = this.getIntake();
        this.intakeActor = new Actor({
            pos: intakeStart.add(intakeEnd).scale(1 / 2),
            width: intakeEnd.x - intakeStart.x,
            height: intakeEnd.y - intakeStart.y,
            collisionType: CollisionType.Fixed,
            color: Color.Green,
        });
        this.intakeActor.on('collisionstart', e => {
            if (this.isOn && e.other instanceof ItemActor) {
                const itemActor = e.other as ItemActor;

                if (!this.itemQueue.includes(itemActor) && !this.blacklistedItemQueue.includes(itemActor)) {
                    this.itemQueue.push(itemActor);
                }
            }
        });

        this.addChild(this.intakeActor);
        this.addChild(this.tooltip);
    }


    onPostUpdate(engine: Engine, delta: number): void {
        if (!this.isProcessing) {
            if (this.itemQueue.length != 0) {
                this.isProcessing = true;
                this.remainingProcessingTime = 1.5;
                this.tooltip.text = `${this.remainingProcessingTime.toFixed(1)}`;

            }
        } else {
            if (this.remainingProcessingTime <= 0) {
                const itemActor = this.itemQueue.shift()!;

                itemActor.kill();
                this.isProcessing = false;

                this.remainingProcessingTime = 0;
                this.tooltip.text = '';

                const newItem = this.processItem(itemActor.item);

                if (newItem) {
                    const newActor = new ItemActor(newItem);
                    newActor.pos = this.getOutlet().add(this.pos);
                    this.blacklistedItemQueue.push(newActor);
                    this.scene?.add(newActor);
                }
            } else {
                if (!this.manual) {
                    this.remainingProcessingTime = Math.max(this.remainingProcessingTime - delta / 1000, 0);
                }

                this.tooltip.text = `${this.remainingProcessingTime.toFixed(1)}`;
            }
        }
    }

    /** Position of intake [start, end] in relative coordinates */
    protected abstract getIntake(): [Vector, Vector];

    /** Position of the outlet */
    protected abstract getOutlet(): Vector;

    protected abstract processItem(item: Item): Item | null;
}
