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
}

export const LEVELS: Level[] = [

]