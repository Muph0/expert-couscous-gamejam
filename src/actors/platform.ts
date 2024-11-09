import * as ex from 'excalibur';

export class Platform extends ex.Actor {
    constructor(x: number, y: number, width: number, height: number) {
        super({
            pos: ex.vec(x, y),
            width: width,
            height: height,
            color: ex.Color.DarkGray,
            collisionType: ex.CollisionType.Passive,
        });
    }
}
