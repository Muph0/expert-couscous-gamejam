import { MainScene } from './scenes/main-scene';
import {Engine, Loader, DisplayMode, Keys, Scene, CollisionType, Color, Actor} from 'excalibur';
import { Player } from './actors/player';
import { Resources } from './resources';

/**
 * Managed game class
 */
export class Game extends Engine {
    private player: Player;
    private mainScene: MainScene;

    constructor() {
        super({
            displayMode: DisplayMode.FillScreen,
            antialiasing: false,

        });
    }

    public start() {
        // Automatically load all default resources
        this.debug.collider.showBounds = true;
        const loader = new Loader(Object.values(Resources));
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
        this.player = new Player();
        this.mainScene.add(this.player);
        this.addScene('idle', new Scene());
        this.addScene('main', this.mainScene);
        this.goToScene('main');

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
