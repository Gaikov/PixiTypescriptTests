/**
 * Created by roman.gaikov on 10/25/2016.
 */

class Test003 extends BaseWebGameApplication
{
	constructor()
	{
		super();

		Logger.info("test003");

		let g = new PIXI.Graphics();
		g.beginFill(0xff0000, 1);
		g.drawRect(0, 0, 100, 100);

		this.stage.addChild(g);
	}
}
