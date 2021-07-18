import React, { useEffect, useRef, useState } from 'react';
import { Game } from './core';
import s from './App.module.css';

const game = new Game();

interface hero {
    type: 'grapeshot-hero' | 'lightning-hero' | 'sniper-hero' | 'boom-hero';
    name: string;
    price: number;
}

const grapeshot: hero = {
    type: 'grapeshot-hero',
    name: '霰弹',
    price: 220
}

const lightning: hero = {
    type: 'lightning-hero',
    name: '闪电',
    price: 200
}

const sniper: hero = {
    type: 'sniper-hero',
    name: '狙击',
    price: 150
}

const boom: hero = {
    type: 'boom-hero',
    name: '爆破手',
    price: 150
}

const createProduct: () => hero = () => {
    let r = Math.random();

    if (r < 0.25) {
        return grapeshot;
    } else if (r < 0.5) {
        return lightning;
    }  else if (r < 0.75) {
        return boom;
    } else {
        return sniper;
    }
}

const createProductList: () => hero[] = () => {
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
    const [productList, setProductList] = useState<(hero | null)[]>(createProductList());
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
        setProductList(createProductList());
        game.canvas = canvasRef.current;
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
                    <div style={{margin: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontSize: '18px', color: 'gray'}}>童叟无欺，合理消费</span>
                        <button onClick={() => {
                            const isRefreshSuccess = game.refreshHeroList();
                            if (isRefreshSuccess) {
                                setProductList(createProductList());
                            } else {
                                setShowShopError(true);
                            }
                        }}>刷新商品<span style={{color: 'red'}}>$10</span></button>
                    </div>
                    <ul className={s.shopList}>
                        {productList.map((p, i) => <li className={s.shopItem} key={i} onClick={() => {
                            if (!p) return;
                            let buySuccess = false;
                            switch (p.type) {
                                case 'grapeshot-hero':
                                    buySuccess = game.buyHero('grapeshot');
                                    break;
                                case 'boom-hero':
                                    buySuccess = game.buyHero('boom');
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
                            // setIsShopOpen(false);
                            let newProductList = [...productList];
                            newProductList[i] = null;
                            setProductList(newProductList);
                            setShowShopError(false);
                        }}>
                            {p?.name}
                            <div className={s.shopItemPrice}>
                                {p && `$${p.price}`}
                            </div>
                        </li>)}
                    </ul>
                    {showShopError && <div className={s.shopError}>
                        钱不够！！！！！！
                    </div>}
                </div>}
            </div>
            <div className={[s.gameEndBox, end ? s.end : ''].join(' ')}>
                {game.result === 'win' ? '恭喜🎉' : 'game over'}
                <button onClick={restart} className={s.restartBtn}>restart</button>
            </div>
            <div>
                {round === 'strategy' && <button className={s.startFighting} onClick={() => {
                    game.round = 'fighting';
                    setIsShopOpen(false);
                }}>开始阻击</button>}
            </div>
        </div>
    </>
}
export default App;
