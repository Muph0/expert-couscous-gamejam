import { Magor } from '@/actors/magor';
import { Engine, ExcaliburGraphicsContext, Label, Scene, Text } from 'excalibur';

/**
 * Managed scene
 */
export class LevelOne extends Scene {

  width: number = 0
  height: number = 0

  entityCounter = new Label({ text: '' });

  public onActivate() { }
  public onDeactivate() { }

  public onInitialize(engine: Engine) {
    this.width = engine.drawWidth
    this.height = engine.drawHeight

    this.add(this.entityCounter);
  }

  onPostUpdate(engine: Engine, delta: number): void {
    if (this.entities.length < 0) {
      this.add(new Magor(this));
    }
  }

  onPreDraw(ctx: ExcaliburGraphicsContext, delta: number): void {
    this.entityCounter.text = `Entities: ${this.entities.length}`;
  }
}
