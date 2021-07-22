import { Bullet } from "./Bullet/Bullet";
import { Coordinate } from "./Coordinate";
import { Enemy } from "./Enemy/Enemy";
import { EnemySet } from "./Enemy/EnemySet";
import { BoomHero } from "./Hero/BoomHero";
import { GrapeshotHero } from "./Hero/GrapeshotHero";
import { Hero } from "./Hero/Hero";
import { LightningHero } from "./Hero/LightningHero";
import { SniperHero } from "./Hero/SniperHero";
import { Point } from "./Point";
import { Round1 } from "./Round/Round1";
import { drawRoundRect } from "./tool";
import { DoubleBuffer } from "./tool/doubleBuffer";

const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
const createStages = (game: Game) => {
    return [
        // 1
        new Round1(game, 1),
        new Round1(game, 1),
        new Round1(game, 1),
        new Round1(game, 1),
        // 5
        new Round1(game, 1),
        new Round1(game, 1),
        new Round1(game, 1),
        new Round1(game, 1.5),
        new Round1(game, 1.5),
        // 10
        new Round1(game, 1.5),
        new Round1(game, 1.5),
        new Round1(game, 1.5),
        new Round1(game, 1.5),
        new Round1(game, 2),
        // // 15
        new Round1(game, 2),
        new Round1(game, 2),
        new Round1(game, 2),
        // new Round1(game),
        // new Round1(game),
        // // 20
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 25
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 30
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 35
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 40
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 45
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // new Round1(game),
        // // 50
        // new Round1(game)
    ];
}

export class Game {
    coordinate = new Coordinate(0, 0);

    // enemys: Enemy[] = [];
    enemySet = new EnemySet();

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

    step = 0;
    setEnd: React.Dispatch<React.SetStateAction<boolean>> | null = null;
    setRound: React.Dispatch<React.SetStateAction<'strategy' | 'fighting'>> | null = null;

    $ = 400;
    score = 0;

    HP = 1000;
    renderHP = 1000;
    result: 'win' | 'loose' = 'win';
    private _round: 'strategy' | 'fighting' = 'strategy';
    get round() {
        return this._round;
    }
    set round(newRound: 'strategy' | 'fighting') {
        this._round = newRound;
        if (this.setRound) this.setRound(newRound);
        if (newRound === 'fighting') {
            // this.goFighting();
            this.db.startLoop();
        }
    }
    stageNumber = 0;
    stage = createStages(this);

    isRenderStrategy = false;

    isMouseDown = false;
    mouseSelectItem: Hero | null = null;
    mouseSelectItemType: 'off' | 'on' = 'off';
    mouseSelectItemIndex: 0|1|2|3|4|5|6|7|8 = 0;
    mouseSelectItemPosition: [number, number] = [0, 0];
    mouseSelectItemOffset: [number, number] = [0, 0];

    canvas: HTMLCanvasElement | null = null;

    heroPosCanvas: HTMLCanvasElement;
    db: DoubleBuffer;

