import { ExecuteMachine } from "./ExecuteMachine";

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
    headNum = 0;
    renderNum = 0;
    drawLogic: (doubleBuffer: DoubleBuffer) => void;
    calcLogic: (doubleBuffer: DoubleBuffer) => boolean;
    onEnd: () => void;

    isEnd = false;
    isFirst = true;

    frameStartTime = performance.now();
    calcStartTime = 0;
    frameTime = 16;

    exe = new ExecuteMachine();

    constructor({ width, height }: {
        width: number;
        height: number;
    },
    drawLogic: (doubleBuffer: DoubleBuffer) => void,
    calcLogic: (doubleBuffer: DoubleBuffer) => boolean,
    onEnd: () => void) {
        this.drawLogic = drawLogic;
        this.calcLogic = calcLogic;
        this.onEnd = onEnd;

        this.renderFrame = createCanvasList(40, width, height);
        this.headFrame = this.renderFrame;

        channel.port1.onmessage = (msg) => {
            if (this.isEnd || (this.headFrame === this.renderFrame && !this.isFirst)) {
                return;
            }
            this.calcStartTime = performance.now();
            this.exe.start(this.frameTime - (this.calcStartTime - msg.data));
        }

        this.exe.entry(() => {
            this.calcHeadFrame();
        });
    }

    startLoop() {
        this.exe.start(3000);
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
            this.reset();
            this.onEnd();
            return;
        }
        port.postMessage(this.frameStartTime);
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
            this.headFrame = this.headFrame.next as canvasI;
            this.headNum++;
            if (this.headFrame === this.renderFrame) {
                this.exe.stop();
            }
            if (this.isFirst) {
                this.isFirst = false;
                requestAnimationFrame(() => {
                    this.drawFrame();
                });
                this.exe.stop();
            }
        });
    }
}
