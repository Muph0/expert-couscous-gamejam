export class Level {
    items!: RawItemType[];
    machines!: MachineType[];
    products!: ProductType[];
}

export enum RawItemType {
    Acorn,
    Leaf = 1,
    Almond = 2,
}

export enum MachineType {
    BREWER,
    GRINDER,
}

export enum ProductType {
    COFFEE,
    ICE_CREAM
}

export const LEVELS: Level[] = [

]