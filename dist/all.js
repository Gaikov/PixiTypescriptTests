var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by roman.gaikov on 6/15/2016.
 */
/**
 * Created by roman.gaikov on 6/29/2016.
 */
/**
 * Created by roman.gaikov on 6/28/2016.
 */
/**
 * Created by roman.gaikov on 6/29/2016.
 */
/**
 * Created by roman.gaikov on 6/29/2016.
 */
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

//# sourceMappingURL=all.js.map
