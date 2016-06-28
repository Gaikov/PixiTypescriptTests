///<reference path="../definitions/pixi.js.d.ts"/>
/**
 * Created by roman.gaikov on 6/27/2016.
 */


class BaseWebGameApplication {
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

        var self = this;
        window.addEventListener("resize", function ():void
        {
            var w = window.innerWidth;
            var h = window.innerHeight;
            Logger.info(`resize ${w}x${h}`);
            self._renderer.resize(window.innerWidth, window.innerHeight);
        });
    }

    protected prepareRenderOptions():PIXI.RendererOptions {
        var opts:PIXI.RendererOptions = {};
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
        var deltaTime:number = (currentTime - this._prevTime) / 1000;
        this._prevTime = currentTime;

        /*		_smoothTime.push(deltaTime);
         if (_smoothTime.length > NUM_SMOOTH_TIMES)
         {
         _smoothTime.shift();
         }
         deltaTime = 0;
         for (t in _smoothTime)
         {
         deltaTime += t;
         }
         deltaTime /= _smoothTime.length;*/


        //SimpleActuator.stage_onEnterFrame();

        //EnterFrameManager.getInstance().onEnterFrame(deltaTime);
        this.animate(deltaTime);

        this.renderer.render(this.stage);
    }
}



