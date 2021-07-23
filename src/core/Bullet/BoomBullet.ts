import { Game } from "..";
import { Enemy } from "../Enemy/Enemy";
import { BoomHero } from "../Hero/BoomHero";
import { Hero } from "../Hero/Hero";
import { Bullet } from "./Bullet";

export class BoomBullet extends Bullet {
    enemy: Enemy;
    game: Game;
    hero: BoomHero;
    life = 20;
    isBoomed = false;
    ATK = 0;
    color: [number, number, number] | null = null;

    get boundary() {
        switch (this.hero.level) {
            case 1:
                return 28;
            case 2:
                return 38;
            case 3:
            default:
                return 38;
        }
    }

    constructor(ATK: number, enemy: Enemy, game: Game, hero: BoomHero, { color }: {
        color?: [number, number, number];
    }) {
        super();
        this.ATK = ATK;
        this.enemy = enemy;
        this.game = game;
        this.hero = hero;
        color && (this.color = color);
    }

    go() {
        if (this.isDirty) return;
        if (this.life <= 0) {
            this.isDirty = true;
        }
        if (!this.isBoomed) {
            let target = this.game.enemySet.findEnemysAroundEnemy(this.enemy, this.hero.level);
            target.forEach(enemy => {
                let isKilled = enemy.hited(this.ATK);
                if (isKilled) {
                    this.hero.addKillNumber();
                }
            });
            this.isBoomed = true;
        }
        this.life--;
    }

    render(ctx: CanvasRenderingContext2D) {
        let r = this.life**3 / 1600;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.color || this.hero._color}, ${r/20})`;
        ctx.arc(
            ...this.enemy.point.toNumber(),
            this.boundary - r, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'white';
    }
}