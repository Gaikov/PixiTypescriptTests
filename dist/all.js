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
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var EnterFrameManager = (function () {
    function EnterFrameManager() {
        this._listeners = [];
    }
    EnterFrameManager.instance = function () {
        if (EnterFrameManager._instance == null) {
            EnterFrameManager._instance = new EnterFrameManager();
        }
        return EnterFrameManager._instance;
    };
    EnterFrameManager.prototype.addListener = function (l) {
        this._listeners.push(l);
    };
    EnterFrameManager.prototype.removeListener = function (l) {
        var index = this._listeners.indexOf(l);
        if (index >= 0) {
            this._listeners.splice(index, 1);
        }
    };
    EnterFrameManager.prototype.onEnterFrame = function (deltaTime) {
        //Logger.info(this + "enter frame");
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var l = _a[_i];
            l.onEnterFrame(deltaTime);
        }
    };
    return EnterFrameManager;
}());
///<reference path="../definitions/pixi.js.d.ts"/>
///<reference path="utils/time/EnterFrameManager.ts"/>
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
        EnterFrameManager.instance().onEnterFrame(deltaTime);
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
        var tf = new PIXI.Text("some text 1");
        tf.x = 100;
        tf.y = 100;
        this.stage.addChild(tf);
    }
    return Test000;
}(BaseWebGameApplication));
/**
 * Created by roman.gaikov on 6/28/2016.
 */
var UMath = (function () {
    function UMath() {
    }
    UMath.rad = function (degrees) {
        return degrees * Math.PI / 180;
    };
    return UMath;
}());
///<reference path="../../definitions/pixi.js.d.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var FPSMeter = (function (_super) {
    __extends(FPSMeter, _super);
    function FPSMeter() {
        _super.call(this);
        this._framesCount = 0;
        this._totalTime = 0;
        this._field = new PIXI.Text("fps", { font: "12px Arial" });
        this.addChild(this._field);
        EnterFrameManager.instance().addListener(this);
    }
    FPSMeter.prototype.onEnterFrame = function (deltaTime) {
        this._framesCount++;
        this._totalTime += deltaTime;
        if (this._framesCount >= 10) {
            var fps = this._framesCount / this._totalTime;
            this._field.text = fps.toFixed(2) + " fps";
            this._framesCount = 0;
            this._totalTime = 0;
        }
    };
    return FPSMeter;
}(PIXI.Container));
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var TestUtils = (function () {
    function TestUtils() {
    }
    TestUtils.createSquare = function (size, color) {
        //Logger.info("color", color);
        var res = new PIXI.Graphics();
        res.beginFill(color);
        res.drawRect(-size / 2, -size / 2, size, size);
        return res;
    };
    return TestUtils;
}());
///<reference path="../base/BaseWebApplication.ts"/>
///<reference path="../definitions/pixi.js.d.ts"/>
///<reference path="../base/utils/UMath.ts"/>
///<reference path="../base/debug/FPSMeter.ts"/>
///<reference path="utils/TestUtils.ts"/>
/**
 * Created by roman.gaikov on 6/28/2016.
 */
var Test001 = (function (_super) {
    __extends(Test001, _super);
    function Test001() {
        _super.call(this);
        this._angle = 0;
        this._pos = new PIXI.Point(200, 200);
        this._graphics = TestUtils.createSquare(100, 0xaaffff);
        this._graphics.x = 100;
        this._graphics.y = 100;
        this.stage.addChild(this._graphics);
        //this.stage.addChild(new FPSMeter());
    }
    Test001.prototype.animate = function (deltaTime) {
        this._graphics.rotation += UMath.rad(deltaTime * -360);
        this._angle += UMath.rad(180) * deltaTime;
        this._graphics.x = this._pos.x + Math.cos(this._angle) * 100;
        this._graphics.y = this._pos.y + Math.sin(this._angle) * 200;
    };
    return Test001;
}(BaseWebGameApplication));
/**
 * Created by roman.gaikov on 6/29/2016.
 */
