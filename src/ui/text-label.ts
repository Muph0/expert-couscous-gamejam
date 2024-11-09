import { Actor, Vector, Text, Font, BaseAlign, Color, FontUnit, TextAlign, vec } from "excalibur";

export class TextLabel {
    static WHITE = new Color(255, 255, 255);
    static GREY = new Color(46, 46, 46);
    private _actor: Actor;
    constructor(
        x: number,
        y: number,
        size: number,
        message: string,
        color: Color = TextLabel.GREY,
    ) {
        const text = new Text({ 
            text: message,
            font: new Font({
                textAlign: TextAlign.Center,
                baseAlign: BaseAlign.Bottom,
                // shadow: {
                //     blur: 5,
                //     offset: vec(0, 0),
                //     color: Color.Black,
                // },
                family: 'Pixelify Sans',
                size,
                unit: FontUnit.Px,
                color,
                smoothing: false,
            })
        });
        text.scale = vec(1,1).scale(0.1);
        this._actor = new Actor();
        this._actor.graphics.use(text);
        this.actor.pos = vec(x + text.width / 2, y)
    }

    public get actor() {
        return this._actor;
    }
}