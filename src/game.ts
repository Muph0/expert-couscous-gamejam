import { MainScene } from './scenes/main-scene';
import { Engine, Loader, DisplayMode, Keys, Scene, CollisionType, Color, Actor } from 'excalibur';
import { Resources } from './resources';
import { Level, LevelIntro } from './scenes/level-intro';
import { GameStart } from './scenes/game-start';
import { LevelOutro } from './scenes/level-outro';
import { LEVELS } from './levels/level';

const enum Scenes {
    Idle = 'idle',
    Start = 'start',
    Intro = 'intro',
    Outro = 'outro',
    Main = 'main',
}

/**
 * Managed game class
 */
export class Game extends Engine {
    private mainScene!: MainScene;
    private curLevelId: number = 0
    private isShowDebug = false;

    constructor() {
        super({
            displayMode: DisplayMode.FillScreen,
            antialiasing: false,
        });

        this.debug.collider.boundsColor = Color.Red;
        this.debug.collider.showAll = true;
    }

    public start() {
        // Automatically load all default resources
        this.debug.collider.showBounds = true;
        const loader = new Loader(Object.values(Resources.Load));

        return super.start(loader);
    }

    restart(): void {
        this.goToScene(Scenes.Idle).then(() => {
            this.removeScene(this.mainScene);
            this.showCurrentLevel();
        });
    }

    onStart(): void {
        this.addScene(Scenes.Start, new GameStart(this));
        this.goToScene(Scenes.Start);
    }

    public showLevelIntro(): void {
        this.addScene(Scenes.Intro, new LevelIntro(this, LEVELS[this.curLevelId], this.curLevelId));
        this.goToScene(Scenes.Intro);
    }

    public showLevelOutro(points: number, maxPoints: number) {
        this.addScene(Scenes.Outro, new LevelOutro(this, this.curLevelId, points, maxPoints));
        this.goToScene(Scenes.Outro);
    }

    public showNextLevel(): void {
        this.curLevelId++;
        if (this.curLevelId >= LEVELS.length) {
            this.restart()
            // TODO: add and screen or restart
        } else {
            this.showCurrentLevel();
        }
    }
    public showCurrentLevel(): void {
        this.addScene(Scenes.Main, new MainScene(this, LEVELS[this.curLevelId]));
        this.goToScene(Scenes.Main);
    }

    onPreUpdate(engine: Engine, delta: number): void {
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.restart();
        }
        if (engine.input.keyboard.wasPressed(Keys.F4)) {
            this.isShowDebug = !this.isShowDebug;
            this.showDebug(this.isShowDebug);
        }
    }
}
