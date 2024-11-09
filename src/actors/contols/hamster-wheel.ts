import * as ex from 'excalibur';
import { Machine } from '../machines/machine';
import {Platform, WheelPlatform} from "@/actors/platform";
import {BodyComponent, Collider, CollisionContact, CollisionType, Engine, Side, vec} from "excalibur";

export class HamsterWheel extends ex.Actor {
    public linkedMachine: Machine | undefined;

    public wheel: ex.Actor;
    public platform : WheelPlatform;

    playerOnWheel = false;

    constructor(x: number, y: number, linkedMachine?: Machine) {
        super({pos: ex.vec(x, y)});

        this.linkedMachine = linkedMachine;

        const wheelRadius = 75;

        // Add wheel component
        this.wheel = new ex.Actor({
            width: wheelRadius * 2,
            height: wheelRadius * 2,
            color: ex.Color.Gray,
        });

        const platformWidth = 50;
        const platformHeight = 20;

        // Add platform component on top of the wheel
        this.platform = new WheelPlatform(0, wheelRadius + platformHeight / 2, platformWidth, platformHeight);

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
