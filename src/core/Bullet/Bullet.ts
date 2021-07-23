import { Game } from "..";
import { Hero } from "../Hero/Hero";
import { Point } from "../Point";

export class Bullet {
    isDirty = false;

    go() {

    }

    render(ctx: CanvasRenderingContext2D) {

    }
}

export class DefaultBullet extends Bullet {
    point: Point;
    game: Game;
    size = 2;
    direction = 0;
    speed = 30;
    color = 'black';
    ATK = 1;

    isEnd = false;

    hero: Hero;

    constructor(point: Point, direction: number, game: Game, hero: Hero, {
        speed, color, ATK, size
    }: {
        speed?: number;
        color?: string;
        ATK?: number;
        size?: number;
    }) {
        super();
        this.point = point;
        this.direction = direction;
        this.game = game;
        this.hero = hero;
        speed && (this.speed = speed);
        color && (this.color = color);
        ATK && (this.ATK = ATK);
        size && (this.size = size);
    }

    go() {
        if (this.isDirty) return;

        for (let i = 0; i < this.speed * 5; i++) {
            this.point.y -= Math.cos(this.direction);
            this.point.x += Math.sin(this.direction);

            let enemy = this.game.enemySet.findEnemyByPoint(this.point);
            if (enemy) {
                let isKilled = enemy.hited(this.ATK);
                if (isKilled) {
                    this.hero.addKillNumber();
                }
                this.isDirty = true;
                this.isEnd = true;
                return;
            }
        }
        if (this.point.y < 0
            || this.point.y > this.game.height
            || this.point.x < 0
            || this.point.x > this.game.width) {
            // this.game.removeBullet(this);
            this.isDirty = true;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();

        ctx.beginPath();
        ctx.moveTo(x, y);
        const dx = Math.round(Math.sin(this.direction) * this.speed);
        const dy = Math.round(Math.cos(this.direction) * this.speed);
        ctx.lineTo(x - dx, y + dy);
        let gnt1 = ctx.createLinearGradient(x, y, x - dx, y + dy);
        gnt1.addColorStop(0,this.color);
        gnt1.addColorStop(1,'white');
        ctx.lineWidth = this.size;
        ctx.strokeStyle = gnt1;
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
    }
}
