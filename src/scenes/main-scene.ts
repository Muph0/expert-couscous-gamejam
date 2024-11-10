import * as ex from 'excalibur';
import {Color, ExcaliburGraphicsContext, Label, vec} from 'excalibur';
import { ItemActor } from '@/actors/items/itemActor';
import { Coffee } from '@/actors/items/items';
import { SceneScaler } from "@/scenes/scene-scaler";
import { Level } from './level-intro';
import { Game } from '@/game';
import { LevelBoundaries } from '@/actors/level-boundary';
import { Customer } from '@/actors/customer';


export interface GameStatistics {
    customersServed: number
    customerLongestWait: number
    pointsMax: number
    pointsGained: number
    recipesMade: number
}

export class MainScene extends ex.Scene {
    entityCounter = new Label({ text: '' });
    timeLabel = new Label({ text: '' });
    private timePlayed: number
    private timeLastCustomer: number
    private recipesCooked: Set<string>;
    private statistics: GameStatistics

    constructor(
        private game: Game,
        private level: Level,
    ) {
        super();
        this.timePlayed = 0;
        this.timeLastCustomer = 0;
        this.statistics = {
            customersServed: 0,
            customerLongestWait: 0,
            pointsMax: level.maxPoints,
            pointsGained: 0,
            recipesMade: 0,
        }
        this.recipesCooked = new Set<string>();
    }

    resolveCustomer(customer: Customer) {
        const item = customer.desiredItem;
        this.statistics.customersServed++;
        this.statistics.pointsGained += item.price;
        // simplification
        const customerWait = Math.floor((this.timePlayed - this.timeLastCustomer) / 1000);
        if (customerWait > this.statistics.customerLongestWait) {
            this.statistics.customerLongestWait = customerWait;
        }
        this.recipesCooked.add(typeof item.item);
        this.statistics.recipesMade = this.recipesCooked.size;
        console.log(this.statistics);
    }

    onInitialize(engine: ex.Engine) {
        this.backgroundColor = new Color(216, 185, 157);
        this.add(this.entityCounter);

        this.level.spawnItems(this);

        this.initializeClock();

        // TODO: remove!
        // let mouse = engine.input.pointers.primary;
        // mouse.on('down', e => {
        //     console.log('spawn');
        //     let acorn = new ItemActor(new Coffee());
        //     acorn.pos = mouse.lastWorldPos.clone();
        //     this.add(acorn);
        // });
        this.physics.config.gravity = vec(0, 250);

        new SceneScaler(this.level.size, this);

        this.add(new LevelBoundaries(this.level.size));
    }

    initializeClock() {
        this.timeLabel = new Label({
            text: '',
            pos: vec(this.level.size.x - 50, 20),
            font: new ex.Font({
                textAlign: ex.TextAlign.Left,
                baseAlign: ex.BaseAlign.Bottom,
                family: 'Pixelify Sans',
                size: 80,
                unit: ex.FontUnit.Px,
                color: ex.Color.White,
                smoothing: false,
                shadow: {
                    blur: 5,
                    offset: vec(0, 0),
                    color: Color.Black,
                },
            }),
            scale: vec(1, 1).scale(0.2),
        })
        this.add(this.timeLabel);
        this.add(new Label({
            text: '[P] to PAUSE',
            pos: vec(this.level.size.x - 50, 30),
            font: new ex.Font({
                textAlign: ex.TextAlign.Left,
                baseAlign: ex.BaseAlign.Bottom,
                family: 'Pixelify Sans',
                size: 35,
                unit: ex.FontUnit.Px,
                color: ex.Color.White,
                smoothing: false,
                shadow: {
                    blur: 5,
                    offset: vec(0, 0),
                    color: Color.Black,
                },
            }),
            scale: vec(1, 1).scale(0.2),
        }))
    }

    onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
        const timeLeft = this.level.timeLimitMs - this.timePlayed;
        const minutes = Math.floor(timeLeft / (1000 * 60));
        const seconds = Math.floor((timeLeft - minutes * 60 * 1000) / 1000)
        this.timeLabel.text = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    onPreUpdate(engine: ex.Engine, delta: number): void {
        this.timePlayed += delta;
        if (this.timePlayed >= this.level.timeLimitMs || engine.input.keyboard.wasPressed(ex.Keys.N)) {
            // this.statistics.pointsMax = 200;
            // this.statistics.pointsGained = 130;
            this.game.showLevelOutro(this.statistics);
        }

        if (engine.input.keyboard.wasPressed(ex.Keys.P)) {
            this.game.showPause();
        }
    }
}
