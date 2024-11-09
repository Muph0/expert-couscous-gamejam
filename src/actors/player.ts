import {Actor, CircleCollider, clamp, CollisionType, Color, Engine, Keys, vec} from 'excalibur';
import {Resources} from '@/resources';
import {Magor} from './magor';

export class Player extends Actor {
  GRAVITY = 1000;
  JUMP_GRAVITY = this.GRAVITY * 0.5

  MAX_VELOCITY = 200

  ACCELERATION = 600
  TURN_ACCELERATION = this.ACCELERATION * 4

  AIR_MOVEMENT_PENALITY = 0.75;

  JUMP_FORCE = 400

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
    const jumpPressed = engine.input.keyboard.wasPressed(Keys.Space)
    const jumpHeld = engine.input.keyboard.isHeld(Keys.Space)

    const heldLeft = engine.input.keyboard.isHeld(Keys.A)
    const heldRight = engine.input.keyboard.isHeld(Keys.D)

    // TODO: proper platform collisions
    let isOnGround = this.pos.y > 200;

    let movementDirection = Math.sign(this.vel.x);

    // move left or right
    if (heldLeft || heldRight) {
      let direction = 0;

      if (heldLeft) direction -= 1;
      if (heldRight) direction += 1;

      // turning the other way is faster
      let accel = (direction != movementDirection ? this.TURN_ACCELERATION : this.ACCELERATION)
          * direction;

      // turning in air is slower
      if (!isOnGround) accel *= this.AIR_MOVEMENT_PENALITY;

      this.acc.x = accel;
    } else {
      this.acc.x = 0;
      this.vel.x *= 0.75;
    }

    this.vel.x = clamp(this.vel.x, -this.MAX_VELOCITY, this.MAX_VELOCITY)

    // just jumping
    if (jumpPressed && isOnGround) {
      this.vel.y = -this.JUMP_FORCE;
      isOnGround = false;
    }

    // if space is held and we're going up, apply jump gravity
    if (jumpHeld && Math.sign(this.vel.y) < 0) {
      this.acc.y = this.JUMP_GRAVITY
    } else {
      this.acc.y = this.GRAVITY
    }

    // ground cancels all Y movement
    if (isOnGround) {
      this.acc.y = 0;
      this.vel.y = 0;
    }
  }
}
