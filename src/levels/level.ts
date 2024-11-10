import { AutomaticSquirrel } from "@/actors/automatic-squirrel";
import { HamsterWheel } from "@/actors/contols/hamster-wheel";
import { Lever } from "@/actors/contols/lever";
import { CustomerControl } from "@/actors/customers-control";
import { ItemActor } from "@/actors/items/itemActor";
import { Acorn, Leaf } from "@/actors/items/items";
import { Brewer } from "@/actors/machines/brewer";
import { Grinder } from "@/actors/machines/grinder";
import { Platform, SolidPlatform } from "@/actors/platform";
import { Player } from "@/actors/player";
import ResourceStation from "@/actors/stations/resource-station";
import { Level, Recipe } from "@/scenes/level-intro";
import { CollisionType, Scene, vec, Vector } from "excalibur";



export class Level1 implements Level {
    readonly maxPoints: number = 100 // determined by playing
    readonly size = Object.freeze(vec(400, 400)) as Vector;

    getNewRecipes(): Recipe[] {
        throw new Error("Method not implemented.");
    }

    spawnItems(scene: Scene): void {
        const lever = new Lever(100, 200 - 10);
        scene.add(lever)

        let { x: W, y: H } = this.size;

        ([
            new SolidPlatform(W / 2, 200, W, 20), // the main solid platform
            new SolidPlatform(W / 2, H, W, 20, 0, CollisionType.Fixed), // the bottom

            // resource station platforms
            new Platform(200, 120, 60, 10),
            new Platform(300, 120, 60, 10),

            // support platforms
            new Platform(330, 160, 30, 10),
            new Platform(200, 150, 30, 10),

            // brewer platform
            new Platform(480 / 2, 370, 30, 10, -Math.PI / 5, CollisionType.Fixed),


        ]).forEach(platform => scene.add(platform));

        ([
            new ResourceStation(270, 100 - 15 - 5, 30, new Acorn()),
            new ResourceStation(400, 120 - 15 - 5, 30, new Leaf()),
        ]).forEach(station => scene.add(station));

        // Create player-controlled squirrel
        const player = new Player(480 / 2, 180);
        scene.add(player);

        // // Create machines
        const grinder = new Grinder(480 / 2, 300);
        scene.add(grinder);

        const brewer = new Brewer(480, 350);
        scene.add(brewer);

        const wheel = new HamsterWheel(100, 80, 50, grinder);
        scene.add(wheel)

        // TODO: Position the machines properly

        const customerControl = new CustomerControl(this.size.x * 0.8, this.size.y);
        scene.add(customerControl);
    }
}

export const LEVELS: Level[] = [
    new Level1(),
];
