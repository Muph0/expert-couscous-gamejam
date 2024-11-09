import * as ex from 'excalibur';
import {Actor, BodyComponent, Collider, CollisionContact, Engine, Entity, Side} from "excalibur";
import {Player} from "@/actors/player";

export class Platform extends ex.Actor {
    constructor(x: number, y: number, width: number, height: number) {
        super({
            pos: ex.vec(x, y),
            width: width,
            height: height,
            color: ex.Color.DarkGray,
            collisionType: ex.CollisionType.Passive,
        });
    }
}

export class WheelPlatform extends Platform {
    public isOnPlayform = false;
    public direction  = 0;

    playerReference?: Player;

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.playerReference && this.playerReference.isOnGround) {
            this.direction = this.playerReference.wheelRunningDirection;

            console.log(this.direction)
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

            console.log("HERE")
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