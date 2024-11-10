import * as ex from 'excalibur';
import { Machine } from '../machines/machine';
import {BodyComponent, Collider, CollisionContact, Engine, Shape, Side, vec} from "excalibur";
import {Player} from "@/actors/player";
import {Resources} from "@/resources";
import {Platform} from "@/actors/platform";

export class Lever extends ex.Actor {
    public linkedPlatform!: Platform;

    playerReference!: Player | null

    constructor(x: number, y: number, linkedPlatform?: Platform) {
        super({
            pos: ex.vec(x, y),
            width: 8,
            height: 32,
            offset: vec(0, -16),
            collisionType: ex.CollisionType.Passive,
            collider: Shape.Circle(4)
        });

        this.rotation = -1/2;

        this.graphics.use(Resources.Load.Lever.toSprite())

        if (linkedPlatform) {
            this.linkedPlatform = linkedPlatform;
        }
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.playerReference && this.actions.getQueue().isComplete()) {
            let direction = Math.sign(this.playerReference.vel.x)

            if (direction) {
                this.actions.clearActions()
                this.actions.rotateTo(direction / 2, 1);

                this.linkedPlatform?.actions.rotateTo(direction / 2, 1);

                if (this.rotation != direction / 2)
                    Resources.Load.LeverSound.play(0.5)
            }
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
            this.playerReference = null;
        }
    }

}
