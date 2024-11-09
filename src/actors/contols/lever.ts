import * as ex from 'excalibur';
import { Machine } from '../machines/machine';
import {BodyComponent, Collider, CollisionContact, Engine, Shape, Side, vec} from "excalibur";
import {Player} from "@/actors/player";

export class Lever extends ex.Actor {
    public linkedMachine!: Machine;

    playerReference!: Player | null

    constructor(x: number, y: number, linkedMachine?: Machine) {
        super({
            pos: ex.vec(x, y),
            width: 16,
            height: 32,
            offset: vec(0, -16),
            color: ex.Color.Blue,
            collisionType: ex.CollisionType.Passive,
            collider: Shape.Circle(4)
        });

        if (linkedMachine) {
            this.linkedMachine = linkedMachine;
        }
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.playerReference && this.actions.getQueue().isComplete()) {
            let direction = Math.sign(this.playerReference.vel.x)

            if (direction) {
                this.actions.clearActions()
                this.actions.rotateTo(direction / 2, 5);
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

    onInitialize(engine: ex.Engine) {
        // TODO: Implement lever interaction
    }
}
