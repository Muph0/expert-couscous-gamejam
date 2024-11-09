
export interface Item {
    grind?(): Item;
    brew?(): Item;
}

export class Acorn implements Item {
    grind(): Item {
        return new GroundAcorn();
    }
}

export class GroundAcorn implements Item {
    brew(): Item {
        return new Coffee();
    }
}

export class Coffee implements Item {}