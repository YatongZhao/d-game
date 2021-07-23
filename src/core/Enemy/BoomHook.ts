import { BoomBullet } from '../Bullet/BoomBullet';
import { Hero } from '../Hero/Hero';
import { Enemy, EnemyHook } from './Enemy';
import { BoomHero } from '../Hero/BoomHero';

export class BoomHook implements EnemyHook {
    ATK = 0;
    hero: BoomHero;

    constructor(ATK: number, hero: BoomHero) {
        this.ATK = ATK;
        this.hero = hero;
    }

    beforeDestory(enemy: Enemy, color?: [number, number, number]) {
        enemy.game.pushBullet(new BoomBullet(this.ATK, enemy, enemy.game, this.hero, {
            color
        }));
    }
    go() {

    }
    render(ctx: CanvasRenderingContext2D, enemy: Enemy) {
        let point = enemy.point.plus(enemy.size - 2, 2).toNumber();
        ctx.fillStyle = `rgb(${this.hero._color})`;
        ctx.strokeStyle = `rgb(${this.hero._color})`;
        ctx.beginPath();
        ctx.moveTo(...point);
        ctx.arc(...point, 4, 0, Math.PI*0.5);
        ctx.fill();
        ctx.moveTo(...point);
        ctx.arc(...point, 4, Math.PI*1, Math.PI*1.5);
        ctx.fill();
        ctx.moveTo(...point);
        ctx.arc(...point, 4, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
    }
}
