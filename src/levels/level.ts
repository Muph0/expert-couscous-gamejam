import { AutomaticSquirrel } from "@/actors/automatic-squirrel";
import { HamsterWheel } from "@/actors/contols/hamster-wheel";
import { Lever } from "@/actors/contols/lever";
import { CustomerControl } from "@/actors/customers-control";
import { ItemActor } from "@/actors/items/itemActor";
import {Acorn, Coffee, GroundAcorn, GroundLeaf, IceCream, IcedTea, Item, Leaf, Tea} from "@/actors/items/items";
import { Brewer } from "@/actors/machines/brewer";
import { Grinder } from "@/actors/machines/grinder";
import { Platform, SolidPlatform } from "@/actors/platform";
import { Player } from "@/actors/player";
import ResourceStation from "@/actors/stations/resource-station";
import { Resources } from "@/resources";
import { Level, Recipe } from "@/scenes/level-intro";
import { MainScene } from "@/scenes/main-scene";
import {Actor, CollisionType, Color, Scene, vec, Vector} from "excalibur";
import {Freezer} from "@/actors/machines/freezer";


export interface DesiredItem {
    item: Item;
    distribution: number;
    price: number;
}

let FUCK_OFFSET = -40

export class Level1 implements Level {
    readonly timeLimitMs: number = 1 * 60 * 1000;
    readonly maxPoints: number = 130; // determined by playing
    readonly size = Object.freeze(vec(400, 400)) as Vector;

    getDesiredItems = (): DesiredItem[] => [
        {item: new Acorn(),     distribution: 0.1, price: 5 },
        {item: new Coffee(),    distribution: 0.9, price: 15 },
    ];

    getNewRecipes(): Recipe[] {
        return [
            new Recipe(new Acorn(), new Grinder(0, 0), new GroundAcorn()),
            new Recipe(new GroundAcorn(), new Brewer(0, 0), new Coffee()),
        ];
    }

    spawnItems(scene: MainScene): void {
        let { x: W, y: H } = this.size;

        ([
            new SolidPlatform(W / 2, 200, W, 20), // the main solid platform
            new SolidPlatform(W / 2, H, W, 20, 0, CollisionType.Fixed), // the bottom

            // resource station platforms
            new Platform(320, 150, 60, 10),

            // brewer platform
            new Platform(this.size.x / 2 + FUCK_OFFSET, 310, 30, 10, -1/2, CollisionType.Fixed),


        ]).forEach(platform => scene.add(platform));

        ([
            //new ResourceStation(210, 150 - 15 - 5, 30, new Acorn()),
            new ResourceStation(320, 150 - 15 - 5, 30, new Acorn()),
        ]).forEach(station => scene.add(station));

        // Create player-controlled squirrel
        const player = new Player(this.size.x / 2, 180);
        scene.add(player);

        // // Create machines
        const grinder = new Grinder(this.size.x / 2 + FUCK_OFFSET, 260);
        scene.add(grinder);

        const brewer = new Brewer(this.size.x / 2 - 30 + FUCK_OFFSET, 360);
        scene.add(brewer);

        const wheel = new HamsterWheel(90, 110, 50, grinder);
        scene.add(wheel)

        const background = new Actor({ z: -10 });
        let sprite = Resources.Load.Background.toSprite()
        sprite.tint = Color.Gray;
        background.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(background);

        const backgroundBranches = new Actor({ z: -10 });
        sprite = Resources.Load.BackgroundBranches.toSprite()
        backgroundBranches.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(backgroundBranches);

        const customerControl = new CustomerControl(scene, this.size.x / 2, this.size.y, this.size.x, this.getDesiredItems());
        scene.add(customerControl);
    }
}


export class Level2 implements Level {

    timeLimitMs: number = 3 * 60 * 1000;
    getDesiredItems(): DesiredItem[] {
        return [
            { item: new Leaf(), distribution: 0.1, price: 5 },
            { item: new Tea(), distribution: 0.5, price: 10 },
            { item: new Coffee(), distribution: 0.4, price: 15 },
        ];
    }
    readonly maxPoints: number = 300; // determined by playing
    readonly size = Object.freeze(vec(400, 400)) as Vector;

    getNewRecipes(): Recipe[] {
        return [
            new Recipe(new Leaf(), new Grinder(0, 0), new GroundLeaf()),
            new Recipe(new GroundLeaf(), new Brewer(0, 0), new Tea()),
        ];
    }

