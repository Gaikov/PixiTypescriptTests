'use strict';
/**
 * Created by roman.gaikov on 6/29/2016.
 */

class BaseDeferredAction implements IAction {
    private _timeLeft:number;

    constructor(timeLeft:number) {
        this._timeLeft = timeLeft;
    }

    public getActive():boolean {
        return this._timeLeft >= 0;
    }

    public onStart():void {
    }

    public onStopped(cancelled:boolean):void {
    }

    public frameStep(deltaTime:number):void {
        this._timeLeft -= deltaTime;
        if (this._timeLeft <= 0) {
            this.doAction();
        }
    }

    protected doAction():void {

    }
}


