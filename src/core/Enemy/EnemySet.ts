import { Point } from "../Point";
import { Enemy } from "./Enemy";

export class EnemySet {
    array: (Enemy|null)[] = [];
    notNullArray: Enemy[] = [];
    matrix: (Enemy|null)[][] = [];
    set: Set<Enemy> = new Set();

    reset() {
        this.array = [];
        this.matrix = [];
        this.notNullArray = [];
        this.set = new Set<Enemy>();
    }

    removeEnemy(enemy: Enemy) {
        this.set.delete(enemy);
        this.array = this.array.map(_enemy => {
            if (_enemy === enemy) return null;
            return _enemy;
        });
        this.matrix[enemy.y][enemy.x] = null;
        this.notNullArray = this.notNullArray.filter(_enemy => _enemy !== enemy);
    }

    forEach(callbackfn: (value: Enemy, index: number, array: (Enemy)[]) => void) {
        this.notNullArray.forEach(callbackfn);
    }

    some(predicate: (value: Enemy | null, index: number, array: (Enemy | null)[]) => unknown): boolean {
        return this.array.some(predicate);
    }

    filter(predicate: ((value: Enemy | null, index: number, array: (Enemy | null)[]) => boolean)) {
        return this.array.filter(predicate);
    }

    push(...items: Enemy[]) {
        items.forEach((item, i) => {
            item.x = i;
            item.y = this.matrix.length;
            this.set.add(item);
        });
        this.matrix.push(items);
        this.notNullArray.push(...items);
        return this.array.push(...items);
    }

    get length(): number {
        return this.set.size;
    }

    get(i: number): Enemy | null {
        return this.array[i];
    }

    getNotNull(i: number): Enemy {
        return this.notNullArray[i];
    }

    getEnemysByIndex(indexList: number[]): Enemy[] {
        return indexList.map(i => this.notNullArray[i]);
    }

    getRandomEnemy(): Enemy {
        let random = Math.floor(Math.random() * this.notNullArray.length);
        return this.notNullArray[random];
    }

    findEnemysAroundEnemy(enemy: Enemy, r: 1|2|3): Enemy[] {
        let result = [];
        switch (r) {
            case 1:
                result.push(this.matrix[enemy.y][enemy.x]);
                result.push(this.matrix[enemy.y][enemy.x - 1]);
                result.push(this.matrix[enemy.y][enemy.x + 1]);
                result.push((this.matrix[enemy.y - 1] || [])[enemy.x]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x]);
                break;
            case 2:
            case 3:
            default:
                result.push(this.matrix[enemy.y][enemy.x]);
                result.push(this.matrix[enemy.y][enemy.x - 1]);
                result.push(this.matrix[enemy.y][enemy.x + 1]);
                result.push((this.matrix[enemy.y - 1] || [])[enemy.x]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x]);
                
                result.push(this.matrix[enemy.y][enemy.x - 2]);
                result.push(this.matrix[enemy.y][enemy.x + 2]);

                result.push((this.matrix[enemy.y - 2] || [])[enemy.x]);
                result.push((this.matrix[enemy.y + 2] || [])[enemy.x]);

                result.push((this.matrix[enemy.y - 1] || [])[enemy.x - 1]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x + 1]);
                result.push((this.matrix[enemy.y - 1] || [])[enemy.x + 1]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x - 1]);

                result.push((this.matrix[enemy.y - 2] || [])[enemy.x - 1]);
                result.push((this.matrix[enemy.y - 2] || [])[enemy.x + 1]);
                result.push((this.matrix[enemy.y + 2] || [])[enemy.x - 1]);
                result.push((this.matrix[enemy.y + 2] || [])[enemy.x + 1]);

                result.push((this.matrix[enemy.y - 1] || [])[enemy.x - 2]);
                result.push((this.matrix[enemy.y - 1] || [])[enemy.x + 2]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x - 2]);
                result.push((this.matrix[enemy.y + 1] || [])[enemy.x + 2]);
                break;
            }
        return result.filter(Boolean) as Enemy[];
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
