import { Enemy } from "../Enemy/Enemy";
import { drawRoundRect } from "../tool";
import { Hero } from "./Hero";
import { BoomHook } from '../Enemy/BoomHook';

export class BoomHero extends Hero {
    type = 'boom-hero';
    target: Enemy|null = null;
    damage = 0;
    color = 'red';
    nullHero = new Hero(this.game);
    speed = 1;
    intervalCount = 1;
    get interval() {
        switch (this.level) {
            case 1:
                return 30;
            case 2:
                return 20;
            default:
            case 3:
                return 15;
        }
    }

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

    get percent() {
        switch (this.level) {
            case 1:
                return 30;
            case 2:
                return 50;
            default:
            case 3:
                return 70;
        }
    }

    get _color() {
        switch (this.level) {
            case 1:
                return [153, 0, 0];
            case 2:
                return [0, 0, 153];
            case 3:
            default:
                return [0, 0, 0];
        }
    }

    go() {
        if (!this.target) {
            let enemys = this.game.enemySet.filter(enemy => !!(enemy && !enemy.isPickedByBoom));
            if (enemys.length === 0) {
                return super.go();
            }
            let randomK = Math.floor(Math.random() * enemys.length);
            let enemy: Enemy = enemys[randomK] as Enemy;

            this.target = enemy;
            this.target.isPickedByBoom = true;
        }
        this.intervalCount++;
        if (this.step % this.cycle !== 0 || this.intervalCount < this.interval) return super.go();

        if (this.damage < this.target.value) {
            this.damage += this.speed++;
        } else {
            this.target.addHook(new BoomHook(Math.ceil(this.damage * this.percent / 100), this));
            this.damage = 0;
            this.target.isPicked = false;
            this.target = null;
            this.speed = 1;
            this.intervalCount = 1;
        }

        super.go();
    }

    startSpecialMove() {
        this.game.enemySet.filter(enemy => {
            return !!(enemy && enemy.isPickedByBoom);
        }).forEach(enemy => {
            enemy?.hooks.forEach(hook => {
                if (hook instanceof BoomHook) {
                    hook.beforeDestory(enemy, [0, 153, 153]);
                }
            });
        });
    }

    render(ctx: CanvasRenderingContext2D, position?: [number, number]) {
        super.render(ctx, position);
        if (this.target) {
            this.renderTarget(ctx, this.target, this.target.value - this.damage > 0 ? (this.target.value - this.damage) / this.target.value : 1);
        }
    }

    renderTarget(ctx: CanvasRenderingContext2D, target: Enemy, ratio: number) {
        if (target.value <= 0) return;
        let targetC = target.point.plus(target.size / 2, target.size / 2).toNumber();
        let startC = this.point.plus(this.size / 2, 0).toNumber();
        let tan = (targetC[0] - startC[0]) / (targetC[1] - startC[1]);
        let endC: [number, number] = [0, 0];
        if (Math.abs(tan) > 1) {
            endC = target.point.plus(target.size / 2, target.size / 2).plus(
                targetC[0] > startC[0] ? -target.size / 2 : target.size / 2,
                target.size / 2 / tan
            ).toNumber();
        } else {
            endC = target.point.plus(target.size / 2, target.size / 2).plus(
                target.size / 2 * tan,
                targetC[1] > startC[1] ? -target.size / 2 : target.size / 2
            ).toNumber();
        }
        let middleC: [number, number] = [
            endC[0] + (startC[0] - endC[0]) * ratio,
            endC[1] + (startC[1] - endC[1]) * ratio,
        ];
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        drawRoundRect(...target.point.plus(-2, -2).toNumber(), target.size + 4, target.size + 4, 6, ctx);
        ctx.moveTo(...endC);
        ctx.lineTo(...middleC);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(...middleC);
        ctx.lineTo(...startC);
        ctx.stroke();

        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
    }
}