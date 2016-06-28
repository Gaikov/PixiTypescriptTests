///<reference path="../base/BaseWebApplication.ts"/>
///<reference path="../definitions/pixi.js.d.ts"/>
///<reference path="../base/utils/UMath.ts"/>
/**
 * Created by roman.gaikov on 6/28/2016.
 */

class Test001 extends BaseWebGameApplication
{
    private _graphics:PIXI.Graphics;

    constructor() {
        super();

        this._graphics = new PIXI.Graphics();
        this._graphics.beginFill(0);
        this._graphics.drawRect(0, 0, 100, 100);

        this._graphics.x = 100;
        this._graphics.y = 100;

        this.stage.addChild(this._graphics);
    }

    protected animate(deltaTime:number):void
    {
        this._graphics.rotation += UMath.rad(deltaTime * 90);
    }
}
