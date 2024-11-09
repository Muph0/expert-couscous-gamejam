import { Item } from '@/actors/items/items';
import { Machine } from './machine';
import { Rectangle, vec, Vector } from 'excalibur';

export class Brewer extends Machine {
    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
        });
    }

    processItem(item: Item): Item | null {
        return item.grind ? item.grind() : null;
    }

    protected getIntake(): [Vector, Vector] {
        return [
            vec(-8, -16),
            vec(8, -4),
        ];
    }
    protected getOutlet(): Vector {
        return vec(0, 10);
    }
}
