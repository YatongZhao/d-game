import { ExecuteMachine } from "./ExecuteMachine";

interface canvasI {
    value: HTMLCanvasElement;
    next: canvasI|null;
    isReady: boolean;
}

const createCanvasList = (len: number, width: number, height: number): canvasI => {
    let start: canvasI = {
        value: document.createElement('canvas'),
        next: null,
        isReady: false,
    }
    start.value.width = width;
    start.value.height = height;
    let current = start;
    for (let i = 0; i < len - 1; i++) {
        current.next = {
            value: document.createElement('canvas'),
            isReady: false,
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
    headNum = 0;
    renderNum = 0;
    drawLogic: (doubleBuffer: DoubleBuffer) => void;
    calcLogic: (doubleBuffer: DoubleBuffer) => boolean;
    onEnd: () => void;

    isEnd = false;
    isFirst = true;

    shouldGo = false;

    frameStartTime = performance.now();
    calcStartTime = 0;
    frameTime = 14;

    exe = new ExecuteMachine();

    constructor({ width, height }: {
        width: number;
        height: number;
    },
    drawLogic: (doubleBuffer: DoubleBuffer) => void,
    calcLogic: (doubleBuffer: DoubleBuffer) => boolean,
    endLogic: () => void,
    onEnd: () => void) {
        this.drawLogic = drawLogic;
        this.calcLogic = calcLogic;
        this.onEnd = onEnd;

        this.renderFrame = createCanvasList(400, width, height);
        this.headFrame = this.renderFrame;

        channel.port1.onmessage = (msg) => {
            if (!this.shouldGo || this.isEnd || msg.data.isEnd || (this.headFrame === this.renderFrame && !this.isFirst)) {
                return;
            }
            this.calcStartTime = performance.now();
            this.exe.start(this.frameTime - (this.calcStartTime - msg.data.frameStartTime));
        }

        this.exe.entry(() => {
            this.calcHeadFrame();
        });

        this.exe.end(() => {
            endLogic();
        });
    }

    startLoop() {
        this.shouldGo = true;
        this.exe.start(300);
    }

    private reset() {
        this.isEnd = false;
        this.isFirst = true;
        this.renderFrame = this.headFrame;
        this.renderNum = this.headNum;
    }

    private getNextFrame(): boolean {
        if (this.renderFrame.next !== this.headFrame) {
            this.renderFrame = this.renderFrame.next as canvasI;
            this.renderNum++;
        } else if (this.isEnd) {
            return true;
        }
        return false;
    }

    private drawFrame() {
        this.frameStartTime = performance.now();
        const isEnd = this.getNextFrame();
        this.drawLogic(this);

        if (isEnd) {
            this.shouldGo = false;
            this.reset();
            this.onEnd();
            return;
        }
        port.postMessage({ frameStartTime: this.frameStartTime, isEnd });
        requestAnimationFrame(() => {
            this.drawFrame();
        });
    }

    private calcHeadFrame() {
        const isEnd = this.calcLogic(this);
        this.exe.block(() => {
            if (isEnd) {
                this.isEnd = true;
                this.exe.stop();
            }
            this.headFrame.isReady = true;
            this.headFrame = this.headFrame.next as canvasI;
            this.headFrame.isReady = false;
            this.headNum++;
            if (this.headFrame === this.renderFrame) {
                this.exe.stop();
            }
            if (this.isFirst) {
                this.isFirst = false;
                requestAnimationFrame(() => {
                    this.drawFrame();
                });
            }
        });
    }
}
