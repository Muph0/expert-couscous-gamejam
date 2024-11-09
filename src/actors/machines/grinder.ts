import { Machine } from './machine';
import { Item } from '../items/item';
import { GroundAcorn } from '../items/ground-acorn';

export class Grinder extends Machine {
    constructor(x: number, y: number) {
        super(x, y);
    }

    processItem(item: Item): Item | null {
        if (item.itemType === 'Acorn') {
            return new GroundAcorn();
        }
        return null;
    }
}
