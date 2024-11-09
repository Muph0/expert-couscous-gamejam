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

    playerReference?: Player;
    item: Item;

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
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.tooltip.scale = vec(0, 0);

        this.addChild(this.tooltip); // Attach tooltip to the ResourceStation
    }

    onPostUpdate(engine: Engine, delta: number): void {
        const fPressed = engine.input.keyboard.wasPressed(Keys.Space)

        if (this.playerReference) {
            if (this.tooltip.scale.x == 0 && !this.playerReference.isCarryingItem()) {
                this.tooltip.actions.scaleTo(vec(1, 1), vec(10, 20));
            } else if (this.tooltip.scale.x != 0 && this.playerReference.isCarryingItem()) {
                this.tooltip.actions.scaleTo(vec(0, 0), vec(10, 20));
            }

            if (fPressed && !this.playerReference.isCarryingItem()) {
                this.playerReference.pickUpItem(
                    new ItemActor(this.item)
                )
            }

        }
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.playerReference = otherBody.owner;
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.playerReference = null;
            this.tooltip.actions.scaleTo(vec(0, 0), vec(10, 20));
        }
    }
}

export default ResourceStation;
