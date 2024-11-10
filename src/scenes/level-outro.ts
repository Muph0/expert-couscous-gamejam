import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, TextAlign, vec } from "excalibur";
import { Game } from "@/game";
import { Resources } from "@/resources";
import { TextLabel } from "@/ui/text-label";
import { SceneScaler } from "./scene-scaler";
import { GameStatistics } from "./main-scene";

export class LevelOutro extends Scene {
    private scaler: SceneScaler;
    private height: number;
    private width: number;
    starsGained: number

    constructor(
        private game: Game,
        private levelId: number,
        private statistics: GameStatistics,
    ) {
        super();
        const ratio = statistics.pointsGained / statistics.pointsMax;
        const ratios = [0.15, 0.33, 0.66]
        this.starsGained = ratios.findIndex(val => val < ratio) + 1;
        this.height = 180;
        this.width = 180;
        this.scaler = new SceneScaler(vec(this.width, this.height), this);

    }

    onInitialize(engine: ex.Engine): void {
        this.backgroundColor = new Color(216, 185, 157);
        const levelTable = new Actor({
            x: this.width / 2, y: this.height / 4,
        })
        levelTable.graphics.add(Resources.Load.LevelTable.toSprite());
        this.add(levelTable);
        this.add(new TextLabel(this.width / 2 + 2, 58, 56, `Level  ${this.levelId + 1}`, TextLabel.WHITE).actor);

        const resultMessage = this.starsGained == 0 ? "Maybe try again.." : (this.starsGained == 1 ? "Good start!" : (this.starsGained == 2 ? "Well done!" : "Barista Master <3"))
        this.add(new TextLabel(this.width / 2 + 2, 78, 56, resultMessage, TextLabel.GREY).actor)

        for (let i = 1; i <= 3; i++) {
            const image = i <= this.starsGained ? Resources.Load.StarGold : Resources.Load.StarGrey;
            const star = new Actor({x: this.width / 2 + (i - 2) * 25, y: this.height / 2});
            star.graphics.add(image.toSprite());
            this.add(star);
        }

        this.add(new TextLabel(this.width / 2 - 17, 115, 35, `- Points: ${this.statistics.pointsGained}`, TextLabel.WHITE, TextAlign.Left).actor)
        this.add(new TextLabel(this.width / 2 - 17, 120, 35, `- Customers served: ${this.statistics.customersServed}`, TextLabel.WHITE, TextAlign.Left).actor)
        this.add(new TextLabel(this.width / 2 - 17, 125, 35, `- Longest wait: ${this.statistics.customerLongestWait} s`, TextLabel.WHITE, TextAlign.Left).actor)
        // this.add(new TextLabel(this.width / 2 - 17, 130, 35, `- Unique recipes cooked: ${this.statistics.recipesMade}`, TextLabel.WHITE, TextAlign.Left).actor)


        this.add(new TextLabel(this.width / 2, 150, 40, "Press [T] to TRY AGAIN", TextLabel.GREY).actor);
        this.add(new TextLabel(this.width / 2, 160, 40, "Press [N] to play NEXT LEVEL", TextLabel.GREY).actor);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.T)) {
            this.game.showCurrentLevel();
        }
        if(engine.input.keyboard.wasPressed(Keys.N)) {
            this.game.showNextLevel();
        }
    }

    onDeactivate(context: SceneActivationContext): void {
        this.scaler.deactivate()
    }
}