import { Resources } from "@/resources";
import { LevelOne } from "@/scenes/level-one/level-one";
import { Actor, CircleCollider, CollisionType, Engine, vec } from "excalibur";


export class Magor extends Actor {

    constructor(
        private level: LevelOne,
    ) {
        super({
            collisionType: CollisionType.Passive,
            radius: 100,
        });
    }

    onInitialize() {
        let sprite = Resources.Magor.toSprite();
        sprite.scale = vec(10, 10);
        this.graphics.use(sprite);
        this.pos = vec(this.level.width * 1.0, this.level.height * 1.0);
        this.vel = vec(-100, -100);
    }

    onPostUpdate(engine: Engine, delta: number): void {
        let acc = vec(Math.random() - .5, Math.random() - .5);
        acc.scaleEqual(10);
        this.vel.addEqual(acc);
    }
}