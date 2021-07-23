import { Game } from "..";
import { Enemy } from "../Enemy/Enemy";
import { Hero } from "../Hero/Hero";
import { Point } from "../Point";
import { Bullet } from "./Bullet";

export class SniperBullet extends Bullet {
    point: Point;
    startPoint: Point;
    targetPoint: Point;
    game: Game;
    hero: Hero;
    damage = 0;
    harmdEnemy = new Set<Enemy>();

    sin = 0;
    cos = 0;

    speed = 30;
    color = 'black';
    size = 3;

    constructor(game: Game, hero: Hero, p1: Point, p2: Point, {
        speed, color, damage
    }: {
        speed?: number;
        color?: string;
        damage: number;
    }) {
        super();

        this.game = game;
        this.hero = hero;
        this.startPoint = p1;
        this.point = p1.plus(0, 0);
        this.targetPoint = p2;
        speed && (this.speed = speed);
        color && (this.color = color);
        this.damage = damage;
        let dy = this.targetPoint.y - this.startPoint.y;
        let dx = this.targetPoint.x - this.startPoint.x;
        let len = (dy**2 + dx**2)**0.5;
        this.sin = dx / len;
        this.cos = -dy / len;
    }

    go() {
        if (this.isDirty) return;
        for (let i = 0; i < this.speed * 5; i++) {
            this.point.y += -this.cos;
            this.point.x += this.sin;

            let enemy = this.game.enemySet.findEnemyByPoint(this.point);
            if (enemy && !this.harmdEnemy.has(enemy)) {
                this.harmdEnemy.add(enemy);
                let isKilled = enemy.hited(this.damage);
                if (isKilled) {
                    this.hero.addKillNumber();
                }
            }
        }
        if (this.point.y < 0
            || this.point.y > this.game.height
            || this.point.x < 0
            || this.point.x > this.game.width) {
            this.isDirty = true;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - this.sin * 150, y + this.cos * 150);
        let gnt1 = ctx.createLinearGradient(x, y, x - this.sin * 150, y + this.cos * 150);
        gnt1.addColorStop(0,this.color);
        gnt1.addColorStop(1,'white');
        ctx.strokeStyle = gnt1;
        ctx.lineWidth = this.size;
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
    }
}