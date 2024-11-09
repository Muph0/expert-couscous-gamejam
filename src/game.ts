import { MainScene } from './scenes/main-scene';
import {Engine, Loader, DisplayMode, Keys, Scene, CollisionType, Color, Actor} from 'excalibur';
import { Resources } from './resources';
import { MachineTestScene } from './scenes/machine-test';

/**
 * Managed game class
 */
export class Game extends Engine {
    private mainScene!: MainScene;

    constructor() {
        super({
            displayMode: DisplayMode.FillScreen,
            antialiasing: false,

        });
    }

    public start() {
        // Automatically load all default resources
        this.debug.collider.showBounds = true;
        const loader = new Loader(Object.values(Resources.Load));
        return super.start(loader);
    }

    restart(): void {
        this.goToScene('idle').then(() => {
            this.removeScene(this.mainScene);
            this.onStart();
        });
    }

    onStart(): void {
        // Create new scene with a player
        this.mainScene = new MainScene();
        this.addScene('idle', new Scene());
        this.addScene('main', this.mainScene);
        this.addScene('machine-test', new MachineTestScene());
        this.goToScene('machine-test');

        let paddle = new Actor({
            x: 150,
            y: this.drawHeight - 40,
            width: 200,
            height: 20,
            color: Color.Chartreuse,
        });

        paddle.body.collisionType = CollisionType.Passive;

        this.mainScene.add(paddle);

        paddle = new Actor({
            x: 250,
            y: this.drawHeight - 120,
            width: 200,
            height: 20,
            color: Color.Chartreuse,
        });

        paddle.body.collisionType = CollisionType.Passive;

        this.mainScene.add(paddle);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.restart();
        }
    }
}
