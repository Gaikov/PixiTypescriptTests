///<reference path="../base/utils/time/actions/ActionsQueue.ts"/>
///<reference path="../base/utils/time/actions/DeferredDelegateAction.ts"/>
///<reference path="../base/BaseWebApplication.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */

class Test002 extends BaseWebGameApplication
{
    private _message:string = "Test002";

    constructor() {
        super();
        var queue = new ActionsQueue();

        for (let i = 0; i < 10; i++) {
            queue.addAction(new DeferredDelegateAction(0.5, ()=> this.createItem()));
        }

        queue.start();
    }

    private createItem():void {
        Logger.info("message: ", this._message);
        var item = TestUtils.createSquare(100, 0xaaaaff);
        item.x = Math.random() * window.innerWidth;
        item.y = Math.random() * window.innerHeight;
        this.stage.addChild(item);
    }
}
