/**
 * Created by roman.gaikov on 6/15/2016.
 */
import "pixi.js";
import "fpsmeter";
import {Logger} from "./log/Logger";
import {Test003} from "./tests/Test003";
import {Test002} from "./tests/Test002";

class Application {
    public static run() {
        Logger.info("starting");
        //new Test000();
        //new Test001();
        new Test002();
        //new Test003();
    }
}

Application.run();
