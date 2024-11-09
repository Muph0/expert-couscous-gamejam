import * as ex from 'excalibur';
import { Machine } from '../machines/machine';

export class HamsterWheel extends ex.Actor {
    public linkedMachine: Machine;

    constructor(x: number, y: number, linkedMachine: Machine) {
        super({
            pos: ex.vec(x, y),
            width: 32,
            height: 32,
            color: ex.Color.DarkGray,
            collisionType: ex.CollisionType.Passive,
        });
        this.linkedMachine = linkedMachine;
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Implement hamster wheel interaction to control machine intensity
    }
}
