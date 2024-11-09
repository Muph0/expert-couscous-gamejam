import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import magor from './images/magor.png';
import veverkaRun from './images/veverka-run.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Magor: new ImageSource(magor),
    VeverkaRun: new ImageSource(veverkaRun),
}

export { Resources }
