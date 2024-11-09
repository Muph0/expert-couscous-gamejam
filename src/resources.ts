import { ImageSource, Sprite, SpriteSheet } from 'excalibur';
import sword from './images/sword.png';
import magor from './images/magor.png';
import button from './images/button.png';
import veverkaRun from './images/veverka-run.png';
import veverkaIdle from './images/veverka-idle.png';
import logo from './images/acorn_logo.png';
import items from './images/items.png';
import machines from './images/machines.png';

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
        Button: new ImageSource(button),
        Machines: new ImageSource(machines),
    };

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
