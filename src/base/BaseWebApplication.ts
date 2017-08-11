/**
 * Created by roman.gaikov on 6/27/2016.
 */
import {EnterFrameManager} from "./utils/time/EnterFrameManager";
import {Logger} from "../log/Logger";


export class BaseWebGameApplication {
    //static private inline var NUM_SMOOTH_TIMES:Int = 10;
    //private var _smoothTime:Array<Float> = [];

    private _renderer:PIXI.SystemRenderer;
    private _prevTime:number = 0;
    private _stage:PIXI.Container = new PIXI.Container();

    public constructor() {
        //new Perf();

        //Logger.addLoggerItem(new LoggerTracePolicy());

        this._renderer = PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight,
            this.prepareRenderOptions());

        document.body.appendChild(this._renderer.view);
        window.requestAnimationFrame(this.loop.bind(this));

        const self = this;
        window.addEventListener("resize", function ():void
        {
            const w = window.innerWidth;
            const h = window.innerHeight;
            Logger.info(`resize ${w}x${h}`);
            self._renderer.resize(window.innerWidth, window.innerHeight);
        });
    }

    protected prepareRenderOptions():PIXI.RendererOptions {
        const opts:PIXI.RendererOptions = {};
        opts.backgroundColor = 0x99eeff;
        opts.autoResize = true;

        return opts;
    }

    public get renderer():PIXI.SystemRenderer {
        return this._renderer;
    }


    public get stage():PIXI.Container {
        return this._stage;
    }


    protected animate(deltaTime:number):void {

    }

    private loop(currentTime:number):void {
        window.requestAnimationFrame(this.loop.bind(this));
        const deltaTime:number = (currentTime - this._prevTime) / 1000;
        this._prevTime = currentTime;

        EnterFrameManager.instance().onEnterFrame(deltaTime);
        this.animate(deltaTime);

        this.renderer.render(this.stage);
    }
}



