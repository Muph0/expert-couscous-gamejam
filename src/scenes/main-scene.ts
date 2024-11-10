import * as ex from 'excalibur';
import {CollisionType, ExcaliburGraphicsContext, Label, vec} from 'excalibur';
import {Player} from "@/actors/player";
import {AutomaticSquirrel} from '@/actors/automatic-squirrel';
import {Platform, SolidPlatform} from '@/actors/platform';
import {HamsterWheel} from "@/actors/contols/hamster-wheel";
import {Lever} from "@/actors/contols/lever";
import {Grinder} from '@/actors/machines/grinder';
import {Brewer} from '@/actors/machines/brewer';
import {ItemActor} from '@/actors/items/itemActor';
import {Acorn, Coffee, Leaf} from '@/actors/items/items';
import ResourceStation from '@/actors/stations/resource-station';
import {CustomerControl} from "@/actors/customers-control";
import {SceneScaler} from "@/scenes/scene-scaler";
import {Level} from './level-intro';
import {Game} from '@/game';

const LEVEL_TIME: number = 5 * 60 * 1000;

export interface GameStatistics {
    customersServed: number
    customerLongestWait: number
    pointsMax: number
    pointsGained: number
    recipesMade: number
}

export class MainScene extends ex.Scene {
    entityCounter = new Label({ text: '' });
    timeLabel = new Label({text: '', pos: vec(10, 10)})
    timePlayed: number

    private statistics: GameStatistics

    constructor(
        private game: Game,
        private level: Level,
    ) {
        super();
        this.timePlayed = 0;
        this.statistics = {
            customersServed: 0,
            customerLongestWait: 0,
            pointsMax: 0,
            pointsGained: 0,
            recipesMade: 0,
        }
    }


    onInitialize(engine: ex.Engine) {
        this.add(this.entityCounter);
        this.add(this.timeLabel);

        const lever = new Lever(100, 200 - 10);
        this.add(lever)

        {[
            // resource station platforms
            new Platform(270, 100, 60, 10),
            new Platform(400, 120, 60, 10),

            // support platforms
            new Platform(330, 160, 30, 10),
            new Platform(200, 150, 30, 10),

            // brewer platform
            new Platform(480 / 2, 370, 30, 10, -Math.PI / 5, CollisionType.Fixed),

            // the main solid platform
            new SolidPlatform(480 / 2, 200, 480, 20),

            // the bottom solid platform
            new SolidPlatform(480 / 2, 480, 480, 20, 0, CollisionType.Fixed),
        ].forEach(platform => this.add(platform));}

        {[
            new ResourceStation(270, 100 - 15 - 5, 30, new Acorn()),
            new ResourceStation(400, 120 - 15 - 5, 30, new Leaf()),
        ].forEach(station => this.add(station));}

        // Create AI-controlled squirrel
        const aiSquirrel = new AutomaticSquirrel();
        this.add(aiSquirrel);

        // Create player-controlled squirrel
        const player = new Player(480 / 2, 180);
        this.add(player);

        // // Create machines
        const grinder = new Grinder(480 / 2, 300);
        this.add(grinder);

        const brewer = new Brewer(480, 350);
        this.add(brewer);

        const wheel = new HamsterWheel(100, 80, 50, grinder);
        this.add(wheel)

        // TODO: Position the machines properly

        const customerControl = new CustomerControl(480 / 2, 480 + 10);
        this.add(customerControl);

        let mouse = engine.input.pointers.primary;
        mouse.on('down', e => {
            console.log('spawn');
            let acorn = new ItemActor(new Coffee());
            acorn.pos = mouse.lastWorldPos.clone();
            this.add(acorn);
        });
        this.physics.config.gravity = vec(0,250);

        new SceneScaler(vec(480,480), this)
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        this.entityCounter.text = `Entities: ${this.entities.length}`;
        this.timeLabel.text = `${Math.floor((LEVEL_TIME - this.timePlayed) / 1000)} s`
    }

    onPreUpdate(engine: ex.Engine, delta: number): void {
        this.timePlayed += delta;
        if (this.timePlayed >= LEVEL_TIME) {
            this.statistics.pointsMax = 200;
            this.statistics.pointsGained = 130;
            this.game.endLevel(this.statistics);
        }
    }
}