    spawnItems(scene: MainScene): void {
        let { x: W, y: H } = this.size;

        ([
            new SolidPlatform(W / 2, 200, W, 20), // the main solid platform
            new SolidPlatform(W / 2, H, W, 20, 0, CollisionType.Fixed), // the bottom

            // resource station platforms
            new Platform(210, 120, 60, 10),
            new Platform(320, 150, 60, 10),

            // brewer platform
            new Platform(this.size.x / 2 + FUCK_OFFSET, 310, 30, 10, -1/2, CollisionType.Fixed),


        ]).forEach(platform => scene.add(platform));

        ([
            new ResourceStation(210, 120 - 15 - 5, 30, new Leaf()),
            new ResourceStation(320, 150 - 15 - 5, 30, new Acorn()),
        ]).forEach(station => scene.add(station));

        // Create player-controlled squirrel
        const player = new Player(this.size.x / 2, 180);
        scene.add(player);

        // // Create machines
        const grinder = new Grinder(this.size.x / 2 + FUCK_OFFSET, 260);
        scene.add(grinder);

        const brewer = new Brewer(this.size.x / 2 - 30 + FUCK_OFFSET, 360);
        scene.add(brewer);

        const wheel = new HamsterWheel(90, 110, 50, grinder);
        scene.add(wheel)

        const background = new Actor({ z: -10 });
        let sprite = Resources.Load.Background.toSprite()
        sprite.tint = Color.Gray;
        background.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(background);

        const backgroundBranches = new Actor({ z: -10 });
        sprite = Resources.Load.BackgroundBranches.toSprite()
        backgroundBranches.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(backgroundBranches);

        const customerControl = new CustomerControl(scene, this.size.x / 2, this.size.y, this.size.x, this.getDesiredItems());
        scene.add(customerControl);
    }
}

export class Level3 implements Level {

    timeLimitMs: number = 3 * 60 * 1000;
    getDesiredItems(): DesiredItem[] {
        return [
            { item: new Acorn(), distribution: 0.1, price: 5 },
            { item: new Tea(), distribution: 0.3, price: 10 },
            { item: new Coffee(), distribution: 0.2, price: 15 },
            { item: new IcedTea(), distribution: 0.2, price: 30 },
            { item: new IceCream(), distribution: 0.2, price: 30 },
        ];
    }
    readonly maxPoints: number = 400; // determined by playing
    readonly size = Object.freeze(vec(400, 400)) as Vector;

    getNewRecipes(): Recipe[] {
        return [
            new Recipe(new Leaf(), new Freezer(0, 0), new IcedTea()),
            new Recipe(new GroundAcorn(), new Freezer(0, 0), new IceCream()),
        ];
    }

    spawnItems(scene: MainScene): void {
        let { x: W, y: H } = this.size;

        let brewerPlatform = new Platform(this.size.x / 2 + FUCK_OFFSET, 310, 30, 10, -1/2, CollisionType.Fixed);

        ([
            new SolidPlatform(W / 2, 200, W, 20), // the main solid platform
            new SolidPlatform(W / 2, H, W, 20, 0, CollisionType.Fixed), // the bottom

            // resource station platforms
            new Platform(210, 120, 60, 10),
            new Platform(320, 150, 60, 10),

            // brewer platform
            brewerPlatform,

        ]).forEach(platform => scene.add(platform));

        ([
            new ResourceStation(210, 120 - 15 - 5, 30, new Leaf()),
            new ResourceStation(320, 150 - 15 - 5, 30, new Acorn()),
        ]).forEach(station => scene.add(station));

        // Create player-controlled squirrel
        const player = new Player(this.size.x / 2, 180);
        scene.add(player);

        // // Create machines
        const grinder = new Grinder(this.size.x / 2 + FUCK_OFFSET, 260);
        scene.add(grinder);

        const brewer = new Brewer(this.size.x / 2 - 30 + FUCK_OFFSET, 360);
        scene.add(brewer);

        const freezer = new Freezer(this.size.x / 2 + 30 + FUCK_OFFSET, 360);
        scene.add(freezer);

        const wheel = new HamsterWheel(90, 110, 50, grinder);
        scene.add(wheel)

        const lever = new Lever(240, 190, brewerPlatform);
        scene.add(lever);

        const background = new Actor({ z: -10 });
        let sprite = Resources.Load.Background.toSprite()
        sprite.tint = Color.Gray;
        background.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(background);

        const backgroundBranches = new Actor({ z: -10 });
        sprite = Resources.Load.BackgroundBranches.toSprite()
        backgroundBranches.graphics.use(sprite, { anchor: vec(0, 0), offset: vec(-50, 0) });
        scene.add(backgroundBranches);

        const customerControl = new CustomerControl(scene, this.size.x / 2, this.size.y, this.size.x, this.getDesiredItems());
        scene.add(customerControl);
    }
}

export const LEVELS: Level[] = [
    new Level1(),
    new Level2(),
    new Level3(),
];
