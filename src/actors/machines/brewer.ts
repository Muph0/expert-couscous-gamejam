import { Item } from '@/actors/items/items';
import { Machine } from './machine';
import {Actor, CompositeCollider, Loader, Rectangle, Resource, Shape, Sprite, vec, Vector} from 'excalibur';
import { Resources } from '@/resources';
import { Paddle } from '../paddle';

export class Brewer extends Machine {
    getSprite(): Sprite {
        const sprite = Resources.Machines().getSprite(2, 0)
        sprite.scale = vec(0.22, 0.22);
        return sprite;
    }

    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            z: 1,
        }, false, Resources.Load.BrewerSound);
        this.graphics.use(Resources.Machines().getSprite(2, 0));

        this.collider.set(new CompositeCollider([
            Shape.Box(45, 16, undefined, vec(0, -6)),
            // in tile coordinates
            Shape.Polygon([vec(10, 1), vec(14, 21), vec(15, 21), vec(11, 0)], vec(-24, -35)),
            Shape.Polygon([vec(43, 1), vec(42, 0), vec(39, 21), vec(40, 21)], vec(-24, -35)),
        ]));

        const funnelSprite = new Actor();
        funnelSprite.graphics.use(Resources.Machines().getSprite(3,0))        ;
        funnelSprite.z = 20;
        this.addChild(funnelSprite);
    }

    processItem(item: Item): Item | null {
        return item.brew ? item.brew() : null;
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
