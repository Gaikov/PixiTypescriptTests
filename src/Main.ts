///<reference path="log/Logger.ts"/>
///<reference path="tests/Test000.ts"/>
/**
 * Created by roman.gaikov on 6/15/2016.
 */

class Application
{
    public static run()
    {
        Logger.info("starting");
        new Test000();
    }
}

(
    Application.run()
);
