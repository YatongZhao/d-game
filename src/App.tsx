import React, { useEffect, useRef, useState } from 'react';
import { Game } from './core';
import s from './App.module.css';
import { LightningHero } from './core/Hero/LightningHero';
import { GrapeshotHero } from './core/Hero/GrapeshotHero';

const game = new Game();

const grapeshot = {
    type: 'grapeshot-hero',
    name: '霰弹'
}

const lightning = {
    type: 'lightning-hero',
    name: '闪电'
}

const createProductList = () => {
    return [
        Math.random() > 0.5 ? grapeshot : lightning,
        Math.random() > 0.5 ? grapeshot : lightning,
        Math.random() > 0.5 ? grapeshot : lightning,
        Math.random() > 0.5 ? grapeshot : lightning,
        Math.random() > 0.5 ? grapeshot : lightning
    ];
}

const App = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [end, setEnd] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [productList, setProductList] = useState(createProductList());

    useEffect(() => {
        if (!canvasRef.current) return;
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
            <div>
                <button className={s.shopBtn} onClick={() => setIsShopOpen(!isShopOpen)}>商店</button>
                {isShopOpen && <div className={s.shopBox}>
                    <ul className={s.shopList}>
                        {productList.map((p, i) => <li className={s.shopItem} key={i} onClick={() => {
                            switch (p.type) {
                                case 'grapeshot-hero':
                                    game.addOffStageHero(new GrapeshotHero(game));
                                    break;
                                case 'lightning-hero':
                                default:
                                    game.addOffStageHero(new LightningHero(game));
                                    break;
                            }
                            setIsShopOpen(false);
                            setProductList(createProductList());
                        }}>
                            {p.name}
                        </li>)}
                    </ul>
                </div>}
            </div>
            <div className={[s.gameEndBox, end ? s.end : ''].join(' ')}>
                END
                <button onClick={restart} className={s.restartBtn}>restart</button>
            </div>
        </div>
    </>
}
export default App;
