import * as ex from 'excalibur';
import { Engine } from 'excalibur';
import { Machine } from '../machines/machine';
import { WheelPlatform } from "@/actors/platform";

export class HamsterWheel extends ex.Actor {
    public linkedMachine: Machine | undefined;

    public wheel: ex.Actor;
    public platform: WheelPlatform;

    playerOnWheel = false;

    constructor(x: number, y: number, radius: number, linkedMachine?: Machine) {
        super({ pos: ex.vec(x, y) });

        this.linkedMachine = linkedMachine;

        // Add wheel component
        this.wheel = new ex.Actor({
            radius: radius,
            color: ex.Color.Gray,
        });

        const platformWidth = 20;
        const platformHeight = 5;

        // Add platform component on top of the wheel
        this.platform = new WheelPlatform(0, radius + platformHeight / 2, platformWidth, platformHeight);

        // Add components as children
        this.addChild(this.wheel);
        this.addChild(this.platform);
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.platform.direction != 0) {
            this.wheel.actions.rotateBy(this.platform.direction / 50, 100);
        }
    }

    onInitialize(engine: ex.Engine) {
        // TODO: Implement hamster wheel interaction to control machine intensity
    }
}
