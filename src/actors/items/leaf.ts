import { Item } from './Item';
import * as ex from 'excalibur';

export class Leaf extends Item {
    constructor() {
        super('Leaf', ex.Color.Green);
    }
}
