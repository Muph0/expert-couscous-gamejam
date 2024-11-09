import {Engine, Shape, vec, Actor, Color, CollisionType, Collider, Side, CollisionContact} from "excalibur";
import {Customer} from "@/actors/customer";
import {ItemActor} from "@/actors/items/itemActor";
import {ProductType} from "@/levels/level";

export class CustomerControl extends Actor {
    private static readonly HEIGHT = 100;
    private static readonly MAX_TIMEOUT = 1000;
    private static readonly MAX_CUSTOMERS = 3;

    private customers: Customer[] = [];

    constructor() {
        super({
            pos: vec(0, 0),
            width: 0,
            height: 0,
            // color: Color.Red,
            collisionType: CollisionType.Passive,
            // anchor: vec(0, 0),
        });
    }

    onInitialize(engine: Engine) {
        this.pos = vec(engine.halfDrawWidth, engine.drawHeight - CustomerControl.HEIGHT + this.width / 2);
        this.collider.set(Shape.Box(engine.drawWidth, CustomerControl.HEIGHT));

        this.scheduleCustomer(engine);
    }

    private scheduleCustomer(engine: Engine) {
        const timeout = Math.random() * CustomerControl.MAX_TIMEOUT;
        const scene = this.scene;
        if (scene === null)
            return;
        setTimeout(() => {
            this.customers = this.customers.filter(c => !c.isKilled());
            if (this.customers.length >= CustomerControl.MAX_CUSTOMERS)
                return;
            const product = ProductType.COFFEE; // TODO: choose at random
            const waitingX = engine.drawWidth - (this.customers.length * 64);
            const customer = new Customer(waitingX, product);
            console.log("Adding customer.")
            this.customers.push(customer);
            scene.add(customer);

            this.scheduleCustomer(engine);
        }, timeout);
    }

    onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {
        if (!(other.owner instanceof ItemActor))
            return;
        if (other.owner.allocatedToCustomer)
            return;
        if (!other.owner.item.getProductType)
            return;
        const productType = other.owner.item.getProductType();
        const customer = this.customers.find(c => c.desiredProductType == productType);
        if (!customer)
            return;
        customer.goFetchItem(other.owner);
    }
}