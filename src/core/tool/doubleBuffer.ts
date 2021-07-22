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
    drawLogic: (doubleBuffer: DoubleBuffer) => void;
    calcLogic: (doubleBuffer: DoubleBuffer) => boolean;

    isEnd = false;
    isFirst = true;

    frameStartTime = performance.now();
    calcStartTime = 0;
    frameTime = 16;

    exe = new ExecuteMachine();

    constructor({ width, height }: {
        width: number;
        height: number;
    }, drawLogic: (doubleBuffer: DoubleBuffer) => void, calcLogic: (doubleBuffer: DoubleBuffer) => boolean) {
        this.drawLogic = drawLogic;
        this.calcLogic = calcLogic;

        this.renderFrame = createCanvasList(40, width, height);
        this.headFrame = this.renderFrame;

        channel.port1.onmessage = () => {
            this.calcStartTime = performance.now();
            this.exe.start(this.frameTime - (this.calcStartTime - this.frameStartTime));
        }

        this.exe.entry(() => {
            this.calcHeadFrame();
        });
    }

    startLoop() {
        this.frameStartTime = this.exe.getNow();
        port.postMessage(undefined);
    }

    private reset() {
        this.isEnd = false;
        this.isFirst = true;
        this.renderFrame = this.headFrame;
    }

    private getNextFrame(): boolean {
        if (this.renderFrame.next !== this.headFrame) {
            this.renderFrame = this.renderFrame.next as canvasI;
        } else if (this.isEnd) {
            return true;
        }
        return false;
    }

    private drawFrame() {
        // console.log(2);
        this.frameStartTime = performance.now();
        const isEnd = this.getNextFrame();
        this.drawLogic(this);

        if (isEnd) {
            this.reset();
            return;
        }
        port.postMessage(undefined);
        requestAnimationFrame(() => {
            this.drawFrame();
        });
    }

    private calcHeadFrame() {
        this.exe.block(() => {
            if (this.isEnd) {
                this.exe.stop();
                return;
            }
            // console.log(1);
            const isEnd = this.calcLogic(this);
            if (isEnd) {
                this.isEnd = true;
                this.exe.stop();
            }
            this.headFrame = this.headFrame.next as canvasI;
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
