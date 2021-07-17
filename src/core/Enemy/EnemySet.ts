import { Point } from "../Point";
import { Enemy } from "./Enemy";

export class EnemySet {
    array: (Enemy|null)[] = [];
    matrix: (Enemy|null)[][] = [];
    set: Set<Enemy> = new Set();

    reset() {
        this.array = [];
        this.matrix = [];
        this.set = new Set<Enemy>();
    }

    removeEnemy(enemy: Enemy) {
        this.set.delete(enemy);
        this.array = this.array.map(_enemy => {
            if (_enemy === enemy) return null;
            return _enemy;
        });
        this.matrix = this.matrix.map(row => {
            return row.map(_enemy => {
                if (_enemy === enemy) return null;
                return _enemy;
            })
        });
    }

    forEach(callbackfn: (value: Enemy, value2: Enemy, set: Set<Enemy>) => void) {
        this.set.forEach(callbackfn);
    }

    some(predicate: (value: Enemy | null, index: number, array: (Enemy | null)[]) => unknown): boolean {
        return this.array.some(predicate);
    }

    push(...items: Enemy[]) {
        items.forEach(item => this.set.add(item));
        this.matrix.push(items);
        return this.array.push(...items);
    }

    get length(): number {
        return this.set.size;
    }

    get(i: number): Enemy | null {
        return this.array[i];
    }

    getRandomEnemy(): Enemy {
        let i = 0;
        let random = Math.floor(Math.random() * this.length);
        let k = this.set.keys();
        let result: Enemy = k.next().value;
        while (i !== random) {
            result = k.next().value;
            i++;
        }
        return result;
    }

    findEnemyByPoint(point: Point): Enemy | null {
        // 30 * i + 10 - 2
        // 30 * i + 10 + enemySize (20) + 2
        // Math.floor((point.x - 10) / 30)
        if ((point.x - 8) % 30 > 24) return null;
        let i = Math.floor((point.x - 10) / 30);
        if (i < 0 || i > 14) return null;
        let result: Enemy | null = null;
        this.matrix.some(row => {
            let enemy = row[i];
            if (!enemy) return false;
            if (enemy.point.y + enemy.size + 2 < point.y) {
                return true;
            } else if (enemy.point.y - 2 <= point.y) {
                result = enemy;
                return true;
            }
            return false;
        });
        return result;
    }

    findEnemyByY(y: number): Enemy[] {
        let result: Enemy[] = [];
        this.matrix.some(row => {
            let res = false;
            row.some(enemy => {
                if (!enemy) return false;
                if (enemy.point.y + enemy.size < y) {
                    return true;
                } else if (enemy.point.y <= y) {
                    result.push(enemy);
                    res = true;
                    return false;
                }
                return true;
            });
            return res;
        });
        
        return result;
    }
}
