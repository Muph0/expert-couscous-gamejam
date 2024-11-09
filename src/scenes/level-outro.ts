import { Engine, Scene } from "excalibur";
import { LevelIntro } from "./level-intro";

export class LevelOutro extends Scene {

    starsGained: number
    nextLevel: LevelIntro

    constructor(
        points: number,
        maxPoints: number,
        nextLevel: LevelIntro,
    ) {
        super();
        const ratio = points / maxPoints;
        this.starsGained = ratio < 0.33
            ? 1
            : (ratio < 0.66 ? 2 : 3);
        this.nextLevel = nextLevel;

    }

    onInitialize(engine: Engine): void {
        
    }
}