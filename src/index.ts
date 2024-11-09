import {Game} from "./game";

const game = new Game();
game.start().then(() => {
  game.onStart();
});
