/**
 * Created by roman.gaikov on 6/29/2016.
 */

import {BaseDeferredAction} from "./BaseDeferredAction";

export class DeferredDelegateAction extends BaseDeferredAction
{
    private _delegate:()=>void;
    
    constructor(timeLeft:number, delegate:()=>void) {
        super(timeLeft);
        this._delegate = delegate;
    }

    protected doAction():void 
    {
        super.doAction();
        this._delegate();
    }
}
