import * as ex from 'excalibur';
import { PlayerSquirrel } from '@/actors/player-squirrel';
import { AutomaticSquirrel } from '@/actors/automatic-squirrel';
import { Platform } from '@/actors/platform';
import { Grinder } from '@/actors/machines/grinder';
import { Brewer } from '@/actors/machines/brewer';
import { Customer } from '@/actors/customer';

export class MainScene extends ex.Scene {
    onInitialize(engine: ex.Engine) {
        // Create platforms
        const platforms = [
            new Platform(100, 200, 200, 20),
            new Platform(400, 300, 200, 20),
            // TODO: Add more platforms as needed
        ];
        platforms.forEach(platform => this.add(platform));

        // Create player-controlled squirrel
        const player = new PlayerSquirrel();
        this.add(player);

        // Create AI-controlled squirrel
        const aiSquirrel = new AutomaticSquirrel();
        this.add(aiSquirrel);

        // Create machines
        const grinder = new Grinder(300, 400);
        this.add(grinder);

        const brewer = new Brewer(500, 450);
        this.add(brewer);

        // TODO: Position the machines properly

        // Create customers
        const customer = new Customer('Coffee');
        this.add(customer);

        // TODO: Add more customers and implement customer spawning logic
    }
}
