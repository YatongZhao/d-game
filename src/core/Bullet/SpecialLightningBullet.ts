import { Game } from "..";
import { Point } from "../Point";
import { drawLightning } from "../tool";
import { Bullet } from "./Bullet";

export class SpecialLightningBullet extends Bullet {
    game: Game;
    y = 0;

    constructor(game: Game) {
        super();
        this.game = game;
        this.y = this.game.targetY;
    }
    go() {
        this.y -= 5;
        this.game.enemys.forEach(enemy => {
            if (enemy.point.y <= this.y && enemy.point.y + enemy.size >= this.y) {
                enemy.hited();
            }
        });

        if (this.y <= 0) {
            this.game.removeBullet(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        drawLightning(
            new Point(0, this.y, this.game.coordinate),
            new Point(this.game.width, this.y, this.game.coordinate),
            ctx);
    }
}