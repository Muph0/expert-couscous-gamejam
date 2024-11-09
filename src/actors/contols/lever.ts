import * as ex from 'excalibur';
import { Machine } from '../machines/machine';

export class Lever extends ex.Actor {
    public linkedMachine: Machine;

    constructor(x: number, y: number, linkedMachine: Machine) {
        super({
            pos: ex.vec(x, y),
            width: 16,
            height: 32,
            color: ex.Color.Blue,
            collisionType: ex.CollisionType.Passive,
        });
        this.linkedMachine = linkedMachine;
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Implement lever interaction
    }
}
