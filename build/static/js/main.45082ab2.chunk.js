(this["webpackJsonpd-game"]=this["webpackJsonpd-game"]||[]).push([[0],{19:function(e,t,i){},21:function(e,t,i){"use strict";i.r(t);var n=i(4),s=i.n(n),o=i(14),a=i.n(o),h=(i(19),i(3)),r=i(5),l=i(1),u=i(2),c=function(){function e(t,i,n){Object(l.a)(this,e),this.x=0,this.y=0,this.coordinate=void 0,this.x=t,this.y=i,this.coordinate=n}return Object(u.a)(e,[{key:"toNumber",value:function(){return[this.x+this.coordinate.origin[0],this.y+this.coordinate.origin[1]]}},{key:"plus",value:function(t,i){return new e(this.x+t,this.y+i,this.coordinate)}},{key:"lengthTo",value:function(e){var t=this.toNumber(),i=e.toNumber();return Math.pow(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2),.5)}}]),e}(),d=function(){function e(t,i){Object(l.a)(this,e),this.origin=[0,0],this.origin=[t,i]}return Object(u.a)(e,[{key:"resetOrigin",value:function(e){this.origin=e.toNumber()}},{key:"point",value:function(e,t){return new c(e,t,this)}},{key:"toPoint",value:function(e,t){return new c(e-this.origin[0],t-this.origin[1],this)}}]),e}(),f=function(e,t,i,n,s,o){i<2*s&&(s=i/2),n<2*s&&(s=n/2),o.beginPath(),o.moveTo(e+s,t),o.arcTo(e+i,t,e+i,t+n,s),o.arcTo(e+i,t+n,e,t+n,s),o.arcTo(e,t+n,e,t,s),o.arcTo(e,t,e+i,t,s),o.closePath(),o.stroke()},g=function(e,t,i){var n=e.toNumber(),s=Object(h.a)(n,2),o=s[0],a=s[1],l=t.toNumber(),u=Object(h.a)(l,2),c=u[0]-o,d=u[1]-a,f=e.lengthTo(t),g=c/f,v=d/f;i.strokeStyle="white",i.shadowColor="blue",i.shadowBlur=14,i.shadowOffsetX=0,i.shadowOffsetY=0,i.beginPath(),i.lineWidth=1,i.moveTo.apply(i,Object(r.a)(e.toNumber()));for(var m=1;m<5;m++){var p=e.plus(c/5*m,d/5*m),y=60*(Math.random()-.5);p=p.plus(y*v,y*g),i.lineTo.apply(i,Object(r.a)(p.toNumber()))}i.lineTo.apply(i,Object(r.a)(t.toNumber())),i.stroke(),i.closePath(),i.beginPath(),i.lineWidth=2,i.moveTo.apply(i,Object(r.a)(e.toNumber()));for(var S=1;S<5;S++){var b=e.plus(c/5*S,d/5*S),O=60*(Math.random()-.5);b=b.plus(O*v,O*g),i.lineTo.apply(i,Object(r.a)(b.toNumber()))}i.lineTo.apply(i,Object(r.a)(t.toNumber())),i.stroke(),i.closePath(),i.shadowBlur=0,i.lineWidth=1,i.strokeStyle="black"},v=function(){function e(t,i,n){Object(l.a)(this,e),this.value=0,this.size=20,this.point=void 0,this.game=void 0,this.value=t,this.game=n,this.point=new c(i,-this.size,n.coordinate)}return Object(u.a)(e,[{key:"go",value:function(){this.point.y+=.5}},{key:"hited",value:function(){this.value--,this.value<=0&&this.game.removeEnemy(this)}},{key:"render",value:function(e){var t=this.point.toNumber(),i=Object(h.a)(t,2),n=i[0],s=i[1];f(n,s,this.size,this.size,5,e),e.textAlign="center",e.fillText("".concat(this.value),n+this.size/2,s+13)}}]),e}(),m=/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent),p=function(){function e(){Object(l.a)(this,e),this.coordinate=new d(0,0),this.enemys=[],this.offStageHeros=[null,null,null,null,null,null,null,null,null],this.onStageHeros=[null,null,null,null,null,null,null,null,null],this.bullets=[],this.width=460,this.height=460*window.innerHeight/window.innerWidth,this.sizeRate=460/window.innerWidth,this.targetY=this.height-150,this.targetLineLeft=this.coordinate.point(0,this.targetY),this.targetLineRight=this.coordinate.point(this.width,this.targetY),this.offStageHeroY=this.height-70,this.onStageHeroY=this.height-120,this.heroPosList=[new c(55,this.offStageHeroY,this.coordinate),new c(95,this.offStageHeroY,this.coordinate),new c(135,this.offStageHeroY,this.coordinate),new c(175,this.offStageHeroY,this.coordinate),new c(215,this.offStageHeroY,this.coordinate),new c(255,this.offStageHeroY,this.coordinate),new c(295,this.offStageHeroY,this.coordinate),new c(335,this.offStageHeroY,this.coordinate),new c(375,this.offStageHeroY,this.coordinate),new c(55,this.onStageHeroY,this.coordinate),new c(95,this.onStageHeroY,this.coordinate),new c(135,this.onStageHeroY,this.coordinate),new c(175,this.onStageHeroY,this.coordinate),new c(215,this.onStageHeroY,this.coordinate),new c(255,this.onStageHeroY,this.coordinate),new c(295,this.onStageHeroY,this.coordinate),new c(335,this.onStageHeroY,this.coordinate),new c(375,this.onStageHeroY,this.coordinate)],this.cycle=60,this.step=0,this.setEnd=null,this.isMouseDown=!1,this.mouseSelectItem=null,this.mouseSelectItemType="off",this.mouseSelectItemIndex=0,this.mouseSelectItemPosition=[0,0],this.mouseSelectItemOffset=[0,0],this.go(),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this)}return Object(u.a)(e,[{key:"restart",value:function(){this.enemys=[],this.offStageHeros=[null,null,null,null,null,null,null,null,null],this.onStageHeros=[null,null,null,null,null,null,null,null,null],this.bullets=[],this.step=0,this.go()}},{key:"addEnemy",value:function(){for(var e=0;e<15;e++)this.enemys.push(new v(Math.ceil(this.step/300*Math.random()+1),30*e+10,this))}},{key:"removeBullet",value:function(e){this.bullets=this.bullets.filter((function(t){return t!==e}))}},{key:"removeEnemy",value:function(e){this.enemys=this.enemys.filter((function(t){return t!==e}))}},{key:"go",value:function(){this.step%this.cycle===0&&this.addEnemy(),this.enemys.forEach((function(e){e.go()})),this.onStageHeros.forEach((function(e){null===e||void 0===e||e.go()})),this.bullets.forEach((function(e){e.go()})),this.step++}},{key:"render",value:function(e){var t=this;if(e){var i=e.getContext("2d");if(i){this.go(),i.clearRect(0,0,e.width,e.height),i.strokeRect.apply(i,Object(r.a)(this.coordinate.origin).concat([this.width,this.height])),this.isMouseDown&&(i.beginPath(),i.strokeStyle="red",this.heroPosList.forEach((function(e){f.apply(void 0,Object(r.a)(e.plus(8,8).toNumber()).concat([14,14,5,i]))})),i.strokeStyle="black",i.closePath()),i.beginPath(),this.offStageHeros.forEach((function(e){null===e||void 0===e||e.render(i)})),this.onStageHeros.forEach((function(e){null===e||void 0===e||e.render(i)})),i.closePath();var n=!1;this.enemys.forEach((function(e){e.render(i),e.point.y>=t.targetY-e.size&&(n=!0)})),i.beginPath(),i.moveTo.apply(i,Object(r.a)(this.targetLineLeft.toNumber())),i.lineTo.apply(i,Object(r.a)(this.targetLineRight.toNumber())),i.stroke(),i.closePath(),i.beginPath(),this.bullets.forEach((function(e){e.render(i)})),i.closePath(),this.mouseSelectItem&&(this.mouseSelectItem.render(i,[this.mouseSelectItemPosition[0]+this.mouseSelectItemOffset[0],this.mouseSelectItemPosition[1]+this.mouseSelectItemOffset[1]]),m&&(i.putImageData(i.getImageData(0,this.targetY,this.width,150),0,this.targetY-150),i.rect(0,this.targetY-150,this.width,150),i.stroke())),n?this.setEnd&&this.setEnd(!0):requestAnimationFrame((function(){t.render(e)}))}}}},{key:"addOffStageHero",value:function(e,t){if(void 0===t&&this.offStageHeros.some((function(e,i){return null===e&&(t=i,!0)})),void 0!==t&&(this.offStageHeros[t]=e,e)){if(e.point.y=this.offStageHeroY,e.point.x=55+40*t,e.addToOffStage(t),e.level>=3)return;var i=[];this.offStageHeros.forEach((function(t,n){(null===t||void 0===t?void 0:t.type)===e.type&&e.level===t.level&&i.push(n)})),i.length>=3&&(this.addOffStageHero(null,i[0]),this.addOffStageHero(null,i[1]),this.offStageHeros[i[2]].level+=1,this.addOffStageHero(this.offStageHeros[i[2]],i[2]))}}},{key:"addOnStageHero",value:function(e,t){if(void 0===t&&this.onStageHeros.some((function(e,i){return null===e&&(t=i,!0)})),void 0!==t&&(this.onStageHeros[t]=e,e)){if(e.point.y=this.onStageHeroY,e.point.x=55+40*t,e.level>=3)return;var i=[];this.onStageHeros.forEach((function(t,n){(null===t||void 0===t?void 0:t.type)===e.type&&e.level===t.level&&i.push(n)})),i.length>=3&&(this.addOnStageHero(null,i[0]),this.addOnStageHero(null,i[1]),this.onStageHeros[i[2]].level+=1,this.addOnStageHero(this.onStageHeros[i[2]],i[2]))}}},{key:"handleCanvasMouseDown",value:function(e){this.isMouseDown=!0;var t=this.findHero(this.offStageHeros,e.clientX,e.clientY,"off"),i=this.findHero(this.onStageHeros,e.clientX,e.clientY,"on");(t||i)&&window.addEventListener("mousemove",this.handleMouseMove)}},{key:"handleTouchStart",value:function(e){(e.stopPropagation(),e.preventDefault(),this.isMouseDown=!0,this.findHero(this.offStageHeros,e.touches[0].clientX,e.touches[0].clientY,"off"))?window.addEventListener("touchmove",this.handleTouchMove,{passive:!1}):this.findHero(this.onStageHeros,e.touches[0].clientX,e.touches[0].clientY,"on")&&window.addEventListener("touchmove",this.handleTouchMove,{passive:!1})}},{key:"findHero",value:function(e,t,i,n){var s=this,o=e.findIndex((function(e){if(!e)return!1;var n=e.isPointIn(t*s.sizeRate,i*s.sizeRate);if(n){var o=e.point.toNumber();s.mouseSelectItemOffset=[o[0]-t*s.sizeRate,o[1]-i*s.sizeRate]}return n}));return-1!==o&&(this.mouseSelectItem=e[o],this.mouseSelectItemType=n,this.mouseSelectItemIndex=o,this.mouseSelectItemPosition=[t*this.sizeRate,i*this.sizeRate],!0)}},{key:"handleMouseUp",value:function(e){window.removeEventListener("mousemove",this.handleMouseMove),this.handleEventEnd(e.clientX,e.clientY)}},{key:"handleTouchEnd",value:function(e){window.removeEventListener("touchmove",this.handleTouchMove),this.handleEventEnd(e.changedTouches[0].clientX,e.changedTouches[0].clientY)}},{key:"handleEventEnd",value:function(e,t){var i=[e*this.sizeRate+this.mouseSelectItemOffset[0],t*this.sizeRate+this.mouseSelectItemOffset[1]],n=[i[0]+30,i[1]+30],s=this.heroPosList.findIndex((function(e){var t=e.toNumber();return i[0]>t[0]-18&&i[1]>t[1]-18&&n[0]<t[0]+48&&n[1]<t[1]+48}));if(-1!==s&&this.mouseSelectItem)if(0===Math.floor(s/9)){var o=s%9,a=this.offStageHeros[o];this.offStageHeros[o]=null,"on"===this.mouseSelectItemType?this.onStageHeros[this.mouseSelectItemIndex]=null:this.offStageHeros[this.mouseSelectItemIndex]=null,this.addOffStageHero(this.mouseSelectItem,o),"on"===this.mouseSelectItemType?this.addOnStageHero(a,this.mouseSelectItemIndex):this.addOffStageHero(a,this.mouseSelectItemIndex)}else{var h=s%9,r=this.onStageHeros[h];this.onStageHeros[h]=null,"on"===this.mouseSelectItemType?this.onStageHeros[this.mouseSelectItemIndex]=null:this.offStageHeros[this.mouseSelectItemIndex]=null,this.addOnStageHero(this.mouseSelectItem,h),"on"===this.mouseSelectItemType?this.addOnStageHero(r,this.mouseSelectItemIndex):this.addOffStageHero(r,this.mouseSelectItemIndex)}this.isMouseDown=!1,this.mouseSelectItem=null}},{key:"handleMouseMove",value:function(e){this.handleMove(e.clientX,e.clientY)}},{key:"handleTouchMove",value:function(e){e.preventDefault(),e.stopPropagation(),this.handleMove(e.changedTouches[0].clientX,e.changedTouches[0].clientY)}},{key:"handleMove",value:function(e,t){this.mouseSelectItemPosition=[e*this.sizeRate,t*this.sizeRate]}}]),e}(),y=i(6),S=i.n(y),b=i(13),O=i(7),w=i(11),j=i(10),H=function(){function e(t){Object(l.a)(this,e),this.point=void 0,this.level=1,this.color="blue",this.type="hero",this.step=0,this.game=void 0,this.game=t,this.point=new c(0,0,t.coordinate)}return Object(u.a)(e,[{key:"size",get:function(){switch(this.level){case 1:case 2:return 30;default:case 3:return 30}}},{key:"go",value:function(){this.step++}},{key:"render",value:function(e,t){var i=t||this.point.toNumber(),n=Object(h.a)(i,2),s=n[0],o=n[1];e.strokeStyle=this.color,f(s,o,this.size,this.size,5,e),e.strokeStyle="black",e.fillStyle="white",e.fill(),e.fillStyle=this.color,e.textAlign="center",e.fillText("".concat(this.level),s+this.size/2,o+18),e.fillStyle="black"}},{key:"isPointIn",value:function(e,t){var i=this.point.toNumber(),n=Object(h.a)(i,2),s=n[0],o=n[1];return e>=s-10&&e<=s+this.size+10&&t>=o-10&&t<=o+this.size+10}},{key:"addToOffStage",value:function(e){}}]),e}(),k=function(e){Object(w.a)(i,e);var t=Object(j.a)(i);function i(){var e;Object(l.a)(this,i);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).type="lightning-hero",e.targets={length:0,chain:null,end:null},e}return Object(u.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 5;case 2:return 4;default:case 3:return 3}}},{key:"targetMaxLength",get:function(){switch(this.level){case 1:return 2;case 2:return 3;default:case 3:return 5}}},{key:"go",value:function(){if(this.targets.length<this.targetMaxLength&&this.game.enemys.length>=this.targetMaxLength){for(var e=this.targetMaxLength-this.targets.length;0!==e;){var t=this.game.enemys.length,i=Math.floor(t*Math.random());if(this.targets.chain)this.addTarget({value:this.game.enemys[i],next:null})&&e--;else this.addTarget({value:this.game.enemys[i],next:null}),e--}this.targets.length=this.targetMaxLength}if(this.step%this.cycle===0){for(var n=this.targets.chain;n;)n.value.hited(),n=n.next;if(!(n=this.targets.chain))return;if(n.value.value<=0)this.targets.length=0,this.targets.chain=null,this.targets.end=null;else{var s=n;n=n.next;for(var o=1;n;){if(n.value.value<=0){s.next=null,this.targets.length=o,this.targets.end=s;break}s=n,n=n.next,o++}}}this.step++}},{key:"render",value:function(e,t){if(Object(b.a)(Object(O.a)(i.prototype),"render",this).call(this,e,t),this.targets.chain)for(var n=this.targets.chain,s=this.point.plus(this.size/2,0);n;){var o=n.value.point.plus(n.value.size/2,n.value.size/2);g(s,o,e),s=n.value.point.plus(n.value.size/2,n.value.size/2),n=n.next}}},{key:"addTarget",value:function(e){if(null===this.targets.end)this.targets.chain=e,this.targets.end=e,this.targets.length++;else{for(var t=this.targets.chain;t;){if(e===t)return!1;t=t.next}this.targets.end.next=e,this.targets.end=this.targets.end.next,this.targets.length++}return!0}},{key:"addToOffStage",value:function(e){Object(b.a)(Object(O.a)(i.prototype),"addToOffStage",this).call(this,e),this.targets={length:0,chain:null,end:null}}}]),i}(H),x=function(){function e(t,i,n){Object(l.a)(this,e),this.point=void 0,this.game=void 0,this.size=2,this.direction=0,this.point=t,this.direction=i,this.game=n}return Object(u.a)(e,[{key:"go",value:function(){for(var e=this,t=0;t<30;t++){if(this.point.y-=Math.cos(this.direction),this.point.x+=Math.sin(this.direction),this.game.enemys.some((function(t){return e.point.x>=t.point.x-2&&e.point.y>=t.point.y-2&&e.point.x<=t.point.x+t.size+2&&e.point.y<=t.point.y+t.size+2&&(t.hited(),e.game.removeBullet(e),!0)})))return}(this.point.y<0||this.point.y>this.game.height||this.point.x<0||this.point.x>this.game.width)&&this.game.removeBullet(this)}},{key:"render",value:function(e){var t=this.point.toNumber(),i=Object(h.a)(t,2),n=i[0],s=i[1];e.beginPath(),e.arc(n,s,this.size,0,2*Math.PI),e.closePath(),e.fill()}}]),e}(),I=function(e){Object(w.a)(i,e);var t=Object(j.a)(i);function i(){var e;Object(l.a)(this,i);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).type="grapeshot-hero",e.color="black",e.angle=0,e.angleCycle=40,e}return Object(u.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 3;case 2:return 2;default:case 3:return 1}}},{key:"go",value:function(){if(this.step%this.cycle===0)for(var e=0;e<5;e++)this.game.bullets.push(new x(this.point.plus(this.size/2,0),.4*Math.PI*(Math.random()-.5),this.game));this.step++}}]),i}(H),M=i(0),T=new p,E={type:"grapeshot-hero",name:"\u9730\u5f39"},Y={type:"lightning-hero",name:"\u95ea\u7535"},P=function(){return[Math.random()>.5?E:Y,Math.random()>.5?E:Y,Math.random()>.5?E:Y,Math.random()>.5?E:Y,Math.random()>.5?E:Y]},z=function(){var e=Object(n.useRef)(null),t=Object(n.useState)(!1),i=Object(h.a)(t,2),s=i[0],o=i[1],a=Object(n.useState)(!1),r=Object(h.a)(a,2),l=r[0],u=r[1],c=Object(n.useState)(P()),d=Object(h.a)(c,2),f=d[0],g=d[1];return Object(n.useEffect)((function(){e.current&&(e.current.width=T.width,e.current.height=T.height)}),[e]),Object(n.useEffect)((function(){T.setEnd=o}),[s]),Object(n.useEffect)((function(){T.render(e.current)}),[e]),Object(n.useEffect)((function(){var e=T.handleMouseUp.bind(T),t=T.handleTouchEnd.bind(T);return window.addEventListener("mouseup",e),window.addEventListener("touchend",t),function(){window.removeEventListener("mouseup",e),window.removeEventListener("touchend",t)}}),[]),Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)("canvas",{ref:e,className:S.a.canvas,onTouchStart:T.handleTouchStart.bind(T),onMouseDown:T.handleCanvasMouseDown.bind(T)}),Object(M.jsxs)("div",{className:S.a.info,children:[Object(M.jsxs)("div",{children:[Object(M.jsx)("button",{className:S.a.shopBtn,onClick:function(){return u(!l)},children:"\u5546\u5e97"}),l&&Object(M.jsx)("div",{className:S.a.shopBox,children:Object(M.jsx)("ul",{className:S.a.shopList,children:f.map((function(e,t){return Object(M.jsx)("li",{className:S.a.shopItem,onClick:function(){switch(e.type){case"grapeshot-hero":T.addOffStageHero(new I(T));break;case"lightning-hero":default:T.addOffStageHero(new k(T))}u(!1),g(P())},children:e.name},t)}))})})]}),Object(M.jsxs)("div",{className:[S.a.gameEndBox,s?S.a.end:""].join(" "),children:["END",Object(M.jsx)("button",{onClick:function(){T.restart(),o(!1),T.render(e.current)},className:S.a.restartBtn,children:"restart"})]})]})]})},N=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,22)).then((function(t){var i=t.getCLS,n=t.getFID,s=t.getFCP,o=t.getLCP,a=t.getTTFB;i(e),n(e),s(e),o(e),a(e)}))};a.a.render(Object(M.jsx)(s.a.StrictMode,{children:Object(M.jsx)(z,{})}),document.getElementById("root")),N()},6:function(e,t,i){e.exports={canvas:"App_canvas__1KgDx",info:"App_info__3tKmE",gameEndBox:"App_gameEndBox__e2Cnq",end:"App_end__3t3U7",restartBtn:"App_restartBtn__2M1an",shopBtn:"App_shopBtn__1GjVz",shopBox:"App_shopBox__ApMbX",shopList:"App_shopList__2OMys",shopItem:"App_shopItem__2UEyj"}}},[[21,1,2]]]);
//# sourceMappingURL=main.45082ab2.chunk.js.map