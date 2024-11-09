import { Engine, Loader, DisplayMode, Keys, Scene } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player';
import { Resources } from './resources';

/**
 * Managed game class
 */
class Game extends Engine {
  private player: Player;
  private levelOne: LevelOne;


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
      this.removeScene(this.levelOne);
      this.onStart();
    });
  }

  onStart(): void {
    // Create new scene with a player
    this.levelOne = new LevelOne();
    this.player = new Player();
    this.levelOne.add(this.player);
    this.addScene('idle', new Scene());
    this.addScene('levelOne', this.levelOne);
    this.goToScene('levelOne');
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (engine.input.keyboard.wasPressed(Keys.R)) {
      this.restart();
    }
  }
}

const game = new Game();
game.start().then(() => {
  game.onStart();
});
