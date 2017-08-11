import {IAction} from "./IAction";

/**
 * Created by roman.gaikov on 6/29/2016.
 */

export class BaseActionsQueue {
    private _queue: Array<IAction> = [];
    private _current: IAction;

    constructor() {
    }

    public addAction(action: IAction): void {
        this._queue.push(action);
    }

    public start(): boolean {
        return (this._current == null && this.nextAction());
    }

    public stop(): void {
        if (this._current != null) {
            this._current.onStopped(true);
            this._current = null;
        }

        for (const action of this._queue) {
            action.onStopped(true);
        }
        this._queue.splice(0, this._queue.length);
    }

    public isActive(): boolean {
        return (this._current != null && this._current.getActive()) || this._queue.length > 0;
    }

    public findAction(matchFunc: (action: IAction) => boolean): IAction {
        if (matchFunc(this._current)) {
            return this._current;
        }

        for (const a of this._queue) {
            if (matchFunc(a)) {
                return a;
            }
        }
        return null;
    }

    public update(deltaTime: number): void {
        if (this._current != null) {
            if (!this._current.getActive()) {
                if (!this.nextAction()) {
                    this.stop();
                }
            }

            if (this._current != null) {
                this._current.frameStep(deltaTime);
            }
        }
    }

    private nextAction(): boolean {
        if (this._current != null) {
            this._current.onStopped(false);
        }

        this._current = this._queue.shift();
        if (this._current != null) {
            this._current.onStart();
            return true;
        }
        return false;
    }

}


