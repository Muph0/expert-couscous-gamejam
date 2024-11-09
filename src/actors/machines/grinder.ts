import { Machine } from './machine';
import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { Color, vec, Vector } from 'excalibur';


export class Grinder extends Machine {
    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            color: Color.Gray,
            width: 32,
            height: 32
        });
    }

    protected processItem(item: Item): Item | null {
        return item.grind ? item.grind() : null;
    }
    protected getIntake(): [Vector, Vector] {
        return [
            vec(-8, -18),
            vec(8, -16)
        ];
    }
    protected getOutlet(): Vector {
        return vec(0, 16);
    }
}
