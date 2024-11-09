import * as ex from 'excalibur';
import {Actor, BodyComponent, Collider, CollisionContact, Color, Engine, Entity, Side} from "excalibur";
import {Player} from "@/actors/player";

export class Platform extends ex.Actor {
    constructor(x: number, y: number, width: number, height: number, color: Color = Color.DarkGray) {
        super({
            pos: ex.vec(x, y),
            width: width,
            height: height,
            color: color,
            collisionType: ex.CollisionType.Passive,
        });
    }
}

export class SolidPlatform extends Platform {
}

export class WheelPlatform extends Platform {
    public isOnPlayform = false;
    public direction  = 0;

    playerReference?: Player;

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.playerReference && this.playerReference.isOnGround) {
            this.direction = this.playerReference.runningDirection;
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
            this.isOnPlayform = true;
            this.playerReference = otherBody.owner;
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.isOnPlayform = false;
            this.playerReference = undefined;
            this.direction = 0;
        }
    }

}