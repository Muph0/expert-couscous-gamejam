import {
    Actor, BodyComponent,
    Collider, CollisionContact,
    CollisionType,
    Color,
    Engine,
    Font,
    FontUnit,
    Label,
    PreCollisionEvent,
    Side,
    vec
} from 'excalibur';
import {Player} from "@/actors/player";

class ResourceStation extends Actor {
    private tooltip: Label;

    constructor(x: number, y: number, size: number) {
        super({
            x: x,
            y: y,
            width: size,
            height: size,
            color: Color.Gray,
            collisionType: CollisionType.Passive,
        });

        // Create tooltip (initially hidden)
        this.tooltip = new Label({
            text: 'F',
            pos: vec(0, -100), // Position the label above the station
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.tooltip.opacity = 0;
        this.addChild(this.tooltip); // Attach tooltip to the ResourceStation
    }

    onCollisionStart(
        self: Collider,
        other: Collider,
        side: Side,
        contact: CollisionContact
    ): void {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.tooltip.opacity = 1;
        }
    }

    onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact) {
        const otherBody = other.owner.get(BodyComponent)

        if (otherBody.owner instanceof Player) {
            this.tooltip.opacity = 0;
        }
    }
}

export default ResourceStation;
