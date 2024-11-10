import { Item } from '@/actors/items/items';
import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, vec } from 'excalibur';
import { Game } from '@/game';
import { Resources } from '@/resources';
import { TextLabel } from '@/ui/text-label';
import { SceneScaler } from './scene-scaler';

export interface Level {
    maxPoints: number;
    spawnItems(scene: Scene): void;
    getNewRecipes(): Recipe[];
}

export class Recipe {
    constructor(
        private ingredients: Item[],
        private result: Item,
    ) { }
}

export class LevelIntro extends Scene {
    private scaler: SceneScaler;
    private height: number;
    private width: number;
    constructor(
        private game: Game,
        private level: Level,
        private levelId: number,
    ) {
        super();
        this.height = 180;
        this.width = 180;
        this.scaler = new SceneScaler(vec(this.width, this.height), this);
    }

    onInitialize(engine: ex.Engine): void {
        this.backgroundColor = new Color(216, 185, 157);
        const logo = new Actor({
            x: this.width / 2, y: this.height / 4,
        })
        logo.graphics.add(Resources.Load.LevelTable.toSprite());
        this.add(logo);

        this.add(new TextLabel(this.width / 2 + 2, 58, 56, `Level  ${this.levelId + 1}`, TextLabel.WHITE).actor);
        this.add(new TextLabel(this.width / 2, this.height / 2 + 60, 40, "Press [SPACE] to play", TextLabel.GREY).actor);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.game.showCurrentLevel();
        }
    }

    onDeactivate(context: SceneActivationContext): void {
        this.scaler.deactivate()
    }
}