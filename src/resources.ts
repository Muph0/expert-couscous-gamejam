import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import magor from './images/magor.png';
import button from './images/button.png';
import veverkaRun from './images/veverka-run.png';
import veverkaIdle from './images/veverka-idle.png';
import logo from './images/acorn_logo.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Magor: new ImageSource(magor),
    Button: new ImageSource(button),
    VeverkaRun: new ImageSource(veverkaRun),
    VeverkaIdle: new ImageSource(veverkaIdle),
    Logo: new ImageSource(logo),
}

export { Resources }
