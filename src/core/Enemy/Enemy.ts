import { Game } from "..";
import { Point } from "../Point";
import { drawRoundRect } from "../tool";

export class Enemy {
    value = 0;
    size = 20;
    point: Point;
    game: Game;

    constructor(value: number, x: number, game: Game) {
        this.value = value;
        this.game = game;
        this.point = new Point(x, -this.size, game.coordinate);
    }

    go() {
        this.point.y += 0.5;
    }

    hited() {
        this.value--;

        if (this.value <= 0) {
            this.game.removeEnemy(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();
        drawRoundRect(x, y, this.size, this.size, 5, ctx);
        ctx.textAlign = 'center';
        ctx.fillText(`${this.value}`, x + this.size / 2, y + 13);
    }
}
