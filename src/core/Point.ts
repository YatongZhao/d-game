import { Coordinate } from "./Coordinate";

export class Point {
    x = 0;
    y = 0;
    coordinate: Coordinate;

    constructor(x: number, y: number, coordinate: Coordinate) {
        this.x = x;
        this.y = y;
        this.coordinate = coordinate;
    }

    toNumber(): [number, number] {
        return [this.x + this.coordinate.origin[0], this.y + this.coordinate.origin[1]];
    }

    plus(x: number, y: number) {
        return new Point(this.x + x, this.y + y, this.coordinate);
    }

    lengthTo(p: Point): number {
        let p1 = this.toNumber();
        let p2 = p.toNumber();

        return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5;
    }
}
