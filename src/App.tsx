import React, { useEffect, useRef, useState } from 'react';
import { Game } from './core';
import s from './App.module.css';
import { Hero } from './core/Hero/Hero';
import { LightningHero } from './core/Hero/LightningHero';
import { GrapeshotHero } from './core/Hero/GrapeshotHero';

const game = new Game();

const App = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        // canvasRef.current.width = window.innerWidth;
        // canvasRef.current.height = window.innerHeight;
        canvasRef.current.width = game.width;
        canvasRef.current.height = game.height;
    }, [canvasRef]);

    useEffect(() => {
        game.setEnd = setEnd;
    }, [end]);

    useEffect(() => {
        game.render(canvasRef.current);
    }, [canvasRef]);

    useEffect(() => {
        const handler = game.handleMouseUp.bind(game);
        const touchEndHandler = game.handleTouchEnd.bind(game);
        window.addEventListener('mouseup', handler);
        window.addEventListener('touchend', touchEndHandler)
        return () => {
            window.removeEventListener('mouseup', handler);
            window.removeEventListener('touchend', touchEndHandler);
        }
    }, []);

    function restart() {
        game.restart();
        setEnd(false);
        game.render(canvasRef.current);
    }

    return <>
        <canvas ref={canvasRef} className={s.canvas}
            onTouchStart={game.handleTouchStart.bind(game)}
            onMouseDown={game.handleCanvasMouseDown.bind(game)} />
        <div className={s.info}>
            <div className={s.addHeroBox}>
                <button className={s.addHeroBtn} onClick={() => {
                    game.addOffStageHero(new LightningHero(game));
                }}>+闪电</button>
                <button className={s.addHeroBtn} onClick={() => {
                    game.addOffStageHero(new GrapeshotHero(game));
                }}>+霰弹</button>
            </div>
            <div className={[s.gameEndBox, end ? s.end : ''].join(' ')}>
                END
                <button onClick={restart} className={s.restartBtn}>restart</button>
            </div>
        </div>
    </>
}
export default App;
