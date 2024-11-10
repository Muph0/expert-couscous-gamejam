import { Actor, Color, Sprite, vec, Vector } from "excalibur";
import { Item } from "../items/items";
import { Machine } from "./machine";
import { Resources } from "@/resources";


export class Freezer extends Machine {

    constructor(x: number, y: number) {
        super({pos: vec(x, y), z: 1});

        const cover = new Actor();
        cover.graphics.use(Resources.Machines().getSprite(3,1));
        cover.z = 100;
        this.addChild(cover);

        this.graphics.use(Resources.Machines().getSprite(2, 1));
    }

    getSprite(): Sprite {
        const sprite = Resources.Machines().getSprite(2, 1)
        sprite.scale = vec(0.22, 0.22);
        return sprite;
    }

    protected getIntake(): [Vector, Vector] {
        return [
            vec(-5, -10),
            vec(5, -5),
        ]
    }

    protected getOutlet(): Vector {
        return vec(0, 0);
    }
    protected processItem(item: Item): Item | null {
        return item.freeze ? item.freeze() : null;
    }
}


