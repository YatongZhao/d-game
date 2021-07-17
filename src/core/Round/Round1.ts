import { Game } from "..";
import { Enemy } from "../Enemy/Enemy";
import { Round } from "./Round";

export class Round1 implements Round {
    game: Game;
    waveNumber = 30;

    symbolLife = 100;

    isEnd = false;

    constructor(game: Game) {
        this.game = game;
    }

    createEnemy() {
        let row: Enemy[] = [];
        for (let i = 0; i < 15; i++) {
            row.push(new Enemy(Math.ceil(this.game.step/120*Math.random() + 1), 30 * i + 10, this.game));
        }
        this.game.enemySet.push(...row);
    }

    go() {
        if (this.waveNumber === 0) {
            this.isEnd = true;
            return;
        }
        if (this.game.step % this.game.cycle === 0) {
            this.createEnemy();
            this.waveNumber--;
        }
    }

    award() {

    }

    renderSymbol(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.font = 'italic bolder 60px Arial';
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'center';
        ctx.fillText(`ROUND ${this.game.stageNumber + 1}`, this.game.width / 2, this.game.height - 350);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.closePath();
    }
}
