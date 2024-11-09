import { Machine } from './machine';
import { Item } from '../items/item';
import { Coffee } from '../items/coffee';

export class Brewer extends Machine {
    constructor(x: number, y: number) {
        super(x, y);
    }

    processItem(item: Item): Item | null {
        if (item.itemType === 'GroundAcorn') {
            return new Coffee();
        }
        return null;
    }
}