///<reference path="IAction.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var BaseActionsQueue = (function () {
    function BaseActionsQueue() {
        this._queue = [];
    }
    BaseActionsQueue.prototype.addAction = function (action) {
        this._queue.push(action);
    };
    BaseActionsQueue.prototype.start = function () {
        return (this._current == null && this.nextAction());
    };
    BaseActionsQueue.prototype.stop = function () {
        if (this._current != null) {
            this._current.onStopped(true);
            this._current = null;
        }
        for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
            var action = _a[_i];
            action.onStopped(true);
        }
        this._queue.splice(0, this._queue.length);
    };
    BaseActionsQueue.prototype.isActive = function () {
        return (this._current != null && this._current.getActive()) || this._queue.length > 0;
    };
    BaseActionsQueue.prototype.findAction = function (matchFunc) {
        if (matchFunc(this._current)) {
            return this._current;
        }
        for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
            var a = _a[_i];
            if (matchFunc(a)) {
                return a;
            }
        }
        return null;
    };
    BaseActionsQueue.prototype.update = function (deltaTime) {
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
    };
    BaseActionsQueue.prototype.nextAction = function () {
        if (this._current != null) {
            this._current.onStopped(false);
        }
        this._current = this._queue.shift();
        if (this._current != null) {
            this._current.onStart();
            return true;
        }
        return false;
    };
    return BaseActionsQueue;
}());
/**
 * Created by roman.gaikov on 6/29/2016.
 */
///<reference path="BaseActionsQueue.ts"/>
///<reference path="../IFrameListener.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var ActionsQueue = (function (_super) {
    __extends(ActionsQueue, _super);
    function ActionsQueue() {
        _super.call(this);
    }
    ActionsQueue.prototype.start = function () {
        if (_super.prototype.start.call(this)) {
            EnterFrameManager.instance().addListener(this);
            return true;
        }
        return false;
    };
    ActionsQueue.prototype.stop = function () {
        _super.prototype.stop.call(this);
        EnterFrameManager.instance().removeListener(this);
    };
    ActionsQueue.prototype.onEnterFrame = function (deltaTime) {
        this.update(deltaTime);
    };
    return ActionsQueue;
}(BaseActionsQueue));
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var BaseDeferredAction = (function () {
    function BaseDeferredAction(timeLeft) {
        this._timeLeft = timeLeft;
    }
    BaseDeferredAction.prototype.getActive = function () {
        return this._timeLeft >= 0;
    };
    BaseDeferredAction.prototype.onStart = function () {
    };
    BaseDeferredAction.prototype.onStopped = function (cancelled) {
    };
    BaseDeferredAction.prototype.frameStep = function (deltaTime) {
        this._timeLeft -= deltaTime;
        if (this._timeLeft <= 0) {
            this.doAction();
        }
    };
    BaseDeferredAction.prototype.doAction = function () {
    };
    return BaseDeferredAction;
}());
///<reference path="BaseDeferredAction.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var DeferredDelegateAction = (function (_super) {
    __extends(DeferredDelegateAction, _super);
    function DeferredDelegateAction(timeLeft, delegate) {
        _super.call(this, timeLeft);
        this._delegate = delegate;
    }
    DeferredDelegateAction.prototype.doAction = function () {
        _super.prototype.doAction.call(this);
        this._delegate();
    };
    return DeferredDelegateAction;
}(BaseDeferredAction));
///<reference path="../base/utils/time/actions/ActionsQueue.ts"/>
///<reference path="../base/utils/time/actions/DeferredDelegateAction.ts"/>
///<reference path="../base/BaseWebApplication.ts"/>
/**
 * Created by roman.gaikov on 6/29/2016.
 */
var Test002 = (function (_super) {
    __extends(Test002, _super);
    function Test002() {
        var _this = this;
        _super.call(this);
        this._message = "Test002";
        var queue = new ActionsQueue();
        for (var i = 0; i < 10; i++) {
            queue.addAction(new DeferredDelegateAction(0.5, function () { return _this.createItem(); }));
        }
        queue.start();
    }
    Test002.prototype.createItem = function () {
        Logger.info("message: ", this._message);
        var item = TestUtils.createSquare(100, 0xaaaaff);
        item.x = Math.random() * window.innerWidth;
        item.y = Math.random() * window.innerHeight;
        this.stage.addChild(item);
    };
    return Test002;
}(BaseWebGameApplication));
/**
 * Created by roman.gaikov on 10/25/2016.
 */
var Test003 = (function (_super) {
    __extends(Test003, _super);
    function Test003() {
        _super.call(this);
        Logger.info("test003");
        var g = new PIXI.Graphics();
        g.beginFill(0xff0000, 1);
        g.drawRect(0, 0, 100, 100);
        this.stage.addChild(g);
    }
    return Test003;
}(BaseWebGameApplication));
///<reference path="log/Logger.ts"/>
///<reference path="tests/Test000.ts"/>
///<reference path="tests/Test001.ts"/>
///<reference path="tests/Test002.ts"/>
///<reference path="tests/Test003.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */
var Application = (function () {
    function Application() {
    }
    Application.run = function () {
        Logger.info("starting");
        //new Test000();
        //new Test001();
        //new Test002();
        new Test003();
    };
    return Application;
}());
(Application.run());

//# sourceMappingURL=all.js.map
