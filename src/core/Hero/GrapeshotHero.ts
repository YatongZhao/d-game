import { DefaultBullet } from "../Bullet/Bullet";
import { Point } from "../Point";
import { Hero } from "./Hero";

export class GrapeshotHero extends Hero {
    type = 'grapeshot-hero';
    get cycle() {
        switch (this.level) {
            case 1:
                return 5;
            case 2:
                return 3;
            default:
            case 3:
                return 1;
        }
    }
    get bulletNumber() {
        switch (this.level) {
            case 1:
                return 5;
            case 2:
                return 6;
            default:
            case 3:
                return 7;
        }
    }
    get ATK() {
        switch (this.level) {
            case 1:
                return 1;
            case 2:
                return 2;
            default:
            case 3:
                return 3;
        }
    }
    get bulletSize() {
        switch (this.level) {
            case 1:
                return 1;
            case 2:
                return 2;
            default:
            case 3:
                return 3;
        }
    }
    get bulletColor() {
        switch (this.level) {
            case 1:
                return 'black';
            case 2:
                return 'blue';
            default:
            case 3:
                return 'red';
        }
    }
    color = 'black';
    specialLength = 0;

    nullHero = new Hero(this.game);

    go() {
        if (this.step % this.cycle === 0 && this.game.enemySet.length > 0) {
            for (let i = 0; i < this.bulletNumber; i++) {
                this.game.bullets.push(
                    new DefaultBullet(
                        this.point.plus(this.size/2, 0),
                        Math.PI*0.4*(Math.random() - 0.5),
                        this.game,
                        this,
                        {
                            speed: 30 + Math.floor(Math.random() * 30),
                            color: this.bulletColor,
                            ATK: this.ATK,
                            size: this.bulletSize,
                        }
                    )
                );
            }
        }
        if (this.specialLength !== 0) {
            if (this.specialLength % 3 === 0) {
                for (let i = 0; i < 15; i++) {
                    this.game.bullets.push(
                        new DefaultBullet(
                            new Point(30 * i + 10, this.game.targetY, this.game.coordinate),
                            0,
                            this.game,
                            this.nullHero,
                            {
                                speed: 30 + Math.floor(Math.random() * 30),
                                color: this.bulletColor,
                                ATK: this.ATK,
                                size: this.bulletSize,
                            }
                        )
                    );
                }
            }
            this.specialLength--;
        }
        this.step++;
    }

    startSpecialMove() {
        this.specialLength = 200;
    }
}

