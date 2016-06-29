'use strict';
/**
 * Created by roman.gaikov on 6/15/2016.
 */


class Logger
{
    public static info(...args):void
    {
        console.log(args.join(" "));
    }
}
