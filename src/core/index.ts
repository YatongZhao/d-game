import { Bullet } from "./Bullet/Bullet";
import { Coordinate } from "./Coordinate";
import { Enemy } from "./Enemy/Enemy";
import { GrapeshotHero } from "./Hero/GrapeshotHero";
import { Hero } from "./Hero/Hero";
import { LightningHero } from "./Hero/LightningHero";
import { Point } from "./Point";
import { drawRoundRect } from "./tool";

const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);

export class Game {
    coordinate = new Coordinate(0, 0);

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

    width = 460;
    height = window.innerHeight * 460 / window.innerWidth;
    sizeRate = 460 / window.innerWidth;

    targetY = this.height - 150;
    targetLineLeft = this.coordinate.point(0, this.targetY);
    targetLineRight = this.coordinate.point(this.width, this.targetY);

    offStageHeroY = this.height - 70;
    onStageHeroY = this.height - 120;
    // 数组顺序不要动
    heroPosList = [
        new Point(55, this.offStageHeroY, this.coordinate),
        new Point(95, this.offStageHeroY, this.coordinate),
        new Point(135, this.offStageHeroY, this.coordinate),
        new Point(175, this.offStageHeroY, this.coordinate),
        new Point(215, this.offStageHeroY, this.coordinate),
        new Point(255, this.offStageHeroY, this.coordinate),
        new Point(295, this.offStageHeroY, this.coordinate),
        new Point(335, this.offStageHeroY, this.coordinate),
        new Point(375, this.offStageHeroY, this.coordinate),

        new Point(55, this.onStageHeroY, this.coordinate),
        new Point(95, this.onStageHeroY, this.coordinate),
        new Point(135, this.onStageHeroY, this.coordinate),
        new Point(175, this.onStageHeroY, this.coordinate),
        new Point(215, this.onStageHeroY, this.coordinate),
        new Point(255, this.onStageHeroY, this.coordinate),
        new Point(295, this.onStageHeroY, this.coordinate),
        new Point(335, this.onStageHeroY, this.coordinate),
        new Point(375, this.onStageHeroY, this.coordinate)
    ];

    cycle = 60;
    step = 0;
    setEnd: React.Dispatch<React.SetStateAction<boolean>> | null = null;

    $ = 300;
    score = 0;


    isMouseDown = false;
    mouseSelectItem: Hero | null = null;
    mouseSelectItemType: 'off' | 'on' = 'off';
    mouseSelectItemIndex: 0|1|2|3|4|5|6|7|8 = 0;
    mouseSelectItemPosition: [number, number] = [0, 0];
    mouseSelectItemOffset: [number, number] = [0, 0];

    constructor() {
        this.go();

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
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
        this.$++;
    }

    buyHero(type: 'lightning' | 'grapeshot'): boolean {
        switch (type) {
            case 'lightning':
                if (this.$ < 300) return false;
                this.$ -= 300;
                this.addOffStageHero(new LightningHero(this));
                break;
            case 'grapeshot':
            default:
                if (this.$ < 300) return false;
                this.$ -= 300;
                this.addOffStageHero(new GrapeshotHero(this));
                break;
        }
        return true;
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

        if (this.isMouseDown) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            this.heroPosList.forEach(pos => {
                drawRoundRect(...pos.plus(8, 8).toNumber(), 14, 14, 5, ctx);
            });
            ctx.strokeStyle = 'black';
            ctx.closePath();
        }

        ctx.beginPath();
        this.offStageHeros.forEach(hero => {
            hero?.render(ctx);
        });

        this.onStageHeros.forEach(hero => {
            hero?.render(ctx);
        });
        ctx.closePath();

        let isEnd = false;
        this.enemys.forEach(enemy => {
            enemy.render(ctx);
            if (enemy.point.y >= this.targetY - enemy.size) {
                isEnd = true;
            }
        });

        ctx.beginPath();
        ctx.moveTo(...this.targetLineLeft.toNumber());
        ctx.lineTo(...this.targetLineRight.toNumber());
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        this.bullets.forEach(bullet => {
            bullet.render(ctx);
        });
        ctx.closePath();

