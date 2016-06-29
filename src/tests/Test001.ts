///<reference path="../base/BaseWebApplication.ts"/>
///<reference path="../definitions/pixi.js.d.ts"/>
///<reference path="../base/utils/UMath.ts"/>
///<reference path="../base/debug/FPSMeter.ts"/>
///<reference path="utils/TestUtils.ts"/>
/**
 * Created by roman.gaikov on 6/28/2016.
 */
'use strict';

class Test001 extends BaseWebGameApplication
{
    private _graphics:PIXI.Graphics;
    private _angle:number = 0;
    private _pos:PIXI.Point = new PIXI.Point(200, 200);

    constructor() {
        super();
        
        this._graphics = TestUtils.createSquare(100, 0xaaffff);

        this._graphics.x = 100;
        this._graphics.y = 100;

        this.stage.addChild(this._graphics);
        this.stage.addChild(new FPSMeter());
    }

    protected animate(deltaTime:number):void
    {
        this._graphics.rotation += UMath.rad(deltaTime * -360);
        this._angle += UMath.rad(180) * deltaTime;

        this._graphics.x = this._pos.x + Math.cos(this._angle) * 100;
        this._graphics.y = this._pos.y + Math.sin(this._angle) * 200;
    }
}
