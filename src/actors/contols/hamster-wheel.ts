import * as ex from 'excalibur';
import {Engine, vec} from 'excalibur';
import { Machine } from '../machines/machine';
import { WheelPlatform } from "@/actors/platform";
import {Resources} from "@/resources";

export class HamsterWheel extends ex.Actor {
    public linkedMachine: Machine | undefined;

    public wheel: ex.Actor;
    public platform: WheelPlatform;

    constructor(x: number, y: number, radius: number, linkedMachine?: Machine) {
        super({ pos: ex.vec(x, y) });

        this.linkedMachine = linkedMachine;

        // Add wheel component
        this.wheel = new ex.Actor({
            radius: radius,
            color: ex.Color.Gray,
            scale: vec(1.1, 1.1),
        });

        this.wheel.graphics.use(Resources.Load.Wheel.toSprite())

        const platformWidth = 25;
        const platformHeight = 10;

        // Add platform component on top of the wheel
        this.platform = new WheelPlatform(0, radius + platformHeight / 2, platformWidth, platformHeight);

        // Add components as children
        this.addChild(this.wheel);
        this.addChild(this.platform);
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (this.platform.direction != 0) {
            this.wheel.actions.rotateBy(this.platform.direction / 20, 100);

            if (this.linkedMachine != undefined) {
                this.linkedMachine.remainingProcessingTime = Math.max(this.linkedMachine.remainingProcessingTime - delta / 1000, 0);
            }
        }
    }
}
