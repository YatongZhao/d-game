import { Bullet } from "../Bullet/Bullet";
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

    go() {
        if (this.step % this.cycle === 0) {
            for (let i = 0; i < 5; i++) {
                this.game.bullets.push(
                    new Bullet(
                        this.point.plus(this.size/2, 0),
                        Math.PI*0.4*(Math.random() - 0.5),
                        this.game,
                        this,
                        30 + Math.floor(Math.random() * 30)
                    )
                );
            }
        }
        this.step++;
    }
}

