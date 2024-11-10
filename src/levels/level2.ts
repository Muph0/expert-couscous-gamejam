import { AutomaticSquirrel } from "@/actors/automatic-squirrel";
import { HamsterWheel } from "@/actors/contols/hamster-wheel";
import { Lever } from "@/actors/contols/lever";
import { CustomerControl } from "@/actors/customers-control";
import { ItemActor } from "@/actors/items/itemActor";
import { Acorn, Coffee, GroundAcorn, GroundLeaf, Item, Leaf, Tea } from "@/actors/items/items";
import { Brewer } from "@/actors/machines/brewer";
import { Grinder } from "@/actors/machines/grinder";
import { Platform, SolidPlatform } from "@/actors/platform";
import { Player } from "@/actors/player";
import ResourceStation from "@/actors/stations/resource-station";
import { Level, Recipe } from "@/scenes/level-intro";
import { CollisionType, Scene, vec, Vector } from "excalibur";


export class Level2 implements Level {
    readonly maxPoints: number = 100 // determined by playing
    readonly size = Object.freeze(vec(400, 400)) as Vector;

    getDesiredItems = (): Item[] => [new Tea(), new Coffee(), new Acorn()];
    getItemDistribution = (): number[] => [0.5, 0.5];

    getNewRecipes(): Recipe[] {
        return [
            new Recipe(new Leaf(), new Grinder(0, 0), new GroundLeaf()),
            new Recipe(new GroundLeaf(), new Brewer(0, 0), new Tea()),
        ];
    }

    spawnItems(scene: Scene): void {
        let { x: W, y: H } = this.size;

        ([
            new SolidPlatform(W / 2, 200, W, 20), // the main solid platform
            new SolidPlatform(W / 2, H, W, 20, 0, CollisionType.Fixed), // the bottom

            // resource station platforms
            new Platform(210, 150, 60, 10),
            new Platform(320, 150, 60, 10),

            // brewer platform
            new Platform(this.size.x / 2 + 5, 310, 30, 10, +Math.PI / 5, CollisionType.Fixed),


        ]).forEach(platform => scene.add(platform));

        ([
            new ResourceStation(320, 150 - 15 - 5, 30, new Acorn()),
            new ResourceStation(320, 150 - 0 - 5, 30, new Leaf()),
        ]).forEach(station => scene.add(station));

        // Create player-controlled squirrel
        const player = new Player(this.size.x / 2, 180);
        scene.add(player);

        // // Create machines
        const grinder = new Grinder(this.size.x / 2, 260);
        scene.add(grinder);

        const brewer = new Brewer(this.size.x / 2 - 30, 360);
        scene.add(brewer);

        const wheel = new HamsterWheel(90, 110, 50, grinder);
        scene.add(wheel)

        // TODO: Position the machines properly

        const customerControl = new CustomerControl(this.size.x / 2, this.size.y, this.size.x, this);
        scene.add(customerControl);
    }
}