interface blockState {
    result: any;
    consumingTime: number;
}

export class ExecuteMachine {
    private remainingTime;
    private defaultRemainingTime;
    private blockStateList: (blockState|null)[] = [];
    private executeStep = 0;
    private memoStep = 0;
    private isExecutingToTheEnd = true;
    private isInTheEnv = false;
    private starter: () => void = () => {
        throw new Error("need a starter.");
    };
    private endLogic: () => void = () => {};
    private isExecuting = false;
    private executingStartTime = this.getNow();

    constructor(defaultRemainingTime: number = 16) {
        this.defaultRemainingTime = defaultRemainingTime;
        this.remainingTime = defaultRemainingTime;
    }

    private resetState() {
        this.executeStep = 0;
        this.memoStep = 0;
        this.blockStateList = [];
        this.isExecutingToTheEnd = true;
        this.isExecuting = false;
    }

    getNow(): number {
        return performance.now();
    }

    entry(logic: () => void): void {
        this.starter = () => {
            this.isExecutingToTheEnd = true;
            logic();
            this.executeStep = 0;
            if (this.isExecutingToTheEnd) {
                this.memoStep = 0;
                this.blockStateList.fill(null);
                this.endLogic();
            }
        };
        this.resetState();
    }

    end(endLogic: () => void) {
        this.endLogic = endLogic;
    }

    start(remainingTime?: number) {
        if (this.isExecuting) return;
        this.isInTheEnv = true;
        this.remainingTime = remainingTime || this.defaultRemainingTime;
        this.executingStartTime = this.getNow();
        this.isExecuting = true;
        while (this.isExecuting) {
            this.starter();
        }
        if (this.isExecutingToTheEnd) {
            this.blockStateList.fill(null);
        }
        this.isInTheEnv = false;
    }

    block<T>(callback: () => T): T {
        if (!this.isInTheEnv) {
            return callback();
        }
        if (this.getNow() - this.executingStartTime >= this.remainingTime) {
            this.isExecuting = false;
        }
        if (!this.isExecuting) {
            this.isExecutingToTheEnd = false;
            return null as unknown as T;
        }
        let result: T;
        if (this.executeStep < this.memoStep) {
            result = (this.blockStateList[this.executeStep] as blockState).result;
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
        
        return result;
    }

    stop() {
        this.isExecuting = false;
    }
}
