import { ExecuteMachine } from "./ExecuteMachine";

test('execute machine: loop时间正常', () => {
    let exe = new ExecuteMachine(3);

    exe.entry(() => {
        let a = exe.block(() => {
            return Math.random();
        });
        exe.block(() => {
            exe.start();
        });
        exe.block(() => {

        });
    });

    let start = performance.now();
    exe.start();
    let end = performance.now();
    expect(end - start > 3).toBe(true);
    expect(end - start < 10).toBe(true);
});

let exe = new ExecuteMachine(3);
let counter = 0;
let memoA = 0;

exe.entry(() => {
    let a = exe.block(() => {
        return Math.random();
    });
    exe.block(() => {
        if (counter === 0) {
            memoA = a;
            exe.stop();
            counter++;
        }
    });
    exe.block(() => {
        expect(memoA).toBe(a);
        counter = 0;
        exe.stop();
    });
});

test('execute machine: 停止正常', () => {
    let start = performance.now();
    exe.start();
    let end = performance.now();
    expect(end - start < 1).toBe(true);

});

test('execute machine: 重启正常', () => {
    exe.start();
});

test('execute machine: 停止2正常', () => {
    let start = performance.now();
    exe.start();
    let end = performance.now();
    expect(end - start < 1).toBe(true);

});

test('execute machine: 重启2正常', () => {
    exe.start();
});


export {};
