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
///<reference path="TestClass.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */
var Application = (function () {
    function Application() {
        TestClass.log("started");
    }
    return Application;
}());
(new Application());

//# sourceMappingURL=all.js.map
