import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, vec } from "excalibur";
import { Level, LevelIntro } from "./level-intro";
import { Game } from "@/game";
import { Resources } from "@/resources";
import { TextLabel } from "@/ui/text-label";
import { SceneScaler } from "./scene-scaler";

export class LevelOutro extends Scene {
    private scaler: SceneScaler;
    private height: number;
    private width: number;
    starsGained: number

    constructor(
        private game: Game,
        private levelId: number,
        points: number,
        maxPoints: number,
    ) {
        super();
        const ratio = points / maxPoints;
        this.starsGained = ratio < 0.33
            ? 1
            : (ratio < 0.66 ? 2 : 3);
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
        this.add(new TextLabel(this.width / 2, this.height / 2 + 60, 40, "Press [T] to TRY AGAIN", TextLabel.GREY).actor);
        this.add(new TextLabel(this.width / 2, this.height / 2 + 70, 40, "Press [N] to play NEXT LEVEL", TextLabel.GREY).actor);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.T)) {
            this.game.newLevel(false);
        }
        if(engine.input.keyboard.wasPressed(Keys.N)) {
            this.game.newLevel(true);
        }
    }

    onDeactivate(context: SceneActivationContext): void {
        this.scaler.deactivate()
    }
}