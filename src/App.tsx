import React, { useEffect, useRef, useState } from 'react';
import { Game } from './core';
import s from './App.module.css';

const game = new Game();

const grapeshot = {
    type: 'grapeshot-hero',
    name: '霰弹',
    price: 300
}

const lightning = {
    type: 'lightning-hero',
    name: '闪电',
    price: 300
}

const sniper = {
    type: 'sniper-hero',
    name: '狙击手',
    price: 200
}

const createProduct = () => {
    let r = Math.random();

    if (r < 0.33) {
        return grapeshot;
    } else if (r < 0.66) {
        return lightning;
    } else {
        return sniper;
    }
}

const createProductList = () => {
    return [
        createProduct(),
        createProduct(),
        createProduct(),
        createProduct(),
        createProduct()
    ];
}

const App = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [end, setEnd] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [productList, setProductList] = useState(createProductList());
    const [showShopError, setShowShopError] = useState(false);
    const [round, setRound] = useState<'strategy' | 'fighting'>('strategy');

    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.width = game.width;
        canvasRef.current.height = game.height;
    }, [canvasRef]);

    useEffect(() => {
        game.setEnd = setEnd;
    }, [end]);

    useEffect(() => {
        game.setRound = setRound;
    }, [round]);

    useEffect(() => {
        game.canvas = canvasRef.current;
        game.render();
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
        game.canvas = canvasRef.current;
        // game.goFighting();
    }

    return <>
        <canvas ref={canvasRef} className={s.canvas}
            onClick={() => {
                setIsShopOpen(false);
                setShowShopError(false);
            }}
            onTouchStart={game.handleTouchStart.bind(game)}
            onMouseDown={game.handleCanvasMouseDown.bind(game)} />
        <div className={s.info}>
            <div>
                <button className={s.shopBtn} onClick={() => {
                    setIsShopOpen(!isShopOpen);
                    setShowShopError(false);
                }}>商店</button>
                {isShopOpen && <div className={s.shopBox}>
                    <ul className={s.shopList}>
                        {productList.map((p, i) => <li className={s.shopItem} key={i} onClick={() => {
                            let buySuccess = false;
                            switch (p.type) {
                                case 'grapeshot-hero':
                                    buySuccess = game.buyHero('grapeshot');
                                    break;
                                case 'sniper-hero':
                                    buySuccess = game.buyHero('sniper');
                                    break;
                                case 'lightning-hero':
                                default:
                                    buySuccess = game.buyHero('lightning');
                                    break;
                            }
                            if (!buySuccess) {
                                setShowShopError(true);
                                return;
                            }
                            setIsShopOpen(false);
                            setProductList(createProductList());
                            setShowShopError(false);
                        }}>
                            {p.name}
                            <div className={s.shopItemPrice}>
                                ${p.price}
                            </div>
                        </li>)}
                    </ul>
                    {showShopError && <div className={s.shopError}>
                        钱不够！！！！！！
                    </div>}
                </div>}
            </div>
            <div className={[s.gameEndBox, end ? s.end : ''].join(' ')}>
                END
                <button onClick={restart} className={s.restartBtn}>restart</button>
            </div>
            <div>
                {round === 'strategy' && <button className={s.startFighting} onClick={() => {
                    game.round = 'fighting';
                }}>结束回合</button>}
            </div>
        </div>
    </>
}
export default App;
