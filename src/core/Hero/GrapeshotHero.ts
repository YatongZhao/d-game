import { Bullet } from "../Bullet/Bullet";
import { Hero } from "./Hero";

export class GrapeshotHero extends Hero {
    type = 'grapeshot-hero';
    get cycle() {
        switch (this.level) {
            case 1:
                return 3;
            case 2:
                return 2;
            default:
            case 3:
                return 1;
        }
    }
    color = 'black';

    angle = 0;
    angleCycle = 40;

    go() {
        if (this.step % this.cycle === 0) {
            for (let i = 0; i < 5; i++) {
                this.game.bullets.push(
                    new Bullet(this.point.plus(this.size/2, 0), Math.PI*0.4*(Math.random() - 0.5), this.game)
                );
            }
        }
        this.step++;
    }
}

