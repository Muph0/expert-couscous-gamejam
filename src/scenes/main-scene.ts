import * as ex from 'excalibur';
import {Player} from "@/actors/player";
import {AutomaticSquirrel} from '@/actors/automatic-squirrel';
import {Platform} from '@/actors/platform';
import {Grinder} from '@/actors/machines/grinder';
import {Brewer} from '@/actors/machines/brewer';
import {Customer} from '@/actors/customer';
import {ExcaliburGraphicsContext, Label} from "excalibur";
import {HamsterWheel} from "@/actors/contols/hamster-wheel";
import {Lever} from "@/actors/contols/lever";

export class MainScene extends ex.Scene {
    entityCounter = new Label({text: ''});

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

        // Create player-controlled squirrel
        const player = new Player();
        this.add(player);

        // Create AI-controlled squirrel
        const aiSquirrel = new AutomaticSquirrel();
        this.add(aiSquirrel);

        // // Create machines
        // const grinder = new Grinder(300, 400);
        // this.add(grinder);

        // const brewer = new Brewer(500, 450);
        // this.add(brewer);

        // TODO: Position the machines properly

        // Create customers
        const customer = new Customer('Coffee');
        this.add(customer);

        // TODO: Add more customers and implement customer spawning logic

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
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        this.entityCounter.text = `Entities: ${this.entities.length}`;
    }
}
