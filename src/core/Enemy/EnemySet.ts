import { Point } from "../Point";
import { Enemy } from "./Enemy";

export class EnemySet {
    array: (Enemy|null)[] = [];
    notNullArray: Enemy[] = [];
    matrix: (Enemy|null)[][] = [];
    set: Set<Enemy> = new Set();
    dirtySet: Set<Enemy> = new Set();
    length = 0;

    reset() {
        this.array = [];
        this.matrix = [];
        this.notNullArray = [];
        this.set = new Set<Enemy>();
        this.dirtySet.clear();
        this.length = 0;
    }

    removeEnemy(enemy: Enemy) {
        enemy.isDirty = true;
        this.dirtySet.add(enemy);
        this.length--;
    }

    flushEnemy() {
        this.dirtySet.forEach(enemy => {
            this.set.delete(enemy);
            let index = this.array.findIndex(_enemy => _enemy === enemy);
            this.array[index] = null;
            this.matrix[enemy.y][enemy.x] = null;
            this.notNullArray = this.notNullArray.filter(_enemy => _enemy !== enemy);
        });
        this.dirtySet.clear();
    }

    forEach(callbackfn: (value: Enemy, index: number, array: (Enemy)[]) => void) {
        this.notNullArray.filter(enemy => !enemy.isDirty).forEach(callbackfn);
    }

    some(predicate: (value: Enemy | null, index: number, array: (Enemy | null)[]) => unknown): boolean {
        return this.array.filter(enemy => !(enemy && enemy.isDirty)).some(predicate);
    }

    filter(predicate: ((value: Enemy | null, index: number, array: (Enemy | null)[]) => boolean)) {
        return this.array.filter(enemy => !(enemy && enemy.isDirty)).filter(predicate);
    }

    push(...items: Enemy[]) {
        this.length += items.length;
        items.forEach((item, i) => {
            item.x = i;
            item.y = this.matrix.length;
            this.set.add(item);
        });
        this.matrix.push(items);
        this.notNullArray.push(...items);
        return this.array.push(...items);
    }

    get(i: number): Enemy | null {
        return this.array.filter(enemy => !(enemy && enemy.isDirty))[i];
    }

    getNotNull(i: number): Enemy {
        return this.notNullArray.filter(enemy => !enemy.isDirty)[i];
    }

    getEnemysByIndex(indexList: number[]): Enemy[] {
        return indexList.map(i => this.notNullArray.filter(enemy => !enemy.isDirty)[i]);
    }

    getRandomEnemy(): Enemy {
        let random = Math.floor(Math.random() * this.length);
        return this.notNullArray.filter(enemy => !enemy.isDirty)[random];
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
        return result.filter(enemy => enemy && !enemy.isDirty) as Enemy[];
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
        if (result && (result as Enemy).isDirty) {
            return null;
        }
        return result;
    }

    findEnemyByY(y: number): Enemy[] {
        let result: Enemy[] = [];
        this.matrix.some(row => {
            let res = false;
            row.some(enemy => {
                if (!enemy || enemy.isDirty) return false;
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
