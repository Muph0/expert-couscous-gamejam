import { Item } from '@/actors/items/items';
import { Machine } from './machine';
import { Rectangle, vec, Vector } from 'excalibur';

export class Brewer extends Machine {
    protected getIntake(): [Vector, Vector] {
        return [
            this.pos.add(vec(-3, -5)),
            this.pos.add(vec(3, -4))
        ];
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
