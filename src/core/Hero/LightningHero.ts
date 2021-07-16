import { SpecialLightningBullet } from '../Bullet/SpecialLightningBullet';
import { Enemy } from '../Enemy/Enemy';
import { drawLightning } from '../tool';
import { Hero } from './Hero';

interface Chain<T> {
    value: T;
    next: Chain<T> | null;
}

export class LightningHero extends Hero {
    type = 'lightning-hero';

    targets: {
        length: number;
        chain: Chain<Enemy> | null;
        end: Chain<Enemy> | null;
    } = {
        length: 0,
        chain: null,
        end: null
    };
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
    get _color() {
        switch (this.level) {
            case 1:
                return 'white';
            case 2:
                return 'white';
            default:
            case 3:
                return 'black';
        }
    }
    get _lightColor() {
        switch (this.level) {
            case 1:
                return 'blue';
            case 2:
                return 'red';
            default:
            case 3:
                return 'red';
        }
    }
    get targetMaxLength() {
        switch (this.level) {
            case 1:
                return 2;
            case 2:
                return 3;
            default:
            case 3:
                return 5;
        }
    }

    go() {
        if (this.targets.length < this.targetMaxLength && this.game.enemySet.length > 0) {
            let smallNum = this.game.enemySet.length >= this.targetMaxLength ? this.targetMaxLength : this.game.enemySet.length;
            let i = smallNum - this.targets.length;
            while (i > 0) {
                let chain = this.targets.chain;

                if (!chain) {
                    this.addTarget({
                        value: this.game.enemySet.getRandomEnemy(),
                        next: null
                    });
                    i--;
                    continue;
                }

                const isTrue = this.addTarget({
                    value: this.game.enemySet.getRandomEnemy(),
                    next: null
                });
                if (isTrue) {
                    i--;
                }
            }
            this.targets.length = smallNum;
        }

        if (this.step % this.cycle === 0) {
            let chain = this.targets.chain;
            while (chain) {
                if (chain.value.value > 0) {
                    let isKilled = chain.value.hited();
                    if (isKilled) {
                        this.addKillNumber();
                    }
                }
                chain = chain.next;
            }
            chain = this.targets.chain;
            if (!chain) return;
            if (chain.value.value <= 0) {
                this.targets.length = 0;
                this.targets.chain = null;
                this.targets.end = null;
            } else {
                let parent = chain;
                chain = chain.next;
                let length = 1;

                while (chain) {
                    if (chain.value.value <= 0) {
                        parent.next = null;
                        this.targets.length = length;
                        this.targets.end = parent;
                        break;
                    } else {
                        parent = chain;
                        chain = chain.next;
                        length++;
                    }
                }
            }
        }

        this.step++;
    }

    render(ctx: CanvasRenderingContext2D, position?: [number, number]) {
        super.render(ctx, position);

        if (!this.targets.chain) return;
        let chain: Chain<Enemy> | null = this.targets.chain;
        let p1 = this.point.plus(this.size / 2, 0);

        while (chain) {
            let p2 = chain.value.point.plus(chain.value.size / 2, chain.value.size / 2);
            drawLightning(p1, p2, ctx, this._color, this._lightColor);

            p1 = chain.value.point.plus(chain.value.size / 2, chain.value.size / 2);
            chain = chain.next;
        }
    }

    startSpecialMove() {
        this.game.bullets.push(new SpecialLightningBullet(this.game, this));
    }

    addTarget(chain: Chain<Enemy>): boolean {
        if (this.targets.end === null) {
            this.targets.chain = chain;
            this.targets.end = chain;
            this.targets.length++;
        } else {
            let _chain = this.targets.chain;

            while (_chain) {

                if (chain.value === _chain.value) {
                    return false;
                }
                _chain = _chain.next;
            }
            this.targets.end.next = chain;
            this.targets.end = this.targets.end.next;
            this.targets.length++;
        }

        return true;
    }

    addToOffStage(position: 0|1|2|3|4|5|6|7|8) {
        super.addToOffStage(position);
        this.targets = {
            length: 0,
            chain: null,
            end: null
        }
    }
}