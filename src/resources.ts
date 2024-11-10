import {ImageSource, Sound, Sprite, SpriteSheet} from 'excalibur';
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
import machines from './images/machines.png';
import levelTable from './images/level_table.png';
import starGold from './images/star_gold.png';
import starGrey from './images/star_grey.png';
import bubble from './images/bubble.png';
import background from './images/background.png';
import backgroundBranches from './images/backgroundBranches.png';

var runSound = require('./music/running.mp3')
var jumpSound = require('./music/jump.mp3')
var drop = require('./music/drop.mp3')
var chirp1 = require('./music/chirp1.mp3')
var chirp2 = require('./music/chirp2.mp3')
var mainMusic = require('./music/main.mp3')
var grinderSound = require('./music/grinder.mp3')
var brewerSound = require('./music/brewing.mp3')

import resourceStation from './images/resource-station.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = new class Resources {
    public Load = {
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
        ResourceStation: new ImageSource(resourceStation),
        Wheel: new ImageSource(wheel),
        Button: new ImageSource(button),
        Machines: new ImageSource(machines),
        LevelTable: new ImageSource(levelTable),
        StarGold: new ImageSource(starGold),
        StarGrey: new ImageSource(starGrey),
        Bubble: new ImageSource(bubble),
        Background: new ImageSource(background),
        BackgroundBranches: new ImageSource(backgroundBranches),

        JumpSound: new Sound(jumpSound),
        RunSound: new Sound(runSound),
        Chirp1Sound: new Sound(chirp1),
        Chirp2Sound: new Sound(chirp2),
        DropSound: new Sound(drop),
        MainMusic: new Sound(mainMusic),
        GrinderSound: new Sound(grinderSound),
        BrewerSound: new Sound(brewerSound),
    }

    readonly Items = lazy(() =>
        SpriteSheet.fromImageSource({
            image: this.Load.ItemsImg,
            grid: {
                columns: 8,
                rows: 8,
                spriteHeight: 16,
                spriteWidth: 16,
            }
        })
    );

    readonly Machines = lazy(() =>
        SpriteSheet.fromImageSource({
            image: this.Load.Machines,
            grid: {
                columns: 8,
                rows: 5,
                spriteWidth: 48,
                spriteHeight: 70,
            }
        })
    );
}

function lazy<T>(provider: () => T): () => T {
    let storage: T | undefined = undefined;
    let computed = false;
    return () => {
        if (!computed) {
            storage = provider();
        }
        return storage!;
    }
}

export { Resources }
