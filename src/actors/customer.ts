import * as ex from 'excalibur';
import { ItemActor } from './items/itemActor';
import {ProductType} from "@/levels/level";
import {Resources} from "@/resources";
import {clamp, Engine, Keys} from "excalibur";

export class Customer extends ex.Actor {
    private static readonly MAX_VELOCITY = 300;
    private static readonly ACCELERATION = 700;
    private static readonly PICK_UP_THRESHOLD = 50;

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
    public readonly desiredProductType: ProductType;
    public satisfied: boolean = false;
    private assignedItem: ItemActor | null = null;
    private runningDirection: number | null = null;
    private runningTarget: number | null = null;

    constructor(waitingX: number, desiredProductType: ProductType) {
        super({
            pos: ex.vec(waitingX, 0),
            width: 32,
            height: 32,
            color: ex.Color.Yellow,
            collisionType: ex.CollisionType.Passive,
        });
        this.desiredProductType = desiredProductType;
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
                    this.runningDirection = 1;
                    this.assignedItem.kill();
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
        } else if (this.runningDirection == 1) {
            this.graphics.flipHorizontal = false;
        }
        this.vel.x = clamp(this.vel.x, -Customer.MAX_VELOCITY, Customer.MAX_VELOCITY)
    }

    goFetchItem(item: ItemActor) {
        console.log("Fetching item");
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
