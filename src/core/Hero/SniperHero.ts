import { SniperBullet } from "../Bullet/SniperBullet";
import { Enemy } from "../Enemy/Enemy";
import { Hero } from "./Hero";

export class SniperHero extends Hero {
    type = 'sniper-hero';
    target: Enemy|null = null;
    damage = 0;
    color = 'green';
    nullHero = new Hero(this.game);

    specialTargets: Enemy[] = [];
    specialDamage = -1;
    specialDamageMax = 30;

    get cycle() {
        switch (this.level) {
            case 1:
                return 5;
            case 2:
                return 3;
            default:
            case 3:
                return 2;
        }
    }

    go() {
        if (!this.target) {
            let maxEnemy: Enemy | null = this.game.enemySet.get(0);
            this.game.enemySet.forEach(enemy => {
                if (!maxEnemy || (!enemy.isPicked && enemy.value > maxEnemy.value)) {
                    maxEnemy = enemy;
                }
            });

            if (!maxEnemy) {
                return super.go();
            }

            this.target = maxEnemy;
            this.target.isPicked = true;
        }
        if (this.step % this.cycle !== 0) return super.go();

        if (this.damage < this.target.value) {
            this.damage += 1;
        } else {
            this.game.bullets.push(new SniperBullet(
                this.game,
                this,
                this.point.plus(this.size / 2, 0),
                this.target.point.plus(this.target.size / 2, this.target.size / 2),
                {
                    damage: this.damage,
                }
            ));
            this.damage = 0;
            this.target.isPicked = false;
            this.target = null;
        }

        if (this.specialDamage > 0) {
            this.specialDamage++;
            this.specialTargets = this.specialTargets.filter(target => {
                return target.value > 0;
            });

            if (this.specialDamage >= this.specialDamageMax) {
                this.specialTargets.forEach(target => {
                    this.game.bullets.push(new SniperBullet(
                        this.game,
                        this.nullHero,
                        this.point.plus(this.size / 2, 0),
                        target.point.plus(target.size / 2, target.size / 2),
                        {
                            damage: this.specialDamage,
                        }
                    ));
                });
                this.specialDamage = -1;
                this.specialTargets = [];
            }
        }

        super.go();
    }

    startSpecialMove() {
        let set = new Set<Enemy>();
        let length = this.game.enemySet.length;
        while (set.size < (length < 12 ? length : 12)) {
            set.add(this.game.enemySet.getRandomEnemy());
        }

        set.forEach(enemy => {
            this.specialTargets.push(enemy);
        });

        this.specialDamage = 1;
    }

    render(ctx: CanvasRenderingContext2D, position?: [number, number]) {
        super.render(ctx, position);
        if (this.target) {
            this.renderTarget(ctx, this.target, 5 + (this.target.value - this.damage > 0 ? this.target.value - this.damage : 0));
        }
        this.specialTargets.forEach(target => {
            this.renderTarget(ctx, target, 5 + this.specialDamageMax - this.specialDamage);
        });
    }

    renderTarget(ctx: CanvasRenderingContext2D, target: Enemy, radius: number) {
        if (target.value <= 0) return;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(
            ...target.point.plus(target.size / 2, target.size / 2).toNumber(),
            radius, 0, 2*Math.PI);
        ctx.moveTo(...target.point.plus(target.size / 2, target.size / 2 + radius + 5).toNumber());
        ctx.lineTo(...target.point.plus(target.size / 2, target.size / 2 + radius - 5).toNumber());
        ctx.moveTo(...target.point.plus(target.size / 2, target.size / 2 - radius + 5).toNumber());
        ctx.lineTo(...target.point.plus(target.size / 2, target.size / 2 - radius - 5).toNumber());
        ctx.moveTo(...target.point.plus(target.size / 2 + radius + 5, target.size / 2).toNumber());
        ctx.lineTo(...target.point.plus(target.size / 2 + radius - 5, target.size / 2).toNumber());
        ctx.moveTo(...target.point.plus(target.size / 2 - radius + 5, target.size / 2).toNumber());
        ctx.lineTo(...target.point.plus(target.size / 2 - radius - 5, target.size / 2).toNumber());
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
    }
}