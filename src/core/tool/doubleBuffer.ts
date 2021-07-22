interface canvasI {
    value: HTMLCanvasElement;
    next: canvasI|null;
}

const createCanvasList = (len: number, width: number, height: number): canvasI => {
    let start: canvasI = {
        value: document.createElement('canvas'),
        next: null
    }
    start.value.width = width;
    start.value.height = height;
    let current = start;
    for (let i = 0; i < len - 1; i++) {
        current.next = {
            value: document.createElement('canvas'),
            next: null
        }
        current.next.value.width = width;
        current.next.value.height = height;
        current = current.next;
    }
    current.next = start;

    return start;
}

const channel = new MessageChannel();
const port = channel.port2;

export class DoubleBuffer {
    renderFrame: canvasI;
    headFrame: canvasI;
    draw: (doubleBuffer: DoubleBuffer) => void;
    calc: (doubleBuffer: DoubleBuffer) => { isEnd: boolean; isPaused: boolean; };
    isCalcLoopPaused = false;

    isEnd = false;

    frameStartTime = performance.now();
    remainingTime = 16;
    frameTime = 16;

    calcStartTime = 0;

    constructor({ width, height }: {
        width: number;
        height: number;
    }, draw: (doubleBuffer: DoubleBuffer) => void, calc: (doubleBuffer: DoubleBuffer) => {
        isEnd: boolean; isPaused: boolean;
    }) {
        this.draw = draw;
        this.calc = calc;

        this.renderFrame = createCanvasList(40, width, height);
        this.headFrame = this.renderFrame;

        channel.port1.onmessage = () => {
            this.calcHeadFrame();
        }
    }

    startLoop() {
        this.calcHeadFrame(this.drawFrame.bind(this));
    }

    isRemainingTimeEnough() {
        return performance.now() - this.calcStartTime < this.remainingTime - 4;
    }

    private reset() {
        this.remainingTime = 16;
        this.isEnd = false;
        this.isCalcLoopPaused = false;
    }

    private getNextFrame(): boolean {
        if (this.renderFrame.next !== this.headFrame) {
            this.renderFrame = this.renderFrame.next as canvasI;
        } else if (this.isEnd) {
            this.renderFrame = this.renderFrame.next as canvasI;
            return true;
        }
        return false;
    }

    private drawFrame() {
        const isEnd = this.getNextFrame();
        this.draw(this);

        if (isEnd) {
            this.reset();
            return;
        }
        port.postMessage(undefined);
        requestAnimationFrame(() => {
            this.frameStartTime = performance.now();
            this.drawFrame();
        });
    }
    
    private calcHeadFrame(callback?: Function) {
        if (callback) {
            this.frameStartTime = performance.now();
        }
        this.calcStartTime = performance.now();
        this.remainingTime = this.frameTime - (this.calcStartTime - this.frameStartTime);
        if (this.isEnd) return;
        const { isEnd, isPaused } = this.calc(this);
        if (callback) {
            requestAnimationFrame(() => {
                callback();
            });
        }
        if (isPaused) {
            return;
        }
        if (isEnd) {
            this.isEnd = true;
            return;
        }
        this.headFrame = this.headFrame.next as canvasI;
        if (this.headFrame === this.renderFrame) {
            return;
        }
        if (!this.isRemainingTimeEnough()) {
            return;
        }
        this.calcHeadFrame();
    }
}
