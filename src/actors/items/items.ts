import {Resources} from "@/resources";
import {Sprite} from "excalibur";


export interface Drawable {
    getSprite(): Sprite;
}

export interface Item extends Drawable {
    grind?(): Item;
    brew?(): Item;
    roast?(): Item;
    freeze?(): Item;

    getSprite(): Sprite;
}

export class Garbage implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(3, 1); }
}

export class Leaf implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(3, 0); }

    grind(): Item {
        return new GroundLeaf();
    }
}

export class Acorn implements Item{
    getSprite(): Sprite { return Resources.Items().getSprite(0, 0); }

    grind(): Item {
        return new GroundAcorn();
    }
    roast(): Item {
        return new RoastedAcorn();
    }
}

export class GroundAcorn implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(1, 0); }
    brew(): Item {
        return new Coffee();
    }
    roast(): Item {
        return new RoastedGroundAcorn();
    }
}

export class Coffee implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(2, 0); }
}

export class RoastedAcorn implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(0, 1); }
}

export class RoastedGroundAcorn implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(0, 2); }
}


export class GroundLeaf implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(4, 0); }

    brew(): Item {
        return new Tea();
    }
}

export class Tea implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(5, 0); }
}

export class IceTea implements Item {
    getSprite(): Sprite { return Resources.Items().getSprite(5, 0); }
}