import { Game } from "..";
import { Point } from "../Point";
import { drawRoundRect } from "../tool";

export class Hero {
    point: Point;
    level: 1|2|3 = 1;
    get size() {
        switch (this.level) {
            case 1:
                return 30;
            case 2:
                return 30;
            default:
            case 3:
                return 30;
        }
    }
    color = 'blue';
    type = 'hero';

    step = 0;

    game: Game;

    constructor(game: Game) {
        this.game = game;
        this.point = new Point(0, 0, game.coordinate);
    }

    go() {
        this.step++;
    }

    render(ctx: CanvasRenderingContext2D, position?: [number, number]) {
        let [x, y] = position || this.point.toNumber();
        ctx.strokeStyle = this.color;
        drawRoundRect(x, y, this.size, this.size, 5, ctx);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.fillText(`${this.level}`, x + this.size / 2, y + 18);
        ctx.fillStyle = 'black';
    }

    isPointIn(x: number, y: number) {
        let [_x, _y] = this.point.toNumber();
        return x >= _x && x <= _x + this.size
            && y >= _y && y <= _y + this.size;
    }

    addToOffStage(position: 0|1|2|3|4|5|6|7|8) {
        this.point.y = 860;
        this.point.x = 55 + position * 40;
    }
}