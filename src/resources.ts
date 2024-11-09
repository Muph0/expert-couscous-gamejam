import { ImageSource, SpriteSheet } from 'excalibur';
import sword from './images/sword.png';
import magor from './images/magor.png';
import button from './images/button.png';
import veverkaRun from './images/veverka-run.png';
import veverkaIdle from './images/veverka-idle.png';
import logo from './images/acorn_logo.png';
import lever from './images/lever.png';
import platformSmall from './images/platform-small.png';
import platformMedium from './images/platform-medium.png';
import platformWheel from './images/platform-wheel.png';
import wheel from './images/wheel.png';
import items from './images/items.png';
import { Button } from './ui/button';

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
        Logo: new ImageSource(logo),
        Lever: new ImageSource(lever),
        PlatformSmall: new ImageSource(platformSmall),
        PlatformMedium: new ImageSource(platformMedium),
        PlatformWheel: new ImageSource(platformWheel),
        Wheel: new ImageSource(wheel),
        Button: new ImageSource(button),
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
