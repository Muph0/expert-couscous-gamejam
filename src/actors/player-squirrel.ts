import * as ex from 'excalibur';
import { Item } from './items/item';

export class PlayerSquirrel extends ex.Actor {
    private carryingItem: Item | null = null;

    constructor() {
        super({
            pos: ex.vec(150, 150),
            width: 32,
            height: 32,
            color: ex.Color.DarkGray,
            collisionType: ex.CollisionType.Active,
        });
    }

    onInitialize(engine: ex.Engine) {
        this.on('precollision', this.onPreCollision.bind(this));

        engine.input.keyboard.on('hold', this.onKeyHold.bind(this));
        engine.input.keyboard.on('release', this.onKeyRelease.bind(this));
    }

    onPreCollision(evt: ex.PreCollisionEvent) {
        if (evt.other instanceof Item && !this.carryingItem) {
            this.carryingItem = evt.other as Item;
            evt.other.kill(); // Remove item from the scene
        }
    }

    onKeyHold(evt: ex.Input.KeyEvent) {
        if (evt.key === ex.Input.Keys.Left) {
            this.vel.x = -150;
        }
        if (evt.key === ex.Input.Keys.Right) {
            this.vel.x = 150;
        }
        if (evt.key === ex.Input.Keys.Up && this.isOnGround()) {
            this.vel.y = -400;
        }
    }

    onKeyRelease(evt: ex.Input.KeyEvent) {
        if (evt.key === ex.Input.Keys.Left || evt.key === ex.Input.Keys.Right) {
            this.vel.x = 0;
        }
        if (evt.key === ex.Input.Keys.Space) {
            this.dropItem();
        }
    }

    isOnGround(): boolean {
        // TODO: Implement proper ground detection
        return true;
    }

    dropItem() {
        if (this.carryingItem) {
            const droppedItem = this.carryingItem;
            droppedItem.pos = this.pos.clone();
            droppedItem.vel = ex.vec(this.vel.x, 0);
            this.scene.add(droppedItem);
            this.carryingItem = null;
        }
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);
        // Apply gravity
        this.vel.y += 800 * delta / 1000;
    }
}
