import {IFrameListener} from "../utils/time/IFrameListener";
import {EnterFrameManager} from "../utils/time/EnterFrameManager";

/**
 * Created by roman.gaikov on 6/29/2016.
 */

class FPSMeter extends PIXI.Container implements IFrameListener {
    private _field:PIXI.Text;
    private _framesCount:number = 0;
    private _totalTime:number = 0;

    constructor() {
        super();
        this._field = new PIXI.Text("fps", {font: "12px Arial"});
        this.addChild(this._field);

        EnterFrameManager.instance().addListener(this);
    }

    onEnterFrame(deltaTime:number):void {
        this._framesCount++;
        this._totalTime += deltaTime;
        if (this._framesCount >= 10) {
            const fps = this._framesCount / this._totalTime;
            this._field.text = `${fps.toFixed(2)} fps`;
            this._framesCount = 0;
            this._totalTime = 0;
        }
    }
}
