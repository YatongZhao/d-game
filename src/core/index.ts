import { Bullet } from "./Bullet/Bullet";
import { Coordinate } from "./Coordinate";
import { Enemy } from "./Enemy/Enemy";
import { Hero } from "./Hero/Hero";
import { Point } from "./Point";
import { drawRoundRect } from "./tool";

export class Game {
    coordinate = new Coordinate(110, 0);

    enemys: Enemy[] = [];

    offStageHeros: [
        Hero|null, Hero|null, Hero|null,
        Hero|null, Hero|null, Hero|null,
        Hero|null, Hero|null, Hero|null
    ] = [null, null, null, null, null, null, null, null, null];
    onStageHeros: [
        Hero|null, Hero|null, Hero|null,
        Hero|null, Hero|null, Hero|null,
        Hero|null, Hero|null, Hero|null
    ] = [null, null, null, null, null, null, null, null, null];

    bullets: Bullet[] = [];

    // 数组顺序不要动
    heroPosList = [
        new Point(55, 860, this.coordinate),
        new Point(95, 860, this.coordinate),
        new Point(135, 860, this.coordinate),
        new Point(175, 860, this.coordinate),
        new Point(215, 860, this.coordinate),
        new Point(255, 860, this.coordinate),
        new Point(295, 860, this.coordinate),
        new Point(335, 860, this.coordinate),
        new Point(375, 860, this.coordinate),

        new Point(55, 810, this.coordinate),
        new Point(95, 810, this.coordinate),
        new Point(135, 810, this.coordinate),
        new Point(175, 810, this.coordinate),
        new Point(215, 810, this.coordinate),
        new Point(255, 810, this.coordinate),
        new Point(295, 810, this.coordinate),
        new Point(335, 810, this.coordinate),
        new Point(375, 810, this.coordinate)
    ];

    cycle = 60;
    step = 0;
    setEnd: React.Dispatch<React.SetStateAction<boolean>> | null = null;

    width = 460;
    height = 900;

    targetY = 800;
    targetLineLeft = this.coordinate.point(0, this.targetY);
    targetLineRight = this.coordinate.point(this.width, this.targetY);

    isMouseDown = false;
    mouseSelectItem: Hero | null = null;
    mouseSelectItemType: 'off' | 'on' = 'off';
    mouseSelectItemIndex: 0|1|2|3|4|5|6|7|8 = 0;
    mouseSelectItemPosition: [number, number] = [0, 0];
    mouseSelectItemOffset: [number, number] = [0, 0];

    constructor() {
        this.go();

        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    restart() {
        this.enemys = [];
        this.offStageHeros = [null, null, null, null, null, null, null, null, null];
        this.onStageHeros = [null, null, null, null, null, null, null, null, null];
        this.bullets = [];
        this.step = 0;
        this.go();
    }

    addEnemy() {
        for (let i = 0; i < 15; i++) {
            this.enemys.push(new Enemy(Math.ceil(this.step/300*Math.random() + 1), 30 * i + 10, this));
        }
    }

    removeBullet(bullet: Bullet) {
        this.bullets = this.bullets.filter(_bullet => {
            return _bullet !== bullet;
        });
    }

    removeEnemy(enemy: Enemy) {
        this.enemys = this.enemys.filter(_enemy => {
            return _enemy !== enemy;
        });
    }

    go() {
        if (this.step % this.cycle === 0) {
            this.addEnemy();
        }

        this.enemys.forEach(enemy => {
            enemy.go();
        });

        // console.log('game go', this.onStageHeros);
        this.onStageHeros.forEach(hero => {
            hero?.go();
        });

        // this.offStageHeros.forEach(hero => {
        //     hero?.go();
        // });

        this.bullets.forEach(bullet => {
            bullet.go();
        });

        this.step++;
    }

    render(canvas: HTMLCanvasElement | null) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;
        this.go();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(...this.coordinate.origin, this.width, this.height);

        this.offStageHeros.forEach(hero => {
            hero?.render(ctx);
        });

        this.onStageHeros.forEach(hero => {
            hero?.render(ctx);
        });

        let isEnd = false;
        this.enemys.forEach(enemy => {
            enemy.render(ctx);
            if (enemy.point.y >= this.targetY - enemy.size) {
                isEnd = true;
            }
        });

        ctx.moveTo(...this.targetLineLeft.toNumber());
        ctx.lineTo(...this.targetLineRight.toNumber());
        ctx.stroke();

        if (this.isMouseDown) {

            ctx.strokeStyle = 'red';
            this.heroPosList.forEach(pos => {
                drawRoundRect(...pos.plus(8, 8).toNumber(), 14, 14, 5, ctx);
            });
            ctx.strokeStyle = 'black';
        }

        this.bullets.forEach(bullet => {
            bullet.render(ctx);
        });

        if (this.mouseSelectItem) {
            this.mouseSelectItem.render(ctx, [
                this.mouseSelectItemPosition[0] + this.mouseSelectItemOffset[0],
                this.mouseSelectItemPosition[1] + this.mouseSelectItemOffset[1],
            ]);
        }

        if (isEnd) {
            this.setEnd && this.setEnd(true);
            return;
        }

        requestAnimationFrame(() => {
            this.render(canvas);
        });
    }

