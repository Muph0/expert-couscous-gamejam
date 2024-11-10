import { Action, Actor, CompositeCollider, Shape, vec, Vector } from "excalibur";


export interface BoundariesConfig {
    top?: boolean, down?: boolean, left?: boolean, right?: boolean,
}

export class LevelBoundaries extends Actor {

    constructor(private readonly size: Vector, config?: BoundariesConfig) {
        super();

        const { x: W, y: H } = size;
        const p = 10;
        const bounds: any = [];

        if (config?.top ?? true) bounds.push(Shape.Box(W + 2 * p, p, vec(0, 0), vec(0, -p)));
        if (config?.down ?? true) bounds.push(Shape.Box(W + 2 * p, p, vec(0, 0), vec(0, H + p)));
        if (config?.top ?? true) bounds.push(Shape.Box(p, H, vec(0, 0), vec(-p, 0)));
        if (config?.top ?? true) bounds.push(Shape.Box(p, H, vec(0, 0), vec(W + p, 0)));

        this.collider.set(new CompositeCollider(bounds));
        // TODO set type to FIXED
    }
}