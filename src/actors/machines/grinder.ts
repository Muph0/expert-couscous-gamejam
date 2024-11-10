import { Machine } from './machine';
import { ItemActor } from '../items/itemActor';
import { Item } from '@/actors/items/items';
import { Actor, CircleCollider, Color, CompositeCollider, EdgeCollider, Engine, Sprite, vec, Vector } from 'excalibur';
import { Resources } from '@/resources';
import { Paddle } from '../paddle';


export class Grinder extends Machine {
    getSprite(): Sprite {
        const sprite = Resources.Machines().getSprite(0, 0)
        sprite.scale = vec(0.22, 0.22);
        return sprite;
    }

    crank: Actor;

    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            z: 1,
        }, true);

        this.graphics.add(Resources.Machines().getSprite(0, 0));
        this.collider.set(new CircleCollider({ radius: 16, offset: vec(0, 6) }));

        this.crank = new Actor({
            pos: vec(0.5, 5),
            z: this.z + 1,
        });
        const crankSprite = Resources.Machines().getSprite(1, 0)
        this.crank.graphics.add(crankSprite);
        this.addChild(this.crank);

        this.addChild(new Paddle(vec(-11, -18), vec(27, 2), 75));
        this.addChild(new Paddle(vec(12, -18), vec(27, 2), -75));
    }

    onPostUpdate(engine: Engine, delta: number): void {
        super.onPostUpdate(engine, delta);

        if (this.isOn) {
            this.crank.rotation = -(this.remainingProcessingTime / this.maxProcessingTime)  * Math.PI * 2;
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
        return vec(.5, 10);
    }
}