    addOffStageHero(hero: Hero | null, position?: 0|1|2|3|4|5|6|7|8) {
        if (position === undefined) {
            this.offStageHeros.some((hero, index) => {
                if (hero === null) {
                    position = index as 0|1|2|3|4|5|6|7|8;
                    return true;
                }
                return false;
            });
        }
        if (position === undefined) return;
        this.offStageHeros[position] = hero;
        if (hero) {
            hero.addToOffStage(position);

            let list: (0|1|2|3|4|5|6|7|8)[] = [];
            this.offStageHeros.forEach((_hero, i) => {
                if (_hero?.type === hero.type && hero.level === _hero.level) {
                    list.push(i as 0);
                }
            });

            if (list.length >= 3) {
                this.addOffStageHero(null, list[0]);
                this.addOffStageHero(null, list[1]);
                (this.offStageHeros[list[2]] as Hero).level += 1;
                this.addOffStageHero(this.offStageHeros[list[2]], list[2]);
            }
        }
    }

    addOnStageHero(hero: Hero | null, position?: 0|1|2|3|4|5|6|7|8) {
        if (position === undefined) {
            this.onStageHeros.some((hero, index) => {
                if (hero === null) {
                    position = index as 0|1|2|3|4|5|6|7|8;
                    return true;
                }
                return false;
            });
        }
        if (position === undefined) return;
        this.onStageHeros[position] = hero;
        if (hero) {
            hero.point.y = 810;
            hero.point.x = 55 + position * 40;

            let list: (0|1|2|3|4|5|6|7|8)[] = [];
            this.onStageHeros.forEach((_hero, i) => {
                if (_hero?.type === hero.type && hero.level === _hero.level) {
                    list.push(i as 0);
                }
            });

            if (list.length >= 3) {
                this.addOnStageHero(null, list[0]);
                this.addOnStageHero(null, list[1]);
                (this.onStageHeros[list[2]] as Hero).level += 1;
                this.addOnStageHero(this.onStageHeros[list[2]], list[2]);
            }
        }
    }

    handleCanvasMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        this.isMouseDown = true;

        this.findHero(this.offStageHeros, e, 'off');
        this.findHero(this.onStageHeros, e, 'on');
    }

    findHero(heros: (Hero|null)[], e: React.MouseEvent<HTMLCanvasElement>, type: 'off'|'on') {
        let heroIndex = heros.findIndex(hero => {
            if (!hero) return false;

            let isTrue = hero.isPointIn(e.clientX, e.clientY);
            if (isTrue) {
                let o = hero.point.toNumber();
                this.mouseSelectItemOffset = [
                    o[0] - e.clientX,
                    o[1] - e.clientY
                ];
            }
            return isTrue;
        });

        if (heroIndex !== -1) {
            this.mouseSelectItem = heros[heroIndex];
            this.mouseSelectItemType = type;
            this.mouseSelectItemIndex = heroIndex as 0;
            this.mouseSelectItemPosition = [e.clientX, e.clientY];
            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    handleMouseUp(e: MouseEvent) {
        window.removeEventListener('mousemove', this.handleMouseMove);

        let leftUp = [e.clientX + this.mouseSelectItemOffset[0], e.clientY + this.mouseSelectItemOffset[1]];
        let rightDown = [leftUp[0] + 30, leftUp[1] + 30];

        let pos = this.heroPosList.findIndex(pos => {
            let p = pos.toNumber();

            return leftUp[0] > p[0] - 8 && leftUp[1] > p[1] - 8
                && rightDown[0] < p[0] + 38 && rightDown[1] < p[1] + 38;
        });

        if (pos !== -1) {
            if (Math.floor(pos / 9) === 0) { // offStage
                let targetI = pos % 9;
                let temp = this.offStageHeros[targetI];
                this.offStageHeros[targetI] = null;
                if (this.mouseSelectItemType === 'on') {
                    this.onStageHeros[this.mouseSelectItemIndex] = null;
                } else {
                    this.offStageHeros[this.mouseSelectItemIndex] = null;
                }
                this.addOffStageHero(this.mouseSelectItem, targetI as 0);
                if (this.mouseSelectItemType === 'on') {
                    this.addOnStageHero(temp, this.mouseSelectItemIndex);
                } else {
                    this.addOffStageHero(temp, this.mouseSelectItemIndex);
                }
            } else { // onStage
                let targetI = pos % 9;
                let temp = this.onStageHeros[targetI];
                this.onStageHeros[targetI] = null;
                if (this.mouseSelectItemType === 'on') {
                    this.onStageHeros[this.mouseSelectItemIndex] = null;
                } else {
                    this.offStageHeros[this.mouseSelectItemIndex] = null;
                }
                this.addOnStageHero(this.mouseSelectItem, targetI as 0);
                if (this.mouseSelectItemType === 'on') {
                    this.addOnStageHero(temp, this.mouseSelectItemIndex);
                } else {
                    this.addOffStageHero(temp, this.mouseSelectItemIndex);
                }
            }
        }

        this.isMouseDown = false;
        this.mouseSelectItem = null;
    }

    handleMouseMove(e: MouseEvent) {
        this.mouseSelectItemPosition = [e.clientX, e.clientY];
    }
}
