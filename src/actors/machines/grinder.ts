import { Machine } from './machine';
import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { vec, Vector } from 'excalibur';


export class Grinder extends Machine {
    constructor(x: number, y: number) {
        super(x, y);
    }

    protected processItem(item: Item): Item | null {
        return item.grind ? item.grind() : null;
    }
    protected getIntake(): [Vector, Vector] {
        return [
            this.pos.add(vec(-3, -5)),
            this.pos.add(vec(3, -4))
        ];
    }
    protected getOutlet(): Vector {
        return this.pos.add(vec(0,5));
    }
}
