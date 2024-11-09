import { ExcaliburGraphicsContext, PreDrawEvent, Scene, vec, Vector } from "excalibur";


/** Updates the scene camera pos and zoom so that the entire scene is visible */
export class SceneScaler {

    private handler: typeof this.onScenePreDraw;

    constructor(
        readonly sizeInPixels: Vector,
        readonly scene: Scene,
    ) {
        this.handler = this.onScenePreDraw.bind(this);
        scene.on('predraw', this.handler);
    }

    deactivate() {
        this.scene.off('predraw', this.handler);
    }

    private onScenePreDraw(e: PreDrawEvent): void {
        this.scene.camera.pos = this.sizeInPixels.scale(1 / 2);
        this.scene.camera.zoom = Math.min(e.ctx.height, e.ctx.width) / this.sizeInPixels.y;
    }
}