        if (this.mouseSelectItem) {
            this.mouseSelectItem.render(ctx, [
                this.mouseSelectItemPosition[0] + this.mouseSelectItemOffset[0],
                this.mouseSelectItemPosition[1] + this.mouseSelectItemOffset[1],
            ]);
            if (isMobile) {
                ctx.putImageData(ctx.getImageData(
                    0, this.targetY, this.width, 150
                ), 0, this.targetY - 150);

                ctx.rect(0, this.targetY - 150, this.width, 150);
                ctx.stroke();
            }
        }

        ctx.beginPath();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'right';
        ctx.fillText(`$:${this.$}`, 440, 30);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.closePath();

        ctx.beginPath();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.fillText(`score:${this.score}`, 20, 30);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.closePath();

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
            hero.point.y = this.offStageHeroY;
            hero.point.x = 55 + position * 40;
            hero.addToOffStage(position);

            if (hero.level >= 3) return;

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
            hero.point.y = this.onStageHeroY;
            hero.point.x = 55 + position * 40;

            if (hero.level >= 3) return;

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

        let isFindOffStage = this.findHero(this.offStageHeros, e.clientX, e.clientY, 'off');
        let isFindOnStage = this.findHero(this.onStageHeros, e.clientX, e.clientY, 'on');

        if (isFindOffStage || isFindOnStage) {
            window.addEventListener('mousemove', this.handleMouseMove);
        };
    }

    handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
        e.stopPropagation();
        e.preventDefault();
        this.isMouseDown = true;

        let isFindOffStage = this.findHero(this.offStageHeros, e.touches[0].clientX, e.touches[0].clientY, 'off');
        if (isFindOffStage) {
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            return;
        }
        let isFindOnStage = this.findHero(this.onStageHeros, e.touches[0].clientX, e.touches[0].clientY, 'on');
        if (isFindOnStage) {
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            return;
        }
    }

    findHero(heros: (Hero|null)[], clientX: number, clientY: number, type: 'off'|'on'): boolean {
        let heroIndex = heros.findIndex(hero => {
            if (!hero) return false;

            let isTrue = hero.isPointIn(clientX * this.sizeRate, clientY * this.sizeRate);
            if (isTrue) {
                let o = hero.point.toNumber();
                this.mouseSelectItemOffset = [
                    o[0] - clientX * this.sizeRate,
                    o[1] - clientY * this.sizeRate
                ];
            }
            return isTrue;
        });

        if (heroIndex !== -1) {
            this.mouseSelectItem = heros[heroIndex];
            this.mouseSelectItemType = type;
            this.mouseSelectItemIndex = heroIndex as 0;
            this.mouseSelectItemPosition = [clientX * this.sizeRate, clientY * this.sizeRate];
            return true;
        }
        return false;
    }

    handleMouseUp(e: MouseEvent) {
        window.removeEventListener('mousemove', this.handleMouseMove);
        this.handleEventEnd(e.clientX, e.clientY);
    }

    handleTouchEnd(e: TouchEvent) {
        window.removeEventListener('touchmove', this.handleTouchMove);
        this.handleEventEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    handleEventEnd(clientX: number, clientY: number) {
        let leftUp = [clientX * this.sizeRate + this.mouseSelectItemOffset[0], clientY * this.sizeRate + this.mouseSelectItemOffset[1]];
        let rightDown = [leftUp[0] + 30, leftUp[1] + 30];

        let pos = this.heroPosList.findIndex(pos => {
            let p = pos.toNumber();

            return leftUp[0] > p[0] - 18 && leftUp[1] > p[1] - 18
                && rightDown[0] < p[0] + 48 && rightDown[1] < p[1] + 48;
        });

        if (pos !== -1 && this.mouseSelectItem) {
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
        this.handleMove(e.clientX, e.clientY);
    }

    handleTouchMove(e: TouchEvent) {
        e.preventDefault();
        e.stopPropagation();
        this.handleMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }

    handleMove(clientX: number, clientY: number) {
        this.mouseSelectItemPosition = [clientX * this.sizeRate, clientY * this.sizeRate];
    }
}
