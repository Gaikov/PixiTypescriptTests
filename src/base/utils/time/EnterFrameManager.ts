/**
 * Created by roman.gaikov on 6/29/2016.
 */

class EnterFrameManager {
    private static _instance:EnterFrameManager;

    private _listeners:Array<IFrameListener> = [];

    public static instance():EnterFrameManager {
        if (EnterFrameManager._instance == null) {
            EnterFrameManager._instance = new EnterFrameManager();
        }
        return EnterFrameManager._instance;
    }

    public addListener(l:IFrameListener):void {
        this._listeners.push(l);
    }

    public removeListener(l:IFrameListener):void {
        var index = this._listeners.indexOf(l);
        if (index >= 0) {
            this._listeners.splice(index, 1);
        }
    }

    public onEnterFrame(deltaTime:number):void {
        //Logger.info(this + "enter frame");
        for (var l of this._listeners) {
            l.onEnterFrame(deltaTime);
        }
    }
}


