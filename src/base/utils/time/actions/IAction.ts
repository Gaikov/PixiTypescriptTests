'use strict';
/**
 * Created by roman.gaikov on 6/29/2016.
 */

interface IAction
{
    getActive():boolean;
    onStart():void;
    onStopped(cancelled:boolean):void;
    frameStep(deltaTime:number):void;
}


