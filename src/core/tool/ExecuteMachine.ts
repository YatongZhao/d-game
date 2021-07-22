interface blockState {
    result: any;
    consumingTime: number;
}

export class ExecuteMachine {
    private remainingTime;
    private blockStateList: blockState[] = [];
    private executeStep = 0;
    private memoStep = 0;
    private isExecutingToTheEnd = true;
    private starter: () => void = () => {};
    private isExecuting = false;
    private executingStartTime = this.getNow();

    constructor(remainingTime: number = 16) {
        this.remainingTime = remainingTime;
    }

    private getNow(): number {
        return performance.now();
    }

    private resetState() {
        this.executeStep = 0;
        this.memoStep = 0;
        this.blockStateList = [];
        this.isExecutingToTheEnd = true;
        this.isExecuting = false;
    }

    entry(logic: () => void): void {
        this.starter = () => {
            this.isExecutingToTheEnd = true;
            logic();
            this.executeStep = 0;
            if (this.isExecutingToTheEnd) {
                this.memoStep = 0;
            }
        };
        this.resetState();
    }

    start() {
        if (this.isExecuting) return;
        this.executingStartTime = this.getNow();
        this.isExecuting = true;
        while (this.isExecuting) {
            this.starter();
        }
    }

    block<T>(callback: () => T): T {
        if (!this.isExecuting) {
            this.isExecutingToTheEnd = false;
            return {} as T;
        }
        let result: T;
        if (this.executeStep < this.memoStep) {
            result = this.blockStateList[this.executeStep].result;
        } else {
            const start = this.getNow();
            result = callback();
            const end = this.getNow();
            const consumingTime = end - start;
            this.blockStateList[this.executeStep] = {
                result,
                consumingTime,
            };

            this.memoStep++;
        }

        this.executeStep++;
        
        if (this.getNow() - this.executingStartTime >= this.remainingTime) {
            this.isExecuting = false;
        }
        return result;
    }

    stop() {
        this.isExecuting = false;
    }
}
