import { Point } from "./Point";

export class Coordinate {
    origin: [number, number] = [0, 0];

    constructor(x: number, y: number) {
        this.origin = [x, y];
    }

    resetOrigin(origin: Point) {
        this.origin = origin.toNumber();
    }

    point(x: number, y: number): Point {
        return new Point(x, y, this);
    }

    toPoint(x: number, y: number): Point {
        return new Point(x - this.origin[0], y - this.origin[1], this);
    }
}