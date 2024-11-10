import * as ex from 'excalibur';
import { ItemActor } from './items/itemActor';
import {Item} from './items/items';
import { Resources } from "@/resources";
import { clamp, CollisionType, Engine, vec } from 'excalibur';
import { Coffee, Tea } from "@/actors/items/items";

export class Customer extends ex.Actor {
    private static readonly MAX_VELOCITY = 300;
    private static readonly ACCELERATION = 700;
    private static readonly PICK_UP_THRESHOLD = 25;

    private animations = {
        run: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.Load.VeverkaRun,
                grid: {
                    columns: 1,
                    rows: 7,
                    spriteWidth: 128,
                    spriteHeight: 25,
                },
            }), [0, 1, 2, 3, 4, 5, 6], 100),
        flying: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.Load.VeverkaRun,
                grid: {
                    columns: 1,
                    rows: 7,
                    spriteWidth: 128,
                    spriteHeight: 25,
                },
            }), [2, 3], 100),
        idle: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.Load.VeverkaIdle,
                grid: {
                    columns: 3,
                    rows: 1,
                    spriteWidth: 32,
                    spriteHeight: 32,
                },
            }), [0, 1, 2], 200),
    };

    private bubble: ex.Actor; // New bubble actor
    public readonly desiredItem: Item;
    public satisfied: boolean = false;
    private assignedItem: ItemActor | null = null;
    private runningDirection: number | null = null;
    private runningTarget: number | null = null;

    private carryingItem: ItemActor | null = null;

    constructor(waitingX: number, desiredProductType: Item) {
        super({
            pos: ex.vec(waitingX, 0),
            width: 32,
            height: 32,
            color: ex.Color.Yellow,
            collisionType: ex.CollisionType.Passive,
            z: 5
        });
        this.desiredItem = desiredProductType;

        // Initialize the bubble actor
        this.bubble = new ex.Actor({
            pos: ex.vec(0, -16), // Position above the customer
            offset: ex.vec(0, -16), // Position above the customer
            width: 32,
            height: 32,
            collisionType: ex.CollisionType.PreventCollision,
            z: 5,
        });

        this.bubble.graphics.use(Resources.Load.Bubble.toSprite());
        this.bubble.scale = vec(1, 1)

        let itemActor = new ItemActor(desiredProductType);
        itemActor.pos = vec(0, -18)
        itemActor.body.collisionType = CollisionType.PreventCollision;
        itemActor.z = 10
        this.bubble.addChild(itemActor)

        // Attach the bubble to the customer as a child actor
        this.addChild(this.bubble);
    }

    pickUpItem(item: ItemActor) {
        this.carryingItem = item;
        item.body.collisionType = ex.CollisionType.PreventCollision;
        item.pos = vec(0, 0);
        item.vel = vec(0, 0);
        item.angularVelocity = 0;

        item.rotation = 0;
        this.addChild(this.carryingItem);

        this.bubble.actions.scaleTo(vec(0, 0), vec(5, 10));
    }

    private updateBubblePosition() {
        let frame = (this.graphics.current as any)._currentFrame;
        let uglyOffset  = Math.sin(frame);

        this.bubble.pos = ex.vec(0, -16 + uglyOffset);
    }

    private updateItemPosition(position: string) {
        let facing = this.graphics.flipHorizontal;

        let frame = (this.graphics.current as any)._currentFrame;
        let uglyOffset = Math.sin(frame);

        let handOffset = vec(facing ? -10 : 10, 3 + uglyOffset);
        let backOffset = vec(facing ? -20 : 20, 2 + uglyOffset);

        if (this.carryingItem != undefined) {
            this.carryingItem.graphics.flipHorizontal = facing;

            if (position == 'hand') {
                this.carryingItem.offset = handOffset;
            }
            else {
                this.carryingItem.offset = backOffset;
            }
        }
    }

    onInitialize(engine: ex.Engine) {
        this.pos = ex.vec(this.pos.x, engine.drawHeight - this.height / 2);
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.runningTarget !== null) {
            this.runningDirection = Math.sign(this.runningTarget - this.pos.x);

            if (Math.abs(this.runningTarget - this.pos.x) < Customer.PICK_UP_THRESHOLD) {
                this.runningTarget = null;

                if (this.assignedItem) {
                    this.satisfied = true;
                    this.pickUpItem(this.assignedItem)
                    this.goTo(10000)
                }
            }
        } else {
            if (!this.satisfied) {
                this.runningDirection = null;
            }
        }

        if (this.satisfied && this.pos.x > engine.drawWidth + this.width) {
            console.log("Killing customer")
            this.kill();
        }

        if (this.runningDirection !== null) {
            this.acc.x = Customer.ACCELERATION * this.runningDirection;
        } else {
            this.acc.x = 0;
            this.vel.x *= 0.75;
        }

        if (this.runningDirection == -1) {
            this.graphics.flipHorizontal = true;
            this.graphics.use(this.animations.run);
            this.updateItemPosition('back');
        } else if (this.runningDirection == 1) {
            this.graphics.flipHorizontal = false;
            this.graphics.use(this.animations.run);
            this.updateItemPosition('back');
        } else {
            this.graphics.use(this.animations.idle);
            this.updateItemPosition('hand');
        }
        this.vel.x = clamp(this.vel.x, -Customer.MAX_VELOCITY, Customer.MAX_VELOCITY)

        this.updateBubblePosition()
    }

    goFetchItem(item: ItemActor) {
        this.runningTarget = item.pos.x;
        this.assignedItem = item;
        item.allocatedToCustomer = true;
    }

    goTo(xPosition: number) {
        this.runningTarget = xPosition;
    }

    productAssigned(): boolean {
        return this.assignedItem != null;
    }
}
