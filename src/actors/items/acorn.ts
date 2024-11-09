import { Item } from './item';
import * as ex from 'excalibur';

export class Acorn extends Item {
    constructor() {
        super('Acorn', ex.Color.Brown);
    }
}
