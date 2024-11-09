import { Resources } from "@/resources";
import { ImageSource, Sprite } from "excalibur";

export interface Item {
    grind?(): Item;
    brew?(): Item;
    roast?(): Item;

    getSprite(): Sprite;
}

export class Acorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(0, 0); }
    grind(): Item {
        return new GroundAcorn();
    }
    roast(): Item {
        return new RoastedAcorn();
    }
}

export class GroundAcorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(1, 0); }
    brew(): Item {
        return new Coffee();
    }
    roast(): Item {
        return new RoastedGroundAcorn();
    }
}

export class Coffee implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(2, 0); }
}

export class RoastedAcorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(0, 1); }
}

export class RoastedGroundAcorn implements Item {
    getSprite(): Sprite { return Resources.Items.getSprite(0, 2); }
}
