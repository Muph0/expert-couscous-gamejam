import { ItemActor } from '../items/itemActor';
import {Drawable, Garbage, Item} from '@/actors/items/items';
import {
    Actor,
    ActorArgs, BaseAlign,
    Collider,
    CollisionContact,
    CollisionType,
    Color,
    Engine, Font, FontUnit,
    Label,
    Side, Sound, Sprite, TextAlign, vec,
    Vector
} from 'excalibur';

export abstract class Machine extends Actor implements Drawable {
    public isOn: boolean = true;

    intakeActor: Actor;

    private itemQueue: Array<ItemActor> = [];
    private blacklistedItemQueue: Array<ItemActor> = [];

    private isProcessing: boolean = false;
    private manual: boolean;

    public remainingProcessingTime = 0;
    public maxProcessingTime = 1.5;

    private tooltip: Label;

    private sound: Sound | undefined;

    constructor(config?: ActorArgs, manual: boolean = false, sound?: Sound) {
        super({
            color: Color.Gray,
            collisionType: CollisionType.Fixed,
            ...config,
        });

        this.manual = manual;

        this.sound = sound;

        // Create tooltip (initially hidden)
        this.tooltip = new Label({
            text: '',
            pos: vec(0, 5), // Position the label above the station
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
                color: Color.White,
                smoothing: false,
            })
        });

        this.tooltip.z = 1000;

        let [intakeStart, intakeEnd] = this.getIntake();
        this.intakeActor = new Actor({
            pos: intakeStart.add(intakeEnd).scale(1 / 2),
            width: intakeEnd.x - intakeStart.x,
            height: intakeEnd.y - intakeStart.y,
            collisionType: CollisionType.Fixed,
            color: Color.Transparent,
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

    abstract getSprite(): Sprite;


    onPostUpdate(engine: Engine, delta: number): void {
        if (!this.isProcessing) {
            if (this.itemQueue.length != 0) {
                this.isProcessing = true;
                this.remainingProcessingTime = this.maxProcessingTime;
                this.tooltip.text = `${this.remainingProcessingTime.toFixed(1)}`;

                this.sound?.play(0.3);
            }
        } else {
            if (this.remainingProcessingTime <= 0) {
                const itemActor = this.itemQueue.shift()!;

                itemActor.kill();
                this.isProcessing = false;

                this.sound?.stop();

                this.remainingProcessingTime = 0;
                this.tooltip.text = '';

                let newItem = this.processItem(itemActor.item);

                if (!newItem) {
                    newItem = new Garbage();
                }

                const newActor = new ItemActor(newItem);
                newActor.pos = this.getOutlet().add(this.pos);

                newActor.vel = vec(Math.random(), 10)

                this.blacklistedItemQueue.push(newActor);
                this.scene?.add(newActor);

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