    constructor() {
        this.heroPosCanvas = document.createElement('canvas');
        this.initHeroPosCanvas();

        this.db = new DoubleBuffer({
            width: this.width, height: this.height
        }, db => {
            if (!this.canvas) return;
            const ctx = this.canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, this.width, this.height);
                ctx.drawImage(db.renderFrame.value, 0, 0);
            }
        }, db => {
            return this.calcLogic(db);
        });

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }

    private initHeroPosCanvas() {
        this.heroPosCanvas.width = this.width;
        this.heroPosCanvas.height = 120;
        const ctx = this.heroPosCanvas.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = 'grey';
            this.heroPosList.forEach(pos => {
                drawRoundRect(...pos.plus(8, 128 - this.height).toNumber(), 14, 14, 5, ctx);
            });
            ctx.strokeStyle = 'black';
            ctx.closePath();
        }
    }

    restart() {
        this.enemySet.reset();
        this.offStageHeros = [null, null, null, null, null, null, null, null, null];
        this.onStageHeros = [null, null, null, null, null, null, null, null, null];
        this.bullets = [];
        this.step = 0;
        this.$ = 400;
        this.score = 0;
        this.HP = 1000;

        this.stageNumber = 0;
        this.round = 'strategy';
        this.stage = createStages(this);
        this.render();
    }

    removeBullet(bullet: Bullet) {
        this.bullets = this.bullets.filter(_bullet => {
            return _bullet !== bullet;
        });
    }

    removeEnemy(enemy: Enemy) {
        this.enemySet.removeEnemy(enemy);
        this.$++;
    }

    refreshHeroList(): boolean {
        if (this.$ < 10) return false;
        this.$ -= 10;
        this.render();
        return true;
    }

    buyHero(type: 'lightning' | 'grapeshot' | 'sniper' | 'boom'): boolean {
        switch (type) {
            case 'lightning':
                if (this.$ < 200) return false;
                this.$ -= 200;
                this.addOffStageHero(new LightningHero(this));
                break;
            case 'sniper':
                if (this.$ < 150) return false;
                this.$ -= 150;
                this.addOffStageHero(new SniperHero(this));
                break;
            case 'boom':
                if (this.$ < 120) return false;
                this.$ -= 120;
                this.addOffStageHero(new BoomHero(this));
                break;
            case 'grapeshot':
            default:
                if (this.$ < 220) return false;
                this.$ -= 220;
                this.addOffStageHero(new GrapeshotHero(this));
                break;
        }
        this.render();
        return true;
    }

    go(): boolean {
        this.stage[this.stageNumber].go();

        this.enemySet.forEach(enemy => {
            enemy.go();
            if (enemy.point.y >= this.targetY - enemy.size) {
                this.removeEnemy(enemy);
                this.HP -= enemy.value > this.HP ? this.HP : enemy.value;
            }
        });

        this.onStageHeros.forEach(hero => {
            hero?.go();
        });

        this.bullets.forEach(bullet => {
            bullet.go();
        });

        if (this.renderHP > this.HP) {
            this.renderHP--;
        } else if (this.renderHP < this.HP) {
            this.renderHP++
        }

        this.step++;
        return this.HP <= 0;
    }

    calcLogic(db: DoubleBuffer): boolean {
        let isEnd = this.go();

        this.coreRender(db.headFrame.value);
        if (isEnd) {
            this.setResult('loose');
            this.coreRender(db.headFrame.value);
            return true;
        }

        if (this.stage[this.stageNumber].isEnd
            && this.bullets.length === 0
            && this.enemySet.length === 0
            && this.renderHP === this.HP) {
            this.round = 'strategy';
            this.stageNumber++;

            if (this.stageNumber === this.stage.length) {
                this.setResult('win');
                this.coreRender(db.headFrame.value);
                return true;
            }

            this.stage[this.stageNumber].award();
            this.coreRender(db.headFrame.value);
            return true;
        }

        return false;
    }

    goFighting() {
        let isEnd = this.go();

        this.render();
        if (isEnd) {
            this.setResult('loose');
            this.render();
            return;
        }

        if (this.stage[this.stageNumber].isEnd
            && this.bullets.length === 0
            && this.enemySet.length === 0
            && this.renderHP === this.HP) {
            this.round = 'strategy';
            this.stageNumber++;

            if (this.stageNumber === this.stage.length) {
                this.setResult('win');
                this.render();
                return;
            }

            this.stage[this.stageNumber].award();
            this.render();
            return;
        }
        requestAnimationFrame(() => {
            this.goFighting();
        });
    }

    goStrategy() {
        if (this.isRenderStrategy) return;
        this.loopRender();
    }

    loopRender() {
        this.render();

        if (!this.isRenderStrategy) {
            return;
        }
        requestAnimationFrame(() => {
            this.loopRender();
        });
    }

    coreRender(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.stage[this.stageNumber]?.renderSymbol(ctx);

        ctx.drawImage(this.heroPosCanvas, 0, this.height - 120);

        this.enemySet.forEach(enemy => {
            enemy.render(ctx);
        });

        // HP条
        ctx.beginPath();
        ctx.fillStyle = 'white';        
        ctx.fillRect(1, this.targetY - 30, this.width - 2, 32);
        ctx.fillStyle = 'grey';
        ctx.fillRect(1, this.targetY - 25, this.width - 2, 11);
        ctx.fillStyle = 'lightgreen';
        ctx.strokeStyle = 'green';
        const renderHpWidth = this.renderHP / 1000 * (this.width - 2);
        ctx.fillRect(this.width - renderHpWidth - 1, this.targetY - 25, renderHpWidth, 11);
        ctx.fillStyle = '#00CC33';
        const hpWidth = this.HP / 1000 * (this.width - 2);
        ctx.fillRect(this.width - hpWidth - 1, this.targetY - 25, hpWidth, 11);
        ctx.fillStyle = 'white';
        ctx.fillText(`${this.HP}/1000`, this.width /2, this.targetY - 15);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';

        ctx.beginPath();
        this.offStageHeros.forEach(hero => {
            hero?.render(ctx);
        });

        this.onStageHeros.forEach(hero => {
            hero?.render(ctx);
        });
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(...this.targetLineLeft.plus(0, -30).toNumber());
        ctx.lineTo(...this.targetLineRight.plus(0, -30).toNumber());
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
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'right';
        ctx.fillText(`$:${this.$}`, 440, 29);
        ctx.closePath();

        let displayScore = `${this.score}`;
        if (this.score > 1000) {
            displayScore = (this.score / 1000).toFixed(2) + 'k';
        }
        ctx.beginPath();
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'left';
        ctx.fillText(`SCORE:${displayScore}`, 20, 29);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.closePath();

        ctx.beginPath();
        ctx.font = '14px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(`round ${this.stageNumber + 1 > this.stage.length
            ? this.stage.length : this.stageNumber + 1} / ${this.stage.length}`, this.width / 2, 28);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.closePath();
    }

    render() {
        if (!this.canvas) return;
        this.coreRender(this.canvas);
    }

    setResult(isWin: 'win' | 'loose') {
        this.result = isWin;
        this.setEnd && this.setEnd(true);
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
        if (this.round === 'fighting') return;
        this.isMouseDown = true;

        let isFindOffStage = this.findHero(this.offStageHeros, e.clientX, e.clientY, 'off');
        if (isFindOffStage) {
            window.addEventListener('mousemove', this.handleMouseMove);
            this.isRenderStrategy = true;
            this.loopRender();
            return;
        }
        let isFindOnStage = this.findHero(this.onStageHeros, e.clientX, e.clientY, 'on');
        if (isFindOnStage) {
            window.addEventListener('mousemove', this.handleMouseMove);
            this.isRenderStrategy = true;
            this.loopRender();
            return;
        }
    }

    handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
        if (this.round === 'fighting') return;
        e.stopPropagation();
        e.preventDefault();
        this.isMouseDown = true;

        let isFindOffStage = this.findHero(this.offStageHeros, e.touches[0].clientX, e.touches[0].clientY, 'off');
        if (isFindOffStage) {
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            this.isRenderStrategy = true;
            this.loopRender();
            return;
        }
        let isFindOnStage = this.findHero(this.onStageHeros, e.touches[0].clientX, e.touches[0].clientY, 'on');
        if (isFindOnStage) {
            window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            this.isRenderStrategy = true;
            this.loopRender();
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
        this.isRenderStrategy = false;
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
