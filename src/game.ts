import * as ex from 'excalibur';
import { MainScene } from './scenes/main-scene';

export class Game extends ex.Engine {
    constructor() {
        super({
            canvasElementId: 'game',
            width: 800,
            height: 600
        });

        this.start().then(() => {
            this.add('main', new MainScene());
            this.goToScene('main');
        });
    }
}
