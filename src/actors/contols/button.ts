import * as ex from 'excalibur';
import { Machine } from '../machines/machine';

export class Button extends ex.Actor {
    public linkedMachine: Machine;

    constructor(x: number, y: number, linkedMachine: Machine) {
        super({
            pos: ex.vec(x, y),
            width: 32,
            height: 16,
            color: ex.Color.Red,
            collisionType: ex.CollisionType.Passive,
        });
        this.linkedMachine = linkedMachine;
    }

    onInitialize(engine: ex.Engine) {
        this.on('precollision', this.onPreCollision.bind(this));
    }

    onPreCollision(evt: ex.PreCollisionEvent) {
        if (evt.other instanceof ex.Actor) {
            // TODO: Check if it's the player and toggle the machine
            this.linkedMachine.isOn = !this.linkedMachine.isOn;
        }
    }
}
