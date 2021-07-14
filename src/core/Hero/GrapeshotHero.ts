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
    color = 'black';
    specialLength = 0;

    nullHero = new Hero(this.game);

    go() {
        if (this.step % this.cycle === 0) {
            for (let i = 0; i < 5; i++) {
                this.game.bullets.push(
                    new DefaultBullet(
                        this.point.plus(this.size/2, 0),
                        Math.PI*0.4*(Math.random() - 0.5),
                        this.game,
                        this,
                        {
                            speed: 30 + Math.floor(Math.random() * 30),
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
                                color: 'red',
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

