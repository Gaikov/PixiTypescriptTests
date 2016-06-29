/**
 * Created by roman.gaikov on 6/29/2016.
 */

class TestUtils
{
    public static createSquare(size:number, color?:number):PIXI.Graphics
    {
        Logger.info("color", color);

        var res = new PIXI.Graphics();
        res.beginFill(color);
        res.drawRect(-size/2, -size/2, size, size);

        return res;
    }
}
