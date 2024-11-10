import { Actor, Color, Sprite, vec, Vector } from "excalibur";
import { Item } from "../items/items";
import { Machine } from "./machine";
import { Resources } from "@/resources";


export class Freezer extends Machine {

    constructor() {
        super({});

        const cover = new Actor();
        cover.graphics.use(Resources.Machines().getSprite(3,1));
        cover.z = 100;
        this.addChild(cover);

        this.graphics.use(this.getSprite());
    }

    getSprite(): Sprite {
        return Resources.Machines().getSprite(2, 1);
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


