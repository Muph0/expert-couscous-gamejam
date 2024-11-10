import { Actor, CollisionType, Color, vec, Vector } from "excalibur";


/** Small box collider with rotation used for details of machine colliders */
export class Paddle extends Actor {

    constructor(pos: Vector, size: Vector, degrees: number = 0) {
        super({
            pos,
            rotation: degrees / 180 * Math.PI,
            width: size.x,
            height: size.y,
            collisionType: CollisionType.Fixed,
        })
    }
}