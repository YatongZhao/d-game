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

    killNumber = 0;

    game: Game;

    constructor(game: Game) {
        this.game = game;
        this.point = new Point(0, 0, game.coordinate);
    }

    addKillNumber() {
        this.killNumber++;
        if (this.killNumber === 100) {
            this.killNumber = 0;
        }
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
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'green';
        drawRoundRect(x + 1, y + this.size + 3, this.killNumber / 100 * (this.size - 2), 2, 1, ctx);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.fillStyle = 'black';
    }

    isPointIn(x: number, y: number) {
        let [_x, _y] = this.point.toNumber();
        return x >= _x - 10 && x <= _x + this.size + 10
            && y >= _y - 10 && y <= _y + this.size + 10;
    }

    addToOffStage(position: 0|1|2|3|4|5|6|7|8) {
    }
}