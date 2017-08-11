/**
 * Created by roman.gaikov on 6/29/2016.
 */
import {BaseWebGameApplication} from "../base/BaseWebApplication";
import {DeferredDelegateAction} from "../base/utils/time/actions/DeferredDelegateAction";
import {Logger} from "../log/Logger";
import {ActionsQueue} from "../base/utils/time/actions/ActionsQueue";

class Test002 extends BaseWebGameApplication
{
    private _message:string = "Test002";

    constructor() {
        super();
        const queue = new ActionsQueue();

        for (let i = 0; i < 10; i++) {
            queue.addAction(new DeferredDelegateAction(0.5, ()=> this.createItem()));
        }

        queue.start();
    }

    private createItem():void {
        Logger.info("message: ", this._message);
        const item = TestUtils.createSquare(100, 0xaaaaff);
        item.x = Math.random() * window.innerWidth;
        item.y = Math.random() * window.innerHeight;
        this.stage.addChild(item);
    }
}
