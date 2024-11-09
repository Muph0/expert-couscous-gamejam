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
        this.goToScene('main');
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.restart();
        }
    }
}
