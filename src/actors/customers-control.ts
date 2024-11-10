import {Engine, Shape, vec, Actor, Color, CollisionType, Collider, Side, CollisionContact} from "excalibur";
import {Customer} from "@/actors/customer";
import {ItemActor} from "@/actors/items/itemActor";
import { MainScene } from "@/scenes/main-scene";
import { DesiredItem } from "@/levels/level";
import {Resources} from "@/resources";

export class CustomerControl extends Actor {
    private static readonly HEIGHT = 100;
    private static readonly MIN_TIMEOUT = 1000;
    private static readonly MAX_TIMEOUT = 3000;
    private static readonly MAX_WAITING_CUSTOMERS = 2;
    private static readonly ITEM_TIMEOUT = 5000;
    private static readonly CUSTOMER_OFFSET = 40;

    private mainScene: MainScene;
    private customers: Customer[] = [];
    private pendingProducts: ItemActor[] = [];

    private desiredItems: DesiredItem[];

    constructor(scene: MainScene, x: number, y: number, width: number, desiredItems: DesiredItem[], height: number = 80) {
        super({
            pos: vec(x, y),
            height: height,
            width: width,
            color: Color.Transparent,
            collisionType: CollisionType.Passive,
        });

        this.mainScene = scene;
        this.desiredItems = desiredItems;
    }

    sampleItem(): DesiredItem {
        const cumulativeWeights: number[] = [];
        this.desiredItems.reduce((acc, item, i) => {
            cumulativeWeights[i] = acc + item.distribution;
            return cumulativeWeights[i];
        }, 0);

        const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];

        return this.desiredItems[cumulativeWeights.findIndex(cumulativeWeight => random < cumulativeWeight)];
    }

    onInitialize(engine: Engine) {
        this.scheduleCustomersRefresh(engine);
    }

    private scheduleCustomersRefresh(engine: Engine) {
        const timeout = Math.random() * (CustomerControl.MAX_TIMEOUT - CustomerControl.MIN_TIMEOUT) + CustomerControl.MIN_TIMEOUT;
        const scene = this.mainScene;
        if (scene === null)
            return;
        setTimeout(() => {
            this.customers = this.customers.filter(c => !c.isKilled());
            let waitingCustomers = this.customers.filter(c => !c.productAssigned());
            if (waitingCustomers.length < CustomerControl.MAX_WAITING_CUSTOMERS) {
                console.log("Adding customer.")

                const product = this.sampleItem()
                const waitingX = this.width + CustomerControl.CUSTOMER_OFFSET;
                const customer = new Customer(waitingX, product);

                if (Math.random() < 0.5) {
                    Resources.Load.Chirp1Sound.play(0.5)
                } else {
                    Resources.Load.Chirp2Sound.play(0.5)
                }

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
        const itemActor = other.owner;
        if (!(itemActor instanceof ItemActor)) return;
        if (itemActor.allocatedToCustomer) return;

        let item = itemActor.item;

        const customer = this.customers.find(c =>
            !c.satisfied && !c.productAssigned() && Object.getPrototypeOf(c.desiredItem.item) == Object.getPrototypeOf(item)
        );

        if (customer) {
            customer.goFetchItem(itemActor);
            console.log('Fetched item')
            this.mainScene.resolveCustomer(customer);
        } else {
            // Add item to pendingProducts
            this.pendingProducts.push(itemActor);

            // console.log(itemActor)

            // Set a timeout to remove the item if it’s not assigned to a customer
            setTimeout(() => {
                // Check if item is still in pendingProducts and not assigned
                if (this.pendingProducts.includes(itemActor) && !itemActor.allocatedToCustomer) {
                    // Remove from pendingProducts
                    this.pendingProducts = this.pendingProducts.filter(p => p !== itemActor);

                    itemActor.actions.fade(0, 1000).callMethod(() => {
                        itemActor.kill();
                    });
                }
            }, CustomerControl.ITEM_TIMEOUT);
        }
    }
}