/**
 * Created by roman.gaikov on 6/27/2016.
 */
import {BaseWebGameApplication} from "../base/BaseWebApplication";
import {Logger} from "../log/Logger";

export class Test000 extends BaseWebGameApplication
{
    constructor() {
        super();
        Logger.info("init");

        const tf = new PIXI.Text("some text 1");
        tf.x = 100;
        tf.y = 100;

        this.stage.addChild(tf);
    }


}
