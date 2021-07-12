import { Coordinate } from "./Coordinate";
import { Point } from "./Point";

const drawRoundRect = (x: number, y: number, w: number, h: number, r: number, ctx: CanvasRenderingContext2D): void => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r);
    ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath();
    ctx.stroke();
}

const drawLightning = (p1: Point, p2: Point, ctx: CanvasRenderingContext2D) => {
    const [pn1x, pn1y] = p1.toNumber();
    const [pn2x, pn2y] = p2.toNumber();

    const dx = pn2x - pn1x;
    const dy = pn2y - pn1y;
    const l = p1.lengthTo(p2);

    const cos = dx / l;
    const sin = dy / l;

    ctx.strokeStyle = "white";

    ctx.shadowColor = 'blue';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;


    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(...p1.toNumber());
    for (let i = 1; i < 5; i++) {
        let o = p1.plus(dx / 5 * i, dy / 5 * i);

        let randomR = (Math.random() - 0.5) * 60;
        o = o.plus(randomR * sin, randomR * cos);

        ctx.lineTo(...o.toNumber());
    }
    ctx.lineTo(...p2.toNumber());
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(...p1.toNumber());
    for (let i = 1; i < 5; i++) {
        let o = p1.plus(dx / 5 * i, dy / 5 * i);

        let randomR = (Math.random() - 0.5) * 60;
        o = o.plus(randomR * sin, randomR * cos);

        ctx.lineTo(...o.toNumber());
    }
    ctx.lineTo(...p2.toNumber());
    ctx.stroke();
    ctx.closePath();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}

class Enemy {
    value = 0;
    size = 20;
    point: Point;
    game: Game;

    constructor(value: number, x: number, game: Game) {
        this.value = value;
        this.game = game;
        this.point = new Point(x, -this.size, game.coordinate);
    }

    go() {
        this.point.y += 1;
    }

