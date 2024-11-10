import { Drawable, Item } from '@/actors/items/items';
import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, vec, Vector } from 'excalibur';
import { Game } from '@/game';
import { Resources } from '@/resources';
import { TextLabel } from '@/ui/text-label';
import { SceneScaler } from './scene-scaler';
import {ItemActor} from "@/actors/items/itemActor";

export interface Level {
    timeLimitMs: number;
    maxPoints: number;
    size: Vector;
    spawnItems(scene: Scene): void;
    getNewRecipes(): Recipe[];

    getDesiredItems(): Item[];
    getItemDistribution(): number[];
}

export class Recipe {
    constructor(
        public ingredient1: Drawable,
        public ingredient2: Drawable,
        public result: Item,
    ) { }

    public show(scene: Scene, x: number, y: number) {
        const plus = Resources.Items().getSprite(0, 2);
        const equals = Resources.Items().getSprite(1, 2);

        const ingr1Act = new Actor({pos: vec(x, y)});
        ingr1Act.graphics.add(this.ingredient1.getSprite());
        scene.add(ingr1Act);

        const plusAct = new Actor({pos: vec(x + 1 * 16, y)});
        plusAct.graphics.add(plus);
        scene.add(plusAct);

        const ingr2Act = new Actor({pos: vec(x + 2 * 16, y)});
        ingr2Act.graphics.add(this.ingredient2.getSprite());
        scene.add(ingr2Act);

        const eqAct = new Actor({pos: vec(x + 3 * 16, y)});
        eqAct.graphics.add(equals);
        scene.add(eqAct);

        const resultAct = new ItemActor(this.result, vec(x + 4 * 16, y));
        resultAct.graphics.add(this.result.getSprite());
        scene.add(resultAct);
    }
}

export class LevelIntro extends Scene {
    private scaler: SceneScaler;
    private height: number;
    private width: number;

    private hintText: Actor;
    constructor(
        private game: Game,
        private level: Level,
        private levelId: number,
        private paused: boolean = false,
    ) {
        super();
        this.height = 180;
        this.width = 180;
        this.scaler = new SceneScaler(vec(this.width, this.height), this);
        this.hintText = new Actor;
    }

    onInitialize(engine: ex.Engine): void {
        this.backgroundColor = new Color(216, 185, 157);
        const levelTable = new Actor({
            x: this.width / 2, y: this.height / 4,
        })
        levelTable.graphics.add(Resources.Load.LevelTable.toSprite());
        this.add(levelTable);
        this.add(new TextLabel(this.width / 2 + 2, 58, 56, `Level  ${this.levelId + 1}`, TextLabel.WHITE).actor);

        this.hintText = new TextLabel(this.width / 2, 75, 40, "Want a little hint?", TextLabel.WHITE).actor
        this.add(this.hintText);
        this.showHint();

        if (this.paused) {
            this.add(new TextLabel(this.width / 2, this.height / 2 + 50, 70, "PAUSED", TextLabel.GREY).actor);
            this.add(new TextLabel(this.width / 2, this.height / 2 + 60, 40, "Press [SPACE] to continue", TextLabel.GREY).actor);

        } else {
            this.add(new TextLabel(this.width / 2, this.height / 2 + 60, 40, "Press [SPACE] to play", TextLabel.GREY).actor);
        }
    }

    showHint() {
        const recipes = this.level.getNewRecipes();
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            recipe.show(this, this.width / 2 - (4 * 16) / 2,(this.height / 2 - 10) + i * 16 + 5);
        }
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.paused) {
                this.game.exitPause();
            } else {
                this.game.showCurrentLevel();
            }
        }
    }



    onDeactivate(context: SceneActivationContext): void {
        this.scaler.deactivate()
    }
}