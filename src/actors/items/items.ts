import { Resources } from "@/resources";
import { ImageSource, Sprite } from "excalibur";

export interface Item {
    grind?(): Item;
    brew?(): Item;

    getSprite(): Sprite;
}

export class Acorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(0, 0); }
    grind(): Item {
        return new GroundAcorn();
    }
}

export class GroundAcorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(1, 0); }
    brew(): Item {
        return new Coffee();
    }
}

export class Coffee implements Item {

    getSprite(): Sprite { return Resources.Items.getSprite(2, 0); }
}