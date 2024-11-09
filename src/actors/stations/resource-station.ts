import {
    Actor,
    BaseAlign,
    BodyComponent,
    Collider,
    CollisionContact,
    CollisionType,
    Color,
    Engine,
    Font,
    FontUnit,
    Keys,
    Label,
    Side,
    TextAlign,
    vec
} from 'excalibur';
import {Player} from "@/actors/player";
import {ItemActor} from "@/actors/items/itemActor";
import {Item} from "@/actors/items/items";

class ResourceStation extends Actor {
    private tooltip: Label;
    private cooldownTimer = 0;
    private isOnCooldown = false;

    playerReference?: Player;
    item: Item;

    COOLDOWN = 5;

    constructor(x: number, y: number, size: number, item: Item) {
        super({
            x: x,
            y: y,
            width: size,
            height: size,
            color: Color.Gray,
            collisionType: CollisionType.Passive,
        });

        this.item = item;

        // Create tooltip (initially hidden)
        this.tooltip = new Label({
            text: 'Space',
            pos: vec(0, -size / 2 - 6), // Position the label above the station
            font: new Font({
                textAlign: TextAlign.Center,
                baseAlign: BaseAlign.Bottom,
                shadow: {
                    blur: 5,
                    offset: vec(0, 0),
                    color: Color.Black,
                },
                family: 'Silkscreen',
                size: 15,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.tooltip.scale = vec(0, 0);

        this.addChild(this.tooltip); // Attach tooltip to the ResourceStation
    }

    onPostUpdate(engine: Engine, delta: number): void {
        const fPressed = engine.input.keyboard.wasPressed(Keys.Space);

        // Cooldown logic
        if (this.isOnCooldown) {
            // Decrease the cooldown timer by the delta time
            this.cooldownTimer -= delta / 1000; // Convert ms to seconds
            if (this.cooldownTimer <= 0) {
                this.isOnCooldown = false;
                this.tooltip.text = 'Space'; // Reset tooltip text when cooldown ends
            } else {
                // Update tooltip text with remaining time
                this.tooltip.text = `${this.cooldownTimer.toFixed(1)}s`;
                this.tooltip.graphics.opacity = 0.5;
            }
        } else if (this.playerReference) {
            if (!this.playerReference.isCarryingItem()) {
                this.tooltip.graphics.opacity = 1;
            } else {
                this.tooltip.graphics.opacity = 0.5;
            }

            // Allow item pickup only if not on cooldown
            if (fPressed && !this.playerReference.isCarryingItem() && !this.isOnCooldown) {
                this.playerReference.pickUpItem(new ItemActor(this.item));

                // Start the cooldown
                this.isOnCooldown = true;
                this.cooldownTimer = this.COOLDOWN;
                this.tooltip.text = `${this.COOLDOWN.toFixed(1)}s`; // Display initial cooldown time

                this.actions.delay(this.COOLDOWN * 1000).callMethod(() => {
                    // hide
                    if (this.playerReference == undefined) {
                        this.tooltip.actions.scaleTo(vec(0, 0), vec(10, 20));
                        this.tooltip.text = `0.0s`;
                    }
                })

            }
        }
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent);

        if (otherBody.owner instanceof Player) {
            this.playerReference = otherBody.owner;
            this.tooltip.actions.scaleTo(vec(1, 1), vec(10, 20));
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        const otherBody = other.owner.get(BodyComponent);

        if (otherBody.owner instanceof Player) {
            this.playerReference = undefined;

            // only hide if it's not on cooldown, otherwise we hide when it comes out of cooldown
            if (!this.isOnCooldown) {
                this.tooltip.actions.scaleTo(vec(0, 0), vec(10, 20));
            }
        }
    }
}

export default ResourceStation;
