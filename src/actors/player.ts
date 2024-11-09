import {
    Actor,
    BodyComponent,
    CircleCollider,
    clamp,
    Collider, CollisionContact, CollisionGroup,
    CollisionType,
    Color,
    Engine,
    Keys, Shape,
    Side,
    vec
} from 'excalibur';
import {ItemActor} from "@/actors/items/itemActor";
import * as ex from "excalibur";
import {Resources} from "@/resources";
import {Platform, SolidPlatform, WheelPlatform} from "@/actors/platform";


export class Player extends Actor {
    GRAVITY = 3000;
    JUMP_GRAVITY = this.GRAVITY * 0.5

    MAX_VELOCITY = 300
    ACCELERATION = 700
    TURN_ACCELERATION = this.ACCELERATION * 4

    AIR_MOVEMENT_PENALITY = 0.75;

    JUMP_FORCE = 430

    isOnWheel = false;
    public runningDirection = 0;

    isOnGround = false;
    isPressingDown = false;

    // set by the solid platform
    public isOnSolidPlatform = false;

    private carryingItem: ItemActor | null = null;

    animations = {
        run: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.Load.VeverkaRun,
                grid: {
                    columns: 1,
                    rows: 7,
                    spriteWidth: 128,
                    spriteHeight: 25,
                },
            }), [0, 1, 2, 3, 4, 5, 6], 50),
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
    }

    public constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            width: 25,
            height: 25,
            color: new Color(255, 255, 255),
            collisionType: CollisionType.Passive,
            collider: Shape.Box(32, 32),
        });
    }

    onInitialize(engine: ex.Engine) {
        engine.input.keyboard.on('press', this.onKeyPress.bind(this));
    }

    onPostUpdate(engine: Engine, delta: number): void {
        const jumpPressed = engine.input.keyboard.wasPressed(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)
        const jumpHeld = engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)

        const heldLeft = engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)
        const heldRight = engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)

        let movementDirection = Math.sign(this.vel.x);

        this.isPressingDown = engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down);

        // move left or right
        if (heldLeft || heldRight) {
            let direction = 0;

            if (heldLeft) direction -= 1;
            if (heldRight) direction += 1;

            // turning the other way is faster
            let accel = (direction != movementDirection ? this.TURN_ACCELERATION : this.ACCELERATION)
                * direction;

            // turning in air is slower
            if (!this.isOnGround) accel *= this.AIR_MOVEMENT_PENALITY;

            this.acc.x = accel;

            this.runningDirection = direction;
        } else {
            this.acc.x = 0;
            this.vel.x *= 0.75;

            this.runningDirection = 0;
        }

        if (this.runningDirection == -1) {
            this.graphics.flipHorizontal = true;
        } else if (this.runningDirection == 1) {
            this.graphics.flipHorizontal = false;
        }

        this.vel.x = clamp(this.vel.x, -this.MAX_VELOCITY, this.MAX_VELOCITY)

        // just jumping
        if (jumpPressed && this.isOnGround) {
            this.vel.y = -this.JUMP_FORCE;
            this.isOnGround = false;
            this.isOnWheel = false;
        }

        // fall through the platform
        if (this.isPressingDown && !this.isOnSolidPlatform) {
            this.isOnGround = false;
            this.isOnWheel = false;
        }

        // if space is held and we're going up, apply jump gravity
        if (jumpHeld && Math.sign(this.vel.y) < 0) {
            this.acc.y = this.JUMP_GRAVITY
        } else {
            this.acc.y = this.GRAVITY
        }

        // not on the ground always means flying
        if (!this.isOnGround) {
            this.graphics.use(this.animations.flying);
            this.updateItemPosition('back');
        } else {
            // when on the ground, we are either running on the wheel
            if (this.isOnWheel) {
                if (this.runningDirection == 0) {
                    this.graphics.use(this.animations.idle);
                    this.updateItemPosition('hand');
                }
                else {
                    this.graphics.use(this.animations.run);
                    this.updateItemPosition('back');
                }
            }

            // else we're idling
            else if (Math.abs(this.vel.x) < 50) {
                this.graphics.use(this.animations.idle);
                this.updateItemPosition('hand');
            }
            else {
                this.graphics.use(this.animations.run);
                this.updateItemPosition('back');
            }
        }

        // ground cancels all Y movement
        if (this.isOnGround) {
            this.acc.y = 0;
            this.vel.y = 0;
        }

        if (this.isOnWheel) {
            this.acc.x = 0;
            this.vel.x = 0;
        }
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody?.collisionType === CollisionType.Fixed || otherBody?.collisionType === CollisionType.Passive) {
            // player landed on the ground
            if (side === Side.Bottom && !this.isPressingDown && otherBody.owner instanceof Platform) {
                this.isOnGround = true;

                if (otherBody.owner instanceof WheelPlatform) {
                    this.isOnWheel = true;
                    this.pos.x = other.center.x;
                }

                // push out of the platform
                // minuses because y axis is negative upwards
                this.pos.y = other.getFurthestPoint(vec(0, -1)).y
                    - self.bounds.height / 2 + 0.1;
            }
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        super.onCollisionEnd(self, other, side, lastContact);

        const otherBody = other.owner.get(BodyComponent)

        // Tom is fucking going to jail
        if (otherBody?.owner instanceof Platform && otherBody.pos.y > this.pos.y && !(otherBody.owner instanceof SolidPlatform)) {
            this.isOnGround = false;
        }
    }

    onKeyPress(evt: ex.Input.KeyEvent) {
        if (evt.key === ex.Input.Keys.Space) {
            this.dropItem();
        }
    }

    isCarryingItem() {
        return (this.carryingItem != null);
    }

    pickUpItem(item: ItemActor) {
        this.carryingItem = item;
        item.body.collisionType = ex.CollisionType.Passive;
        this.addChild(this.carryingItem);
    }

    dropItem() {
        if (this.carryingItem) {
            this.removeChild(this.carryingItem)

            this.carryingItem.pos = this.pos.clone();
            this.carryingItem.vel = ex.vec(this.vel.x, this.vel.y / 10);

            this.carryingItem.body.collisionType = ex.CollisionType.Active;
            this.carryingItem.offset = vec(0, 0);

            this.scene?.add(this.carryingItem);

            this.carryingItem = null;
        }
    }

    private updateItemPosition(position: string) {
        let facing = this.graphics.flipHorizontal;

        let frame = (this.graphics.current as any)._currentFrame;
        let uglyOffset  = Math.sin(frame);

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
}
