import { Item } from './item';
import * as ex from 'excalibur';

export class Coffee extends Item {
    constructor() {
        super('Coffee', ex.Color.Black);
    }
}
