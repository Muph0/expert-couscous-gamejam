import { Level, Recipe } from "@/scenes/level-intro";
import { Scene } from "excalibur";



export class Level1 implements Level {
    maxPoints: number = 100 // determined by playing

    spawnItems(scene: Scene): void {
        throw new Error("Method not implemented.");
    }
    getNewRecipes(): Recipe[] {
        throw new Error("Method not implemented.");
    }
}

export const LEVELS: Level[] = [
    new Level1(),
];
