/**
 * Created by roman.gaikov on 6/15/2016.
 */
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.log = function (message) {
        console.log(message);
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
