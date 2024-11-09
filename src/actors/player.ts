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
import {Item} from "@/actors/items/item";
import * as ex from "excalibur";
import {Resources} from "@/resources";
import {Platform, WheelPlatform} from "@/actors/platform";


export class Player extends Actor {
    GRAVITY = 1000;
    JUMP_GRAVITY = this.GRAVITY * 0.5

    MAX_VELOCITY = 300
    ACCELERATION = 700
    TURN_ACCELERATION = this.ACCELERATION * 4

    AIR_MOVEMENT_PENALITY = 0.75;

    JUMP_FORCE = 400

    isOnWheel = false;
    public wheelRunningDirection = 0;

    isOnGround = false;
    isPressingDown = false;

    private carryingItem: Item | null = null;

    animations = {
        run: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.VeverkaRun,
                grid: {
                    columns: 1,
                    rows: 7,
                    spriteWidth: 128,
                    spriteHeight: 25,
                },
            }), [0, 1, 2, 3, 4, 5, 6], 100),
        idle: ex.Animation.fromSpriteSheet(
            ex.SpriteSheet.fromImageSource({
                image: Resources.VeverkaIdle,
                grid: {
                    columns: 3,
                    rows: 1,
                    spriteWidth: 32,
                    spriteHeight: 32,
                },
            }), [0, 1, 2], 200),
    }

    public constructor() {
        super({
            pos: vec(150, 150),
            width: 25,
            height: 25,
            color: new Color(255, 255, 255),
            collisionType: CollisionType.Active,
            collider: Shape.Box(32, 32),
        });
    }

    onInitialize(engine: ex.Engine) {

        engine.input.keyboard.on('hold', this.onKeyHold.bind(this));
        engine.input.keyboard.on('release', this.onKeyRelease.bind(this));
    }

    onPostUpdate(engine: Engine, delta: number): void {
        const jumpPressed = engine.input.keyboard.wasPressed(Keys.Space)
        const jumpHeld = engine.input.keyboard.isHeld(Keys.Space)

        const heldLeft = engine.input.keyboard.isHeld(Keys.A)
        const heldRight = engine.input.keyboard.isHeld(Keys.D)

        let movementDirection = Math.sign(this.vel.x);

        this.isPressingDown = engine.input.keyboard.isHeld(Keys.S);

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

            this.wheelRunningDirection = direction;
        } else {
            this.acc.x = 0;
            this.vel.x *= 0.75;

            this.wheelRunningDirection = 0;
        }

        this.vel.x = clamp(this.vel.x, -this.MAX_VELOCITY, this.MAX_VELOCITY)

        // just jumping
        if (jumpPressed && this.isOnGround) {
            this.vel.y = -this.JUMP_FORCE;
            this.isOnGround = false;
            this.isOnWheel = false;
        }

        // fall through the platform
        if (this.isPressingDown) {
            this.isOnGround = false;
            this.isOnWheel = false;
        }

        // if space is held and we're going up, apply jump gravity
        if (jumpHeld && Math.sign(this.vel.y) < 0) {
            this.acc.y = this.JUMP_GRAVITY
        } else {
            this.acc.y = this.GRAVITY
        }

        if (this.acc.x > 0) {
            this.graphics.flipHorizontal = false;
        } else {
            this.graphics.flipHorizontal = true;
        }

        if (this.isOnGround && Math.abs(this.vel.x) < 20 && !heldLeft && !heldRight)
            this.graphics.use(this.animations.idle);
        else
            this.graphics.use(this.animations.run);

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

        if (other instanceof Item && !this.carryingItem) {
            this.carryingItem = other as Item;
            other.kill(); // Remove item from the scene
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        super.onCollisionEnd(self, other, side, lastContact);

        const otherBody = other.owner.get(BodyComponent)

        if (otherBody?.owner instanceof Platform) {
            this.isOnGround = false;
        }
    }

    onKeyHold(evt: ex.Input.KeyEvent) {
    }

    onKeyRelease(evt: ex.Input.KeyEvent) {
        if (evt.key === ex.Input.Keys.Space) {
            this.dropItem();
        }
    }

    dropItem() {
        if (this.carryingItem) {
            const droppedItem = this.carryingItem;
            droppedItem.pos = this.pos.clone();
            droppedItem.vel = ex.vec(this.vel.x, 0);
            this.scene.add(droppedItem);
            this.carryingItem = null;
        }
    }
}
