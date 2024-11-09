import * as ex from 'excalibur'
import { Resources } from '@/resources'

export class Button extends ex.ScreenElement {
    
  constructor(
    private x: number,
    private y: number,
    private callback: () => void,
  ) {
    super({
      x,
      y,
    })
  }

  onInitialize() {
    const button = Resources.Load.Button.toSprite()
    const buttonDark = button.clone()
    buttonDark.tint = new ex.Color(100, 100, 100)
    this.graphics.add('idle', button)
    this.graphics.add('hover', buttonDark)
    this.graphics.use('idle')

    this.on('pointerup', () => {
      this.callback()
    })

    this.on('pointerenter', () => {
      this.graphics.use('hover')
      console.log("Hover!")
    })

    this.on('pointerleave', () => {
      this.graphics.use('idle')
    })

    console.log("initialized button")
  }
}