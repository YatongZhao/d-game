import { Game } from "..";
import { Hero } from "../Hero/Hero";
import { Point } from "../Point";

export class Bullet {
    point: Point;
    game: Game;
    size = 2;
    direction = 0;
    speed = 30;

    hero: Hero;

    constructor(point: Point, direction: number, game: Game, hero: Hero, speed?: number) {
        this.point = point;
        this.direction = direction;
        this.game = game;
        this.hero = hero;
        speed && (this.speed = speed);
    }

    go() {
        for (let i = 0; i < this.speed * 5; i++) {
            this.point.y -= Math.cos(this.direction);
            this.point.x += Math.sin(this.direction);

            let isTrue = this.game.enemys.some(enemy => {
                if (this.point.x >= enemy.point.x - 2
                    && this.point.y >= enemy.point.y - 2
                    && this.point.x <= enemy.point.x + enemy.size + 2
                    && this.point.y <= enemy.point.y + enemy.size + 2) {
                        let isKilled = enemy.hited();
                        if (isKilled) {
                            this.hero.addKillNumber();
                        }
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
        ctx.moveTo(x, y);
        ctx.lineTo(x - Math.sin(this.direction) * this.speed, y + Math.cos(this.direction) * this.speed);
        var gnt1 = ctx.createLinearGradient(x, y, x - Math.sin(this.direction) * this.speed, y + Math.cos(this.direction) * this.speed);
        gnt1.addColorStop(0,'black');
        gnt1.addColorStop(1,'white');
        ctx.strokeStyle = gnt1;
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = 'black';
    }
}
