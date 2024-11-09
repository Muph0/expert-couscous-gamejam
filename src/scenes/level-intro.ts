import { Item } from '@/actors/items/item';
import { Scene } from 'excalibur';
import { MainScene } from './main-scene';
import { Button } from '@/ui/button';

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
        private recipes: Recipe[],
        private level: Level
    ) {
        super();
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onInitialize(engine: ex.Engine): void {
        this.add(new Button(this.onButtonPress))
    }

    onButtonPress() {
        this.engine.goToScene(new MainScene())
    }
}