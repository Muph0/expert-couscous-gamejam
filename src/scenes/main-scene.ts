import * as ex from 'excalibur';
import { ExcaliburGraphicsContext, Label, vec } from 'excalibur';
import { ItemActor } from '@/actors/items/itemActor';
import { Coffee } from '@/actors/items/items';
import { SceneScaler } from "@/scenes/scene-scaler";
import { Level } from './level-intro';
import { Game } from '@/game';
import { Paddle } from '@/actors/paddle';
import { LevelBoundaries } from '@/actors/level-boundary';

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
    timeLabel = new Label({ text: '', pos: vec(10, 10) })
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

        this.level.spawnItems(this);

        let mouse = engine.input.pointers.primary;
        mouse.on('down', e => {
            console.log('spawn');
            let acorn = new ItemActor(new Coffee());
            acorn.pos = mouse.lastWorldPos.clone();
            this.add(acorn);
        });
        this.physics.config.gravity = vec(0, 250);

        new SceneScaler(this.level.size, this);

        this.add(new LevelBoundaries(this.level.size));
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        this.entityCounter.text = `Entities: ${this.entities.length}`;
        this.timeLabel.text = `${Math.floor((LEVEL_TIME - this.timePlayed) / 1000)} s`
    }

    onPreUpdate(engine: ex.Engine, delta: number): void {
        this.timePlayed += delta;
        if (this.timePlayed >= LEVEL_TIME || engine.input.keyboard.wasPressed(ex.Keys.P)) {
            this.statistics.pointsMax = 200;
            this.statistics.pointsGained = 130;
            this.game.showLevelOutro(this.statistics);
        }
    }
}
