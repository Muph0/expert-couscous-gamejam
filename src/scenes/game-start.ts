import { Game } from "@/game";
import { Resources } from "@/resources";
import { Actor, Color, Engine, Keys, Scene, SceneActivationContext, vec } from "excalibur";
import { SceneScaler } from "./scene-scaler";
import { TextLabel } from "@/ui/text-label";

export class GameStart extends Scene {
    private scaler: SceneScaler;
    private height: number;
    private width: number;
    constructor(
        private game: Game,
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
        logo.graphics.add(Resources.Load.Logo.toSprite());
        this.add(logo);
        this.add(new TextLabel(this.width / 2, this.height / 2 + 20, 56, "Your forest cafe awaits...\n Brew, Bake, Delight!").actor);
        this.add(new TextLabel(this.width / 2, this.height / 2 + 60, 40, "Press [SPACE] to play").actor);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.game.firstLevel();
        }
    }

    onDeactivate(context: SceneActivationContext): void {
        this.scaler.deactivate()
    }
}