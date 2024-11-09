import * as ex from 'excalibur';
import { Player } from "@/actors/player";
import { AutomaticSquirrel } from '@/actors/automatic-squirrel';
import { Platform } from '@/actors/platform';
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
        // Create platforms
        const platforms = [
            new Platform(100, 200, 200, 20),
            new Platform(400, 300, 200, 20),
            // TODO: Add more platforms as needed
        ];
        platforms.forEach(platform => this.add(platform));

        const wheel = new HamsterWheel(200, 200);
        this.add(wheel)

        const lever = new Lever(100, 180);
        this.add(lever)

        const resourceStation = new ResourceStation(50, 180, 30, new Acorn());
        this.add(resourceStation)

        // Create player-controlled squirrel
        const player = new Player();
        this.add(player);

        // Create AI-controlled squirrel
        const aiSquirrel = new AutomaticSquirrel();
        this.add(aiSquirrel);

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
            let acorn = new ItemActor(new Coffee());
            acorn.pos = mouse.lastWorldPos.clone();
            this.add(acorn);
        });
        this.physics.config.gravity = vec(0,500);
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        this.entityCounter.text = `Entities: ${this.entities.length}`;
    }
}
