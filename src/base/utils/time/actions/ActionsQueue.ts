/**
 * Created by roman.gaikov on 6/29/2016.
 */
import {IFrameListener} from "../IFrameListener";
import {EnterFrameManager} from "../EnterFrameManager";
import {BaseActionsQueue} from "./BaseActionsQueue";

export class ActionsQueue extends BaseActionsQueue implements IFrameListener {
    constructor() {
        super();
    }

    public start():boolean {
        if (super.start()) {
            EnterFrameManager.instance().addListener(this);
            return true;
        }
        return false;
    }

    public stop():void {
        super.stop();
        EnterFrameManager.instance().removeListener(this);
    }

    public onEnterFrame(deltaTime:number):void {
        this.update(deltaTime);
    }
}

