import { Point } from "../Point";

export const drawRoundRect = (x: number, y: number, w: number, h: number, r: number, ctx: CanvasRenderingContext2D): void => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r);
    ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath();
    ctx.stroke();
}

export const drawLightning = (p1: Point, p2: Point, ctx: CanvasRenderingContext2D, color?: string, lightColor?: string) => {
    const [pn1x, pn1y] = p1.toNumber();
    const [pn2x, pn2y] = p2.toNumber();

    const dx = pn2x - pn1x;
    const dy = pn2y - pn1y;
    const l = p1.lengthTo(p2);

    const cos = dx / l;
    const sin = dy / l;

    ctx.strokeStyle = color || "red";

    ctx.shadowColor = lightColor || 'blue';
    // ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    let j = 4 + Math.floor(Math.random() * 5);

    ctx.beginPath();
    ctx.lineWidth = 1 + Math.floor(Math.random()*9);
    ctx.moveTo(...p1.toNumber());
    for (let i = 1; i < j; i++) {
        let random = Math.random() - 0.5;
        let o = p1.plus(dx / j * (i + random), dy / j * (i + random));

        let randomR = (Math.random() - 0.5) * 60;
        o = o.plus(randomR * sin, randomR * cos);

        ctx.lineTo(...o.toNumber());
    }
    ctx.lineTo(...p2.toNumber());
    ctx.stroke();
    ctx.closePath();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
}