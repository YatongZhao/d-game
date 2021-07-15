export interface Round {
    createEnemy(): void;
    go(): void;
    award(): void;
    renderSymbol(ctx: CanvasRenderingContext2D): void;
    isEnd: boolean;
}
