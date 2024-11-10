import * as ex from 'excalibur';
import {BodyComponent, Collider, CollisionContact, CollisionType, Color, Engine, Side} from 'excalibur';
import {Player} from "@/actors/player";
import {Resources} from "@/resources";

export class Platform extends ex.Actor {
    constructor(x: number, y: number, width: number, height: number, rotation: number = 0, collisionType: CollisionType = CollisionType.Passive) {
        super({
            pos: ex.vec(x, y),
            width: width,
            height: height,
            color: Color.DarkGray,
            collisionType: collisionType,
        });

        this.rotation = rotation;

        if (width == 25)
            this.graphics.use(Resources.Load.PlatformWheel.toSprite());
        if (width == 30)
            this.graphics.use(Resources.Load.PlatformSmall.toSprite());
        else if (width == 60)
            this.graphics.use(Resources.Load.PlatformMedium.toSprite());
    }
}

export class SolidPlatform extends Platform {
    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            otherBody.owner.isOnSolidPlatform = true;
            otherBody.owner.isOnGround = true;
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        // this happened. no idea why
        if (other.owner == null)
            return;

        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            otherBody.owner.isOnSolidPlatform = false;
        }
    }
}

export class WheelPlatform extends Platform {
    public isOnPlayform = false;
    public direction  = 0;

    playerReference?: Player;

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.playerReference && this.playerReference.isOnGround) {
            this.direction = this.playerReference.runningDirection;
            this.isOnPlayform = this.playerReference.isOnWheel;
        }
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.playerReference = otherBody.owner;
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.playerReference = undefined;
            this.direction = 0;
        }
    }

}