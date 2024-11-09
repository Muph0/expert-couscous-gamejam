import {Engine, Loader, DisplayMode, Keys, Scene, CollisionType, Color, Actor} from 'excalibur';
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

    let paddle = new Actor({
      x: 150,
      y: game.drawHeight - 40,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
    });

    paddle.body.collisionType = CollisionType.Passive;

    this.levelOne.add(paddle);

    paddle = new Actor({
      x: 250,
      y: game.drawHeight - 120,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
    });

    paddle.body.collisionType = CollisionType.Passive;

    this.levelOne.add(paddle);
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
