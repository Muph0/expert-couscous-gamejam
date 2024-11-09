import { Game } from "@/game";
import { Resources } from "@/resources";
import { Button } from "@/ui/button";
import { Actor, Scene } from "excalibur";

export class GameStart extends Scene {
        
    constructor(
        private game: Game,
    ) {
        super();
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onInitialize(engine: ex.Engine): void {
        const logo = new Actor({
            x: 100, y: 100,
        })
        logo.graphics.add(Resources.Load.Logo.toSprite());
        this.add(logo);
        this.add(new Button(200, 200, this.onButtonPress));
    }

    onButtonPress() {
        this.game.firstLevel()
    }
}