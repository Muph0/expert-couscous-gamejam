import { ImageSource, SpriteSheet } from 'excalibur';
import sword from './images/sword.png';
import magor from './images/magor.png';
import veverkaRun from './images/veverka-run.png';
import veverkaIdle from './images/veverka-idle.png';
import items from './images/items.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {

    Load: {
        Sword: new ImageSource(sword),
        Magor: new ImageSource(magor),
        VeverkaRun: new ImageSource(veverkaRun),
        VeverkaIdle: new ImageSource(veverkaIdle),
        ItemsImg: new ImageSource(items),
    },

    get Items(): SpriteSheet {
        return SpriteSheet.fromImageSource({
            image: this.Load.ItemsImg,
            grid: {
                columns: 8,
                rows: 8,
                spriteHeight: 16,
                spriteWidth: 16,
            }
        });
    }
}

export { Resources }
