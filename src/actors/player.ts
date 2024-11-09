import { Actor, CircleCollider, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, vec } from 'excalibur';
import { Resources } from '@/resources';
import { Magor } from './magor';

export class Player extends Actor {

  public constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255),
      collisionType: CollisionType.Active,
      collider: new CircleCollider({
        radius: 100,
      }),
    });
  }

  onInitialize() {
    let sprite = Resources.Sword.toSprite();
    sprite.scale = vec(10, 10);
    this.graphics.use(sprite);

    this.on('collisionstart', e => {
      if (e.actor instanceof Magor) {
        e.actor.kill();
      }
    });
  }

  onPostUpdate(engine: Engine, delta: number): void {
    let move = vec(0, 0);

    if (engine.input.keyboard.isHeld(Keys.Left)) move.x -= 1;
    if (engine.input.keyboard.isHeld(Keys.Right)) move.x += 1;
    if (engine.input.keyboard.isHeld(Keys.Up)) move.y -= 1;
    if (engine.input.keyboard.isHeld(Keys.Down)) move.y += 1;

    let len = move.size;
    if (len != 0) {
      move.scaleEqual(1 / len);
    }

    move.scaleEqual(10);
    this.vel.addEqual(move);
  }
}
