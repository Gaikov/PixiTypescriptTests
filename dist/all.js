var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by roman.gaikov on 6/15/2016.
 */
var Logger = (function () {
    function Logger() {
    }
    Logger.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log(args.join(" "));
    };
    return Logger;
}());
///<reference path="../definitions/pixi.js.d.ts"/>
/**
 * Created by roman.gaikov on 6/27/2016.
 */
var BaseWebGameApplication = (function () {
    function BaseWebGameApplication() {
        //new Perf();
        this._prevTime = 0;
        this._stage = new PIXI.Container();
        //Logger.addLoggerItem(new LoggerTracePolicy());
        this._renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, this.prepareRenderOptions());
        document.body.appendChild(this._renderer.view);
        window.requestAnimationFrame(this.loop.bind(this));
        var self = this;
        window.addEventListener("resize", function () {
            var w = window.innerWidth;
            var h = window.innerHeight;
            Logger.info("resize " + w + "x" + h);
            self._renderer.resize(window.innerWidth, window.innerHeight);
        });
    }
    BaseWebGameApplication.prototype.prepareRenderOptions = function () {
        var opts = {};
        opts.backgroundColor = 0x99eeff;
        opts.autoResize = true;
        return opts;
    };
    Object.defineProperty(BaseWebGameApplication.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseWebGameApplication.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    BaseWebGameApplication.prototype.animate = function (deltaTime) {
    };
    BaseWebGameApplication.prototype.loop = function (currentTime) {
        window.requestAnimationFrame(this.loop.bind(this));
        var deltaTime = (currentTime - this._prevTime) / 1000;
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
    };
    return BaseWebGameApplication;
}());
///<reference path="../base/BaseWebApplication.ts"/>
///<reference path="../log/Logger.ts"/>
/**
 * Created by roman.gaikov on 6/27/2016.
 */
var Test000 = (function (_super) {
    __extends(Test000, _super);
    function Test000() {
        _super.call(this);
        Logger.info("init");
        var tf = new PIXI.Text("some text");
        tf.x = 100;
        tf.y = 100;
        this.stage.addChild(tf);
    }
    return Test000;
}(BaseWebGameApplication));
///<reference path="log/Logger.ts"/>
///<reference path="tests/Test000.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */
var Application = (function () {
    function Application() {
    }
    Application.run = function () {
        Logger.info("starting");
        new Test000();
    };
    return Application;
}());
(Application.run());
///<reference path="log/Logger.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.log = function (message) {
        Logger.info("Message from test: ", message);
    };
    return TestClass;
}());

//# sourceMappingURL=all.js.map
