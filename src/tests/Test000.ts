'use strict';
///<reference path="../base/BaseWebApplication.ts"/>
///<reference path="../log/Logger.ts"/>
/**
 * Created by roman.gaikov on 6/27/2016.
 */

class Test000 extends BaseWebGameApplication
{
    constructor() {
        super();
        Logger.info("init");

        var tf = new PIXI.Text("some text");
        tf.x = 100;
        tf.y = 100;

        this.stage.addChild(tf);
    }


}
