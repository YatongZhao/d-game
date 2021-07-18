import { Game } from "..";
import { Point } from "../Point";
import { drawRoundRect } from "../tool";

export interface EnemyHook  {
    go: () => void;
    render(ctx: CanvasRenderingContext2D, enemy: Enemy): void;
    beforeDestory: (enemy: Enemy) => void;
}

export class Enemy {
    value = 0;
    size = 20;
    point: Point;
    game: Game;
    beforeDestory: ((enemy: Enemy) => void)[] = [];
    hooks: EnemyHook[] = [];
    speed = 0.5;

    x = 0;
    y = 0;

    isPicked = false;
    isPickedByBoom = false;

    constructor(value: number, x: number, game: Game, speed?: number) {
        this.value = value;
        this.game = game;
        this.point = new Point(x, -this.size, game.coordinate);
        speed && (this.speed = speed);
    }

    go() {
        this.point.y += this.speed;
        this.hooks.forEach(hook => hook.go());
    }

    addBeforeDestory(cb: (enemy: Enemy) => void) {
        this.beforeDestory.push(cb);
    }

    addHook(hook: EnemyHook) {
        this.hooks.push(hook);
    }

    hited(n?: number): boolean {
        if (n) {
            this.game.score += this.value < n ? this.value : n;
            this.value -= n;
        } else {
            this.value--;
            this.game.score++;
        }

        if (this.value <= 0) {
            this.beforeDestory.forEach(cb => cb(this));
            this.game.removeEnemy(this);
            this.hooks.forEach(hook => hook.beforeDestory(this));
            return true;
        }
        return false;
    }

    render(ctx: CanvasRenderingContext2D) {
        this.hooks.forEach(hook => hook.render(ctx, this));
        let [x, y] = this.point.toNumber();
        drawRoundRect(x, y, this.size, this.size, 5, ctx);
        ctx.textAlign = 'center';
        ctx.fillText(`${this.value}`, x + this.size / 2, y + 13);
    }

}
