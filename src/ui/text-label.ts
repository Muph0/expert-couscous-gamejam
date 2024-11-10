import { Actor, Vector, Text, Font, BaseAlign, Color, FontUnit, TextAlign, vec } from "excalibur";

export class TextLabel {
    static WHITE = new Color(255, 255, 255);
    static GREY = new Color(46, 46, 46);
    static ORANGE = new Color(242, 157, 79);

    private _actor: Actor;
    constructor(
        x: number,
        y: number,
        size: number,
        message: string,
        color: Color = TextLabel.GREY,
        align: TextAlign = TextAlign.Center,
    ) {
        const text = new Text({ 
            text: message,
            font: new Font({
                textAlign: align,
                baseAlign: BaseAlign.Bottom,
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