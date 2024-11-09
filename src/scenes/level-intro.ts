import { Item } from '@/actors/items/items';
import { Engine, Scene } from 'excalibur';
import { MainScene } from './main-scene';
import { Button } from '@/ui/button';
import { Game } from '@/game';

export class Level {
    constructor() {}
}

export class Recipe {

    constructor(
        private ingredients: Item[],
        private result: Item,
    ) {}
}

export class LevelIntro extends Scene {
    
    constructor(
        private game: Game,
        private level: Level
    ) {
        super();
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onInitialize(engine: ex.Engine): void {
        this.add(new Button(50, 50, this.onButtonPress))
    }

    onButtonPress() {
        this.game.play()
    }
}