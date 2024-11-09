import { Item } from '@/actors/items/items';
import { Machine } from './machine';
import { Rectangle, Vector } from 'excalibur';

export class Brewer extends Machine {
    protected getIntake(): [Vector, Vector] {
        throw new Error('Method not implemented.');
    }
    constructor(x: number, y: number) {
        super(x, y);
    }

    processItem(item: Item): Item | null {
        return item.grind ? item.grind() : null;
    }

    protected getOutlet(): Vector {
        throw new Error('Method not implemented.');
    }
}
