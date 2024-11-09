import * as ex from 'excalibur';
import { Player } from "@/actors/player";
import { AutomaticSquirrel } from '@/actors/automatic-squirrel';
import {Platform, SolidPlatform} from '@/actors/platform';
import {Engine, ExcaliburGraphicsContext, Label, vec} from "excalibur";
import { HamsterWheel } from "@/actors/contols/hamster-wheel";
import { Lever } from "@/actors/contols/lever";
import { Level, LEVELS } from "@/levels/level"
import { Grinder } from '@/actors/machines/grinder';
import { Brewer } from '@/actors/machines/brewer';
import { ItemActor } from '@/actors/items/itemActor';
import {Acorn, Coffee} from '@/actors/items/items';
import ResourceStation from '@/actors/stations/resource-station';
import {CustomerControl} from "@/actors/customers-control";
import {SceneScaler} from "@/scenes/scene-scaler";

export class MainScene extends ex.Scene {
    entityCounter = new Label({ text: '' });
    level: Level = LEVELS[0];

    onInitialize(engine: ex.Engine) {
        this.add(this.entityCounter);

        const lever = new Lever(100, 200 - 10);
        this.add(lever)

        {[
            new Platform(270, 100, 60, 10),
            new Platform(400, 120, 60, 10),

            new Platform(330, 160, 30, 10),
            new Platform(200, 150, 30, 10),

            new SolidPlatform(480 / 2, 200, 600, 20),
        ].forEach(platform => this.add(platform));}

        {[
            new ResourceStation(270, 100 - 15 - 5, 30, new Acorn()),
            new ResourceStation(400, 120 - 15 - 5, 30, new Acorn()),
        ].forEach(station => this.add(station));}

        const wheel = new HamsterWheel(100, 80, 50);
        this.add(wheel)

        // Create AI-controlled squirrel
        const aiSquirrel = new AutomaticSquirrel();
        this.add(aiSquirrel);

        // Create player-controlled squirrel
        const player = new Player(480 / 2, 180);
        this.add(player);

        // // Create machines
        const grinder = new Grinder(300, 400);
        this.add(grinder);

        const brewer = new Brewer(500, 450);
        this.add(brewer);

        // TODO: Position the machines properly

        const customerControl = new CustomerControl();
        this.add(customerControl);

        // Add walls beyond the screen to prevent actors from moving outside
        const screenWidth = engine.drawWidth;
        const screenHeight = engine.drawHeight;

        // Left wall
        const leftWall = new ex.Actor({
            pos: ex.vec(-10, screenHeight / 2),
            width: 20,
            height: screenHeight,
            collisionType: ex.CollisionType.Fixed,
            color: ex.Color.Transparent,
        });

        // Right wall
        const rightWall = new ex.Actor({
            pos: ex.vec(screenWidth + 10, screenHeight / 2),
            width: 20,
            height: screenHeight,
            collisionType: ex.CollisionType.Fixed,
            color: ex.Color.Transparent,
        });

        // Top wall
        const topWall = new ex.Actor({
            pos: ex.vec(screenWidth / 2, -10),
            width: screenWidth,
            height: 20,
            collisionType: ex.CollisionType.Fixed,
            color: ex.Color.Transparent,
        });

        // Bottom wall
        const bottomWall = new ex.Actor({
            pos: ex.vec(screenWidth / 2, screenHeight + 10),
            width: screenWidth,
            height: 20,
            collisionType: ex.CollisionType.Fixed,
            color: ex.Color.Transparent,
        });

        // Add walls to the scene
        this.add(leftWall);
        this.add(rightWall);
        this.add(topWall);
        this.add(bottomWall);

        let mouse = engine.input.pointers.primary;
        mouse.on('down', e => {
            console.log('spawn');
            let acorn = new ItemActor(new Acorn());
            acorn.pos = mouse.lastWorldPos.clone();
            this.add(acorn);
        });
        this.physics.config.gravity = vec(0,250);

        new SceneScaler(vec(480,480), this)
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        this.entityCounter.text = `Entities: ${this.entities.length}`;
    }
}
