import { MainScene } from './scenes/main-scene';
import {Engine, Loader, DisplayMode, Keys, Scene, CollisionType, Color, Actor} from 'excalibur';
import { Resources } from './resources';
import { Level, LevelIntro } from './scenes/level-intro';
import { GameStart } from './scenes/game-start';

/**
 * Managed game class
 */
export class Game extends Engine {
    private mainScene!: MainScene;
    private levels: Level[]
    private curLevelId: number

    constructor() {
        super({
            displayMode: DisplayMode.FillScreen,
            antialiasing: false,
        });
        this.levels = []
        this.curLevelId = 0
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
            this.play();
        });
    }

    onStart(): void {
        this.addScene('start', new GameStart(this));
        this.goToScene('start');
    }

    public firstLevel(): void {
        this.curLevelId = 0;
        this.addScene('intro', new LevelIntro(this, this.levels[this.curLevelId]));
        this.goToScene('intro');
    }

    public newLevel(): void {
        this.curLevelId++;
        if (this.curLevelId >= this.levels.length) {
            // TODO: add and screen or restart
            this.restart()
        }
        this.removeScene('intro');
        this.addScene('intro', new LevelIntro(this, this.levels[this.curLevelId]));
        this.goToScene('intro');

    }

    public play(): void {
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
