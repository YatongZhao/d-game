import { Game } from "..";
import { LightningHero } from "../Hero/LightningHero";
import { Point } from "../Point";
import { drawLightning } from "../tool";
import { Bullet } from "./Bullet";

export class SpecialLightningBullet extends Bullet {
    game: Game;
    hero: LightningHero;
    y = 0;
    get speed() {
        switch (this.hero.level) {
            case 1:
                return 5;
            case 2:
                return 3;
            case 3:
            default:
                return 1;
        }
    }
    get ATK() {
        switch (this.hero.level) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
            default:
                return 3;
        }
    }

    constructor(game: Game, hero: LightningHero) {
        super();
        this.game = game;
        this.hero = hero;
        this.y = this.game.targetY;
    }
    go() {
        this.y -= this.speed;
        this.game.enemySet.findEnemyByY(this.y).forEach(enemy => {
            enemy.hited(this.ATK);
        });

        if (this.y <= 0 || (this.game.stage[this.game.stageNumber].isEnd
            && this.game.enemySet.length === 0)) {
            this.game.removeBullet(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        drawLightning(
            new Point(0, this.y, this.game.coordinate),
            new Point(this.game.width, this.y, this.game.coordinate),
            ctx,
            this.hero._color,
            this.hero._lightColor);
    }
}