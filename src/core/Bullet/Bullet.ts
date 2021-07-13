import { Game } from "..";
import { Point } from "../Point";

export class Bullet {
    point: Point;
    game: Game;
    size = 2;
    direction = 0;

    constructor(point: Point, direction: number, game: Game) {
        this.point = point;
        this.direction = direction;
        this.game = game;
    }

    go() {
        for (let i = 0; i <30; i++) {
            this.point.y -= Math.cos(this.direction);
            this.point.x += Math.sin(this.direction);

            let isTrue = this.game.enemys.some(enemy => {
                if (this.point.x >= enemy.point.x - 2
                    && this.point.y >= enemy.point.y - 2
                    && this.point.x <= enemy.point.x + enemy.size + 2
                    && this.point.y <= enemy.point.y + enemy.size + 2) {
                        enemy.hited();
                        this.game.removeBullet(this);
                        return true;
                }
                return false;
            });

            if (isTrue) {
                return;
            }
        }
        if (this.point.y < 0
            || this.point.y > this.game.height
            || this.point.x < 0
            || this.point.x > this.game.width) {
            this.game.removeBullet(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}
