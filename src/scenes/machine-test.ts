
import { Engine, Scene, vec } from "excalibur";
import { ItemActor } from "@/actors/items/itemActor";
import { Acorn } from "@/actors/items/items";
import { Grinder } from "@/actors/machines/grinder";

export class MachineTestScene extends Scene {
    onInitialize(engine: Engine) {
        this.physics.config.gravity = vec(0, 100);
        let mouse = engine.input.pointers.primary;

        this.add(new Grinder(100,100))


        mouse.on('down', e => {
            console.log('spawn');
            let acorn = new ItemActor(new Acorn());
            acorn.pos = mouse.lastWorldPos.clone();
            this.add(acorn);
        });
    }
}
