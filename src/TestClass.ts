///<reference path="log/Logger.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */

class TestClass
{
    public static log(message:String):void
    {
        Logger.info("Message from test: ", message);
    }
}
