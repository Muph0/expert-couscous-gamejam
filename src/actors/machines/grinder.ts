import { Machine } from './machine';
import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { Actor, CircleCollider, Color, CompositeCollider, EdgeCollider, Engine, vec, Vector } from 'excalibur';
import { Resources } from '@/resources';


export class Grinder extends Machine {

    crank: Actor;

    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            z: -1,
        });

        this.graphics.add(Resources.Machines().getSprite(0, 0));

        this.collider.set(new CompositeCollider([
            new EdgeCollider({ begin: vec(-9, -8), end: vec(-15, -32), }),
            //new EdgeCollider({ begin: vec(-17, -32), end:  vec(9, -8),}),
            new CircleCollider({ radius: 16, offset: vec(0, 6) })
        ]));

        this.crank = new Actor({
            pos: vec(0.0,5),
        });
        const crankSprite = Resources.Machines().getSprite(1,0)
        this.crank.graphics.add(crankSprite);
        this.addChild(this.crank);
    }

    onPostUpdate(engine: Engine, delta: number): void {
        if (true || this.isOn) {
            this.crank.rotation += 0.001 * delta;
        }
    }

    protected processItem(item: Item): Item | null {
        return item.grind ? item.grind() : null;
    }
    protected getIntake(): [Vector, Vector] {
        return [
            vec(-5, -10),
            vec(5, -5)
        ];
    }
    protected getOutlet(): Vector {
        return vec(0, 16);
    }
}
