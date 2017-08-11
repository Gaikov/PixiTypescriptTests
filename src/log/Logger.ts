/**
 * Created by roman.gaikov on 6/15/2016.
 */


export class Logger
{
    public static info(...args:any[]):void
    {
        console.log(args.join(" "));
    }
}