    hited() {
        this.value--;

        if (this.value <= 0) {
            this.game.removeEnemy(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();
        drawRoundRect(x, y, this.size, this.size, 5, ctx);
        ctx.textAlign = 'center';
        ctx.fillText(`${this.value}`, x + this.size / 2, y + 13);
    }
}

export class Hero {
    point: Point;
    size = 30;

    step = 0;
    cycle = 3;

    angle = 0;
    angleCycle = 40;

    game: Game;

    constructor(game: Game) {
        this.game = game;
        this.point = new Point(0, 0, game.coordinate);
    }

    go() {
        if (this.step % this.cycle === 0) {
            this.game.bullets.push(new Bullet(this.point.plus(this.size/2, 0), this.angle, this.game));

            let j = Math.floor(this.step / this.angleCycle) % 4;
            if (j === 0 || j === 3) {
                this.angle += Math.PI * 0.01;
            } else {
                this.angle -= Math.PI * 0.01;
            }
        }
        this.step++;
    }

    render(ctx: CanvasRenderingContext2D, position?: [number, number]) {
        let [x, y] = position || this.point.toNumber();
        drawRoundRect(x, y, this.size, this.size, 5, ctx);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.fillStyle = 'black';
    }

    isPointIn(x: number, y: number) {
        let [_x, _y] = this.point.toNumber();
        return x >= _x && x <= _x + this.size
            && y >= _y && y <= _y + this.size;
    }
}

export class GrapeshotHero extends Hero {
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

interface Chain<T> {
    value: T;
    next: Chain<T> | null;
}

export class LightningHero extends Hero {
    cycle = 5;
    targets: {
        length: number;
        chain: Chain<Enemy> | null;
        end: Chain<Enemy> | null;
    } = {
        length: 0,
        chain: null,
        end: null
    };
    targetMaxLength = 5;

    go() {
        if (this.targets.length < this.targetMaxLength && this.game.enemys.length >= this.targetMaxLength) {
            let i = this.targetMaxLength - this.targets.length;
            while (i !== 0) {
                let enemyLen = this.game.enemys.length;
                let randomI = Math.floor(enemyLen*Math.random());

                let chain = this.targets.chain;

                if (!chain) {
                    this.addTarget({
                        value: this.game.enemys[randomI],
                        next: null
                    });
                    i--;
                    continue;
                }

                const isTrue = this.addTarget({
                    value: this.game.enemys[randomI],
                    next: null
                });
                if (isTrue) {
                    i--;
                }
            }
        }

        if (this.step % this.cycle === 0) {
            let chain = this.targets.chain;
            while (chain) {
                chain.value.hited();
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
            drawLightning(p1, p2, ctx);

            p1 = chain.value.point.plus(chain.value.size / 2, chain.value.size / 2);
            chain = chain.next;
        }

    }

    addTarget(chain: Chain<Enemy>): boolean {
        if (this.targets.end === null) {
            this.targets.chain = chain;
            this.targets.end = chain;
            this.targets.length++;
        } else {
            let _chain = this.targets.chain;

            while (_chain) {

                if (chain === _chain) {
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
}

class Bullet {
    point: Point;
    game: Game;
    size = 2;
    direction = 0;

    constructor(point: Point, direction: number, game: Game) {
        this.point = point;
        this.direction = direction;
        this.game = game;
    }

    go() {
        for (let i = 0; i <30; i++) {
            this.point.y -= Math.cos(this.direction);
            this.point.x += Math.sin(this.direction);

            let isTrue = this.game.enemys.some(enemy => {
                if (this.point.x >= enemy.point.x - 2
                    && this.point.y >= enemy.point.y - 2
                    && this.point.x <= enemy.point.x + enemy.size + 2
                    && this.point.y <= enemy.point.y + enemy.size + 2) {
                        enemy.hited();
                        this.game.removeBullet(this);
                        return true;
                }
                return false;
            });

            if (isTrue) {
                return;
            }
        }
        if (this.point.y < 0
            || this.point.y > this.game.height
            || this.point.x < 0
            || this.point.x > this.game.width) {
            this.game.removeBullet(this);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        let [x, y] = this.point.toNumber();
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

export class Game {
    coordinate = new Coordinate(110, 0);

    enemys: Enemy[] = [];

    offStageHeros: [Hero|null, Hero|null, Hero|null] = [null, null, null];
    onStageHeros: [Hero|null, Hero|null, Hero|null] = [null, null, null];

    bullets: Bullet[] = [];

    heroPosList = [
        new Point(175, 860, this.coordinate),
        new Point(215, 860, this.coordinate),
        new Point(255, 860, this.coordinate),
        new Point(175, 810, this.coordinate),
        new Point(215, 810, this.coordinate),
        new Point(255, 810, this.coordinate)
    ];

    cycle = 30;
    step = 0;
    setEnd: React.Dispatch<React.SetStateAction<boolean>> | null = null;

    width = 460;
    height = 900;

    targetY = 800;
    targetLineLeft = this.coordinate.point(0, this.targetY);
    targetLineRight = this.coordinate.point(this.width, this.targetY);

    isMouseDown = false;
    mouseSelectItem: Hero | null = null;
    mouseSelectItemPosition: [number, number] = [0, 0];
    mouseSelectItemOffset: [number, number] = [0, 0];

    constructor() {
        this.go();

        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    restart() {
        this.enemys = [];
        this.offStageHeros = [null, null, null];
        this.onStageHeros = [null, null, null];
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

        this.onStageHeros.forEach(hero => {
            hero?.go();
        });

        this.offStageHeros.forEach(hero => {
            hero?.go();
        });

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

        requestAnimationFrame(async () => {
            // await new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve(null);
            //     }, 30);
            // });

            this.render(canvas);
        });
    }

    addOffStageHero(hero: Hero, position?: 0|1|2) {
        if (position === undefined) {
            this.offStageHeros.some((hero, index) => {
                if (hero === null) {
                    position = index as 0|1|2;
                    return true;
                }
                return false;
            });
        }
        if (position === undefined) return;
        hero.point.y = 860;
        hero.point.x = 175 + position * 40;
        this.offStageHeros[position] = hero;
    }

    addOnStageHero(hero: Hero, position?: 0|1|2) {
        if (position === undefined) {
            this.offStageHeros.some((hero, index) => {
                if (hero === null) {
                    position = index as 0|1|2;
                    return true;
                }
                return false;
            });
        }
        if (position === undefined) return;
        hero.point.y = 810;
        hero.point.x = 175 + position * 40;
        this.onStageHeros[position] = hero;
    }

    handleCanvasMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        this.isMouseDown = true;

        let hero = this.offStageHeros.find(hero => {
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

        if (hero) {
            this.mouseSelectItem = hero;
            this.mouseSelectItemPosition = [e.clientX, e.clientY];
            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    handleMouseUp(e: MouseEvent) {
        this.isMouseDown = false;
        this.mouseSelectItem = null;
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(e: MouseEvent) {
        this.mouseSelectItemPosition = [e.clientX, e.clientY];
    }
}
