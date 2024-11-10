import { Engine, Shape, vec, Actor, Color, CollisionType, Collider, Side, CollisionContact } from "excalibur";
import { Customer } from "@/actors/customer";
import { ItemActor } from "@/actors/items/itemActor";
import { ProductType } from "./items/items";

export class CustomerControl extends Actor {
    private static readonly HEIGHT = 100;
    private static readonly MIN_TIMEOUT = 1000;
    private static readonly MAX_TIMEOUT = 3000;
    private static readonly MAX_WAITING_CUSTOMERS = 2;
    private static readonly ITEM_TIMEOUT = 5000;
    private static readonly CUSTOMER_OFFSET = 40;

    private customers: Customer[] = [];
    private pendingProducts: ItemActor[] = [];

    constructor(x: number, y: number, width: number, height: number = 50) {
        super({
            pos: vec(x, y),
            height: height,
            width: width,
            color: Color.Transparent,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(engine: Engine) {
        this.scheduleCustomersRefresh(engine);
    }

    private scheduleCustomersRefresh(engine: Engine) {
        const timeout = Math.random() * (CustomerControl.MAX_TIMEOUT - CustomerControl.MIN_TIMEOUT) + CustomerControl.MIN_TIMEOUT;
        const scene = this.scene;
        if (scene === null)
            return;
        setTimeout(() => {
            this.customers = this.customers.filter(c => !c.isKilled());
            let waitingCustomers = this.customers.filter(c => !c.productAssigned());
            if (waitingCustomers.length < CustomerControl.MAX_WAITING_CUSTOMERS) {
                console.log("Adding customer.")
                const product = ProductType.COFFEE; // TODO: choose at random
                const waitingX = this.width + CustomerControl.CUSTOMER_OFFSET;
                const customer = new Customer(waitingX, product);

                this.customers.push(customer);
                waitingCustomers = this.customers.filter(c => !c.productAssigned());

                for (let i = 0; i < waitingCustomers.length; i++) {
                    waitingCustomers[i].goTo(this.width - CustomerControl.CUSTOMER_OFFSET * (waitingCustomers.length - i));
                }

                scene.add(customer);

                if (this.pendingProducts.length > 0) {
                    customer.goFetchItem(this.pendingProducts.pop()!);
                }
            }

            this.scheduleCustomersRefresh(engine);
        }, timeout);
    }

    onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact) {
        const item = other.owner;
        if (!(item instanceof ItemActor))
            return;
        if (item.allocatedToCustomer)
            return;
        if (!item.item.getProductType)
            return;
        const productType = item.item.getProductType();
        const customer = this.customers.find(c =>
            !c.satisfied && !c.productAssigned() && c.desiredProductType == productType
        );
        if (customer) {
            customer.goFetchItem(item);
        } else {
            this.pendingProducts.push(item);
            setTimeout(() => {
                if (this.pendingProducts.includes(item) && !item.allocatedToCustomer) {
                    this.pendingProducts = this.pendingProducts.filter(p => p != item);
                }
            }, CustomerControl.ITEM_TIMEOUT);
        }
    }
}