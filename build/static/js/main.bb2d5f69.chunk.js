(this["webpackJsonpd-game"]=this["webpackJsonpd-game"]||[]).push([[0],{10:function(e,t,i){e.exports={canvas:"App_canvas__1KgDx",info:"App_info__3tKmE",gameEndBox:"App_gameEndBox__e2Cnq",end:"App_end__3t3U7",restartBtn:"App_restartBtn__2M1an",shopBtn:"App_shopBtn__1GjVz",shopBox:"App_shopBox__ApMbX",shopList:"App_shopList__2OMys",shopItem:"App_shopItem__2UEyj",shopItemPrice:"App_shopItemPrice__19Ocx",shopError:"App_shopError__12I5k",startFighting:"App_startFighting__ner9a"}},19:function(e,t,i){},21:function(e,t,i){"use strict";i.r(t);var s=i(8),n=i.n(s),a=i(14),o=i.n(a),r=(i(19),i(0)),h=i(4),l=i(1),c=i(2),u=function(){function e(t,i,s){Object(l.a)(this,e),this.x=0,this.y=0,this.coordinate=void 0,this.x=t,this.y=i,this.coordinate=s}return Object(c.a)(e,[{key:"toNumber",value:function(){return[this.x+this.coordinate.origin[0],this.y+this.coordinate.origin[1]]}},{key:"plus",value:function(t,i){return new e(this.x+t,this.y+i,this.coordinate)}},{key:"lengthTo",value:function(e){var t=this.toNumber(),i=e.toNumber();return Math.pow(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2),.5)}}]),e}(),d=function(){function e(t,i){Object(l.a)(this,e),this.origin=[0,0],this.origin=[t,i]}return Object(c.a)(e,[{key:"resetOrigin",value:function(e){this.origin=e.toNumber()}},{key:"point",value:function(e,t){return new u(e,t,this)}},{key:"toPoint",value:function(e,t){return new u(e-this.origin[0],t-this.origin[1],this)}}]),e}(),g=function(){function e(){Object(l.a)(this,e),this.array=[],this.matrix=[],this.set=new Set}return Object(c.a)(e,[{key:"reset",value:function(){this.array=[],this.matrix=[],this.set=new Set}},{key:"removeEnemy",value:function(e){this.set.delete(e),this.array=this.array.map((function(t){return t===e?null:t})),this.matrix=this.matrix.map((function(t){return t.map((function(t){return t===e?null:t}))}))}},{key:"forEach",value:function(e){this.set.forEach(e)}},{key:"some",value:function(e){return this.array.some(e)}},{key:"filter",value:function(e){return this.array.filter(e)}},{key:"push",value:function(){for(var e,t=this,i=arguments.length,s=new Array(i),n=0;n<i;n++)s[n]=arguments[n];return s.forEach((function(e,i){e.x=i,e.y=t.matrix.length,t.set.add(e)})),this.matrix.push(s),(e=this.array).push.apply(e,s)}},{key:"length",get:function(){return this.set.size}},{key:"get",value:function(e){return this.array[e]}},{key:"getRandomEnemy",value:function(){for(var e=0,t=Math.floor(Math.random()*this.length),i=this.set.keys(),s=i.next().value;e!==t;)s=i.next().value,e++;return s}},{key:"findEnemysAroundEnemy",value:function(e,t){var i=[];switch(t){case 1:i.push(this.matrix[e.y][e.x]),i.push(this.matrix[e.y][e.x-1]),i.push(this.matrix[e.y][e.x+1]),i.push((this.matrix[e.y-1]||[])[e.x]),i.push((this.matrix[e.y+1]||[])[e.x]);break;case 2:case 3:default:i.push(this.matrix[e.y][e.x]),i.push(this.matrix[e.y][e.x-1]),i.push(this.matrix[e.y][e.x+1]),i.push((this.matrix[e.y-1]||[])[e.x]),i.push((this.matrix[e.y+1]||[])[e.x]),i.push(this.matrix[e.y][e.x-2]),i.push(this.matrix[e.y][e.x+2]),i.push((this.matrix[e.y-2]||[])[e.x]),i.push((this.matrix[e.y+2]||[])[e.x]),i.push((this.matrix[e.y-1]||[])[e.x-1]),i.push((this.matrix[e.y+1]||[])[e.x+1]),i.push((this.matrix[e.y-1]||[])[e.x+1]),i.push((this.matrix[e.y+1]||[])[e.x-1]),i.push((this.matrix[e.y-2]||[])[e.x-1]),i.push((this.matrix[e.y-2]||[])[e.x+1]),i.push((this.matrix[e.y+2]||[])[e.x-1]),i.push((this.matrix[e.y+2]||[])[e.x+1]),i.push((this.matrix[e.y-1]||[])[e.x-2]),i.push((this.matrix[e.y-1]||[])[e.x+2]),i.push((this.matrix[e.y+1]||[])[e.x-2]),i.push((this.matrix[e.y+1]||[])[e.x+2])}return i.filter(Boolean)}},{key:"findEnemyByPoint",value:function(e){if((e.x-8)%30>24)return null;var t=Math.floor((e.x-10)/30);if(t<0||t>14)return null;var i=null;return this.matrix.some((function(s){var n=s[t];return!!n&&(n.point.y+n.size+2<e.y||n.point.y-2<=e.y&&(i=n,!0))})),i}},{key:"findEnemyByY",value:function(e){var t=[];return this.matrix.some((function(i){var s=!1;return i.some((function(i){return!!i&&(i.point.y+i.size<e||(!(i.point.y<=e)||(t.push(i),s=!0,!1)))})),s})),t}}]),e}(),f=i(9),m=i(5),p=i(7),y=i(6),v=function(e,t,i,s,n,a){i<2*n&&(n=i/2),s<2*n&&(n=s/2),a.beginPath(),a.moveTo(e+n,t),a.arcTo(e+i,t,e+i,t+s,n),a.arcTo(e+i,t+s,e,t+s,n),a.arcTo(e,t+s,e,t,n),a.arcTo(e,t,e+i,t,n),a.closePath(),a.stroke()},b=function(e,t,i,s,n){var a=e.toNumber(),o=Object(h.a)(a,2),l=o[0],c=o[1],u=t.toNumber(),d=Object(h.a)(u,2),g=d[0]-l,f=d[1]-c,m=e.lengthTo(t),p=g/m,y=f/m;i.strokeStyle=s||"white",i.shadowColor=n||"blue",i.shadowBlur=14,i.shadowOffsetX=0,i.shadowOffsetY=0,i.beginPath(),i.lineWidth=1,i.moveTo.apply(i,Object(r.a)(e.toNumber()));for(var v=1;v<5;v++){var b=e.plus(g/5*v,f/5*v),S=60*(Math.random()-.5);b=b.plus(S*y,S*p),i.lineTo.apply(i,Object(r.a)(b.toNumber()))}i.lineTo.apply(i,Object(r.a)(t.toNumber())),i.stroke(),i.closePath(),i.beginPath(),i.lineWidth=2,i.moveTo.apply(i,Object(r.a)(e.toNumber()));for(var k=1;k<5;k++){var O=e.plus(g/5*k,f/5*k),w=60*(Math.random()-.5);O=O.plus(w*y,w*p),i.lineTo.apply(i,Object(r.a)(O.toNumber()))}i.lineTo.apply(i,Object(r.a)(t.toNumber())),i.stroke(),i.closePath(),i.shadowBlur=0,i.lineWidth=1,i.strokeStyle="black"},S=function(){function e(t){Object(l.a)(this,e),this.point=void 0,this.level=1,this.color="blue",this.type="hero",this.step=0,this.killNumber=0,this.game=void 0,this.game=t,this.point=new u(0,0,t.coordinate)}return Object(c.a)(e,[{key:"size",get:function(){switch(this.level){case 1:case 2:return 30;default:case 3:return 30}}},{key:"addKillNumber",value:function(){this.killNumber++,this.killNumber>=100&&(this.killNumber=0,this.startSpecialMove())}},{key:"startSpecialMove",value:function(){}},{key:"go",value:function(){this.step++}},{key:"render",value:function(e,t){var i=t||this.point.toNumber(),s=Object(h.a)(i,2),n=s[0],a=s[1];e.strokeStyle=this.color,v(n,a,this.size,this.size,5,e),e.strokeStyle="black",e.fillStyle="white",e.fill(),e.fillStyle=this.color,e.textAlign="center",e.fillText("".concat(this.level),n+this.size/2,a+18),e.fillStyle="green",e.strokeStyle="green",v(n+1,a+this.size+3,this.killNumber/100*(this.size-2),2,1,e),e.fill(),e.strokeStyle="black",e.fillStyle="white",e.fillStyle="black"}},{key:"isPointIn",value:function(e,t){var i=this.point.toNumber(),s=Object(h.a)(i,2),n=s[0],a=s[1];return e>=n-10&&e<=n+this.size+10&&t>=a-10&&t<=a+this.size+10}},{key:"addToOffStage",value:function(e){}}]),e}(),k=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,[{key:"go",value:function(){}},{key:"render",value:function(e){}}]),e}(),O=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(e,s,n,a,o){var r,h=o.speed,c=o.color,u=o.ATK,d=o.size;return Object(l.a)(this,i),(r=t.call(this)).point=void 0,r.game=void 0,r.size=2,r.direction=0,r.speed=30,r.color="black",r.ATK=1,r.isEnd=!1,r.hero=void 0,r.point=e,r.direction=s,r.game=n,r.hero=a,h&&(r.speed=h),c&&(r.color=c),u&&(r.ATK=u),d&&(r.size=d),r}return Object(c.a)(i,[{key:"go",value:function(){for(var e=0;e<5*this.speed;e++){this.point.y-=Math.cos(this.direction),this.point.x+=Math.sin(this.direction);var t=this.game.enemySet.findEnemyByPoint(this.point);if(t)return t.hited(this.ATK)&&this.hero.addKillNumber(),this.game.removeBullet(this),void(this.isEnd=!0)}(this.point.y<0||this.point.y>this.game.height||this.point.x<0||this.point.x>this.game.width)&&this.game.removeBullet(this)}},{key:"render",value:function(e){var t=this.point.toNumber(),i=Object(h.a)(t,2),s=i[0],n=i[1];e.beginPath(),e.moveTo(s,n),e.lineTo(s-Math.sin(this.direction)*this.speed,n+Math.cos(this.direction)*this.speed);var a=e.createLinearGradient(s,n,s-Math.sin(this.direction)*this.speed,n+Math.cos(this.direction)*this.speed);a.addColorStop(0,this.color),a.addColorStop(1,"white"),e.lineWidth=this.size,e.strokeStyle=a,e.stroke(),e.closePath(),e.strokeStyle="black",e.lineWidth=1}}]),i}(k),w=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(e,s,n,a,o){var r,h=o.color;return Object(l.a)(this,i),(r=t.call(this)).enemy=void 0,r.game=void 0,r.hero=void 0,r.life=20,r.isBoomed=!1,r.ATK=0,r.color=null,r.ATK=e,r.enemy=s,r.game=n,r.hero=a,h&&(r.color=h),r}return Object(c.a)(i,[{key:"boundary",get:function(){switch(this.hero.level){case 1:return 28;case 2:return 38;case 3:default:return 38}}},{key:"go",value:function(){var e=this;(this.life<=0&&this.game.removeBullet(this),this.isBoomed)||(this.game.enemySet.findEnemysAroundEnemy(this.enemy,this.hero.level).forEach((function(t){t.hited(e.ATK)&&e.hero.addKillNumber()})),this.isBoomed=!0);this.life--}},{key:"render",value:function(e){var t=Math.pow(this.life,3)/1600;e.beginPath(),e.fillStyle="rgba(".concat(this.color||"153, 153, 153",", ").concat(t/5,")"),e.arc.apply(e,Object(r.a)(this.enemy.point.toNumber()).concat([this.boundary-t,0,2*Math.PI])),e.fill(),e.closePath(),e.fillStyle="white"}}]),i}(k),j=function(){function e(t,i){Object(l.a)(this,e),this.ATK=0,this.hero=void 0,this.ATK=t,this.hero=i}return Object(c.a)(e,[{key:"beforeDestory",value:function(e,t){e.game.bullets.push(new w(this.ATK,e,e.game,this.hero,{color:t}))}},{key:"go",value:function(){}},{key:"render",value:function(e,t){var i=t.point.plus(t.size-2,2).toNumber();e.beginPath(),e.moveTo.apply(e,Object(r.a)(i)),e.arc.apply(e,Object(r.a)(i).concat([4,0,.5*Math.PI])),e.fill(),e.moveTo.apply(e,Object(r.a)(i)),e.arc.apply(e,Object(r.a)(i).concat([4,1*Math.PI,1.5*Math.PI])),e.fill(),e.moveTo.apply(e,Object(r.a)(i)),e.arc.apply(e,Object(r.a)(i).concat([4,0,2*Math.PI])),e.stroke(),e.closePath()}}]),e}(),x=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(){var e;Object(l.a)(this,i);for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))).type="boom-hero",e.target=null,e.damage=0,e.color="red",e.nullHero=new S(e.game),e}return Object(c.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 3;case 2:return 2;default:case 3:return 1}}},{key:"go",value:function(){if(!this.target){var e=this.game.enemySet.filter((function(e){return!(!e||e.isPickedByBoom)}));if(0===e.length)return Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this);var t=e[Math.floor(Math.random()*e.length)];this.target=t,this.target.isPickedByBoom=!0}if(this.step%this.cycle!==0)return Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this);this.damage<this.target.value?this.damage+=1:(this.target.addHook(new j(this.damage,this)),this.damage=0,this.target.isPicked=!1,this.target=null),Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this)}},{key:"startSpecialMove",value:function(){this.game.enemySet.filter((function(e){return!(!e||!e.isPickedByBoom)})).forEach((function(e){null===e||void 0===e||e.hooks.forEach((function(t){t instanceof j&&t.beforeDestory(e,[0,153,153])}))}))}},{key:"render",value:function(e,t){Object(f.a)(Object(m.a)(i.prototype),"render",this).call(this,e,t),this.target&&this.renderTarget(e,this.target,this.target.value-this.damage>0?(this.target.value-this.damage)/this.target.value:1)}},{key:"renderTarget",value:function(e,t,i){if(!(t.value<=0)){var s=t.point.plus(t.size/2,t.size/2).toNumber(),n=this.point.plus(this.size/2,0).toNumber(),a=(s[0]-n[0])/(s[1]-n[1]),o=[0,0],h=[(o=Math.abs(a)>1?t.point.plus(t.size/2,t.size/2).plus(s[0]>n[0]?-t.size/2:t.size/2,t.size/2/a).toNumber():t.point.plus(t.size/2,t.size/2).plus(t.size/2*a,s[1]>n[1]?-t.size/2:t.size/2).toNumber())[0]+(n[0]-o[0])*i,o[1]+(n[1]-o[1])*i];e.strokeStyle="red",e.lineWidth=1,e.setLineDash([4,4]),e.beginPath(),v.apply(void 0,Object(r.a)(t.point.plus(-2,-2).toNumber()).concat([t.size+4,t.size+4,6,e])),e.moveTo.apply(e,Object(r.a)(o)),e.lineTo.apply(e,h),e.stroke(),e.closePath(),e.beginPath(),e.setLineDash([]),e.moveTo.apply(e,h),e.lineTo.apply(e,Object(r.a)(n)),e.stroke(),e.closePath(),e.strokeStyle="black",e.lineWidth=1,e.setLineDash([])}}}]),i}(S),H=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(){var e;Object(l.a)(this,i);for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))).type="grapeshot-hero",e.color="black",e.specialLength=0,e.nullHero=new S(e.game),e}return Object(c.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 5;case 2:return 3;default:case 3:return 1}}},{key:"bulletNumber",get:function(){switch(this.level){case 1:return 5;case 2:return 6;default:case 3:return 7}}},{key:"ATK",get:function(){switch(this.level){case 1:return 1;case 2:return 2;default:case 3:return 3}}},{key:"bulletSize",get:function(){switch(this.level){case 1:return 1;case 2:return 2;default:case 3:return 3}}},{key:"bulletColor",get:function(){switch(this.level){case 1:return"black";case 2:return"blue";default:case 3:return"red"}}},{key:"go",value:function(){if(this.step%this.cycle===0&&this.game.enemySet.length>0)for(var e=0;e<this.bulletNumber;e++)this.game.bullets.push(new O(this.point.plus(this.size/2,0),.4*Math.PI*(Math.random()-.5),this.game,this,{speed:30+Math.floor(30*Math.random()),color:this.bulletColor,ATK:this.ATK,size:this.bulletSize}));if(0!==this.specialLength){if(this.specialLength%3===0)for(var t=0;t<15;t++)this.game.bullets.push(new O(new u(30*t+10,this.game.targetY,this.game.coordinate),0,this.game,this.nullHero,{speed:30+Math.floor(30*Math.random()),color:this.bulletColor,ATK:this.ATK,size:this.bulletSize}));this.specialLength--}this.step++}},{key:"startSpecialMove",value:function(){this.specialLength=200}}]),i}(S),P=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(e,s){var n;return Object(l.a)(this,i),(n=t.call(this)).game=void 0,n.hero=void 0,n.y=0,n.game=e,n.hero=s,n.y=n.game.targetY,n}return Object(c.a)(i,[{key:"speed",get:function(){switch(this.hero.level){case 1:return 5;case 2:return 3;case 3:default:return 1}}},{key:"ATK",get:function(){switch(this.hero.level){case 1:return 1;case 2:return 2;case 3:default:return 3}}},{key:"go",value:function(){var e=this;this.y-=this.speed,this.game.enemySet.findEnemyByY(this.y).forEach((function(t){t.hited(e.ATK)})),(this.y<=0||this.game.stage[this.game.stageNumber].isEnd&&0===this.game.enemySet.length)&&this.game.removeBullet(this)}},{key:"render",value:function(e){b(new u(0,this.y,this.game.coordinate),new u(this.game.width,this.y,this.game.coordinate),e,this.hero._color,this.hero._lightColor)}}]),i}(k),T=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(){var e;Object(l.a)(this,i);for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))).type="lightning-hero",e.targets={length:0,chain:null,end:null},e}return Object(c.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 3;case 2:return 2;default:case 3:return 1}}},{key:"_color",get:function(){switch(this.level){case 1:case 2:return"white";default:case 3:return"black"}}},{key:"_lightColor",get:function(){switch(this.level){case 1:return"blue";case 2:return"red";default:case 3:return"red"}}},{key:"targetMaxLength",get:function(){switch(this.level){case 1:return 2;case 2:return 3;default:case 3:return 5}}},{key:"ATK",get:function(){switch(this.level){case 1:return 1;case 2:return 2;default:case 3:return 3}}},{key:"go",value:function(){if(this.targets.length<this.targetMaxLength&&this.game.enemySet.length>0){for(var e=this.game.enemySet.length>=this.targetMaxLength?this.targetMaxLength:this.game.enemySet.length,t=e-this.targets.length;t>0;){if(this.targets.chain)this.addTarget({value:this.game.enemySet.getRandomEnemy(),next:null})&&t--;else this.addTarget({value:this.game.enemySet.getRandomEnemy(),next:null}),t--}this.targets.length=e}if(this.step%this.cycle===0){for(var i=this.targets.chain;i;){if(i.value.value>0)i.value.hited(this.ATK)&&this.addKillNumber();i=i.next}if(!(i=this.targets.chain))return;if(i.value.value<=0)this.targets.length=0,this.targets.chain=null,this.targets.end=null;else{var s=i;i=i.next;for(var n=1;i;){if(i.value.value<=0){s.next=null,this.targets.length=n,this.targets.end=s;break}s=i,i=i.next,n++}}}this.step++}},{key:"render",value:function(e,t){if(Object(f.a)(Object(m.a)(i.prototype),"render",this).call(this,e,t),this.targets.chain)for(var s=this.targets.chain,n=this.point.plus(this.size/2,0);s;){var a=s.value.point.plus(s.value.size/2,s.value.size/2);b(n,a,e,this._color,this._lightColor),n=s.value.point.plus(s.value.size/2,s.value.size/2),s=s.next}}},{key:"startSpecialMove",value:function(){this.game.bullets.push(new P(this.game,this))}},{key:"addTarget",value:function(e){if(null===this.targets.end)this.targets.chain=e,this.targets.end=e,this.targets.length++;else{for(var t=this.targets.chain;t;){if(e.value===t.value)return!1;t=t.next}this.targets.end.next=e,this.targets.end=this.targets.end.next,this.targets.length++}return!0}},{key:"addToOffStage",value:function(e){Object(f.a)(Object(m.a)(i.prototype),"addToOffStage",this).call(this,e),this.targets={length:0,chain:null,end:null}}}]),i}(S),E=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(e,s,n,a,o){var r,h=o.speed,c=o.color,u=o.damage;Object(l.a)(this,i),(r=t.call(this)).point=void 0,r.startPoint=void 0,r.targetPoint=void 0,r.game=void 0,r.hero=void 0,r.damage=0,r.harmdEnemy=new Set,r.sin=0,r.cos=0,r.speed=30,r.color="black",r.size=3,r.game=e,r.hero=s,r.startPoint=n,r.point=n.plus(0,0),r.targetPoint=a,h&&(r.speed=h),c&&(r.color=c),r.damage=u;var d=r.targetPoint.y-r.startPoint.y,g=r.targetPoint.x-r.startPoint.x,f=Math.pow(Math.pow(d,2)+Math.pow(g,2),.5);return r.sin=g/f,r.cos=-d/f,r}return Object(c.a)(i,[{key:"go",value:function(){for(var e=0;e<5*this.speed;e++){this.point.y+=-this.cos,this.point.x+=this.sin;var t=this.game.enemySet.findEnemyByPoint(this.point);if(t&&!this.harmdEnemy.has(t))this.harmdEnemy.add(t),t.hited(this.damage)&&this.hero.addKillNumber()}(this.point.y<0||this.point.y>this.game.height||this.point.x<0||this.point.x>this.game.width)&&this.game.removeBullet(this)}},{key:"render",value:function(e){var t=this.point.toNumber(),i=Object(h.a)(t,2),s=i[0],n=i[1];e.beginPath(),e.moveTo(s,n),e.lineTo(s-150*this.sin,n+150*this.cos);var a=e.createLinearGradient(s,n,s-150*this.sin,n+150*this.cos);a.addColorStop(0,this.color),a.addColorStop(1,"white"),e.strokeStyle=a,e.lineWidth=this.size,e.stroke(),e.closePath(),e.strokeStyle="black",e.lineWidth=1}}]),i}(k),z=function(e){Object(p.a)(i,e);var t=Object(y.a)(i);function i(){var e;Object(l.a)(this,i);for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];return(e=t.call.apply(t,[this].concat(n))).type="sniper-hero",e.target=null,e.damage=0,e.color="green",e.nullHero=new S(e.game),e.specialTargets=[],e.specialDamage=-1,e.specialDamageMax=30,e}return Object(c.a)(i,[{key:"cycle",get:function(){switch(this.level){case 1:return 5;case 2:return 3;default:case 3:return 2}}},{key:"go",value:function(){var e=this;if(!this.target){var t=this.game.enemySet.get(0);if(this.game.enemySet.forEach((function(e){(!t||!e.isPicked&&e.value>t.value)&&(t=e)})),!t)return Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this);this.target=t,this.target.isPicked=!0}if(this.step%this.cycle!==0)return Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this);this.damage<this.target.value?this.damage+=1:(this.game.bullets.push(new E(this.game,this,this.point.plus(this.size/2,0),this.target.point.plus(this.target.size/2,this.target.size/2),{damage:this.damage})),this.damage=0,this.target.isPicked=!1,this.target=null),this.specialDamage>0&&(this.specialDamage++,this.specialTargets=this.specialTargets.filter((function(e){return e.value>0})),this.specialDamage>=this.specialDamageMax&&(this.specialTargets.forEach((function(t){e.game.bullets.push(new E(e.game,e.nullHero,e.point.plus(e.size/2,0),t.point.plus(t.size/2,t.size/2),{damage:e.specialDamage}))})),this.specialDamage=-1,this.specialTargets=[])),Object(f.a)(Object(m.a)(i.prototype),"go",this).call(this)}},{key:"startSpecialMove",value:function(){for(var e=this,t=new Set,i=this.game.enemySet.length;t.size<(i<12?i:12);)t.add(this.game.enemySet.getRandomEnemy());t.forEach((function(t){e.specialTargets.push(t)})),this.specialDamage=1}},{key:"render",value:function(e,t){var s=this;Object(f.a)(Object(m.a)(i.prototype),"render",this).call(this,e,t),this.target&&this.renderTarget(e,this.target,5+(this.target.value-this.damage>0?this.target.value-this.damage:0)),this.specialTargets.forEach((function(t){s.renderTarget(e,t,5+s.specialDamageMax-s.specialDamage)}))}},{key:"renderTarget",value:function(e,t,i){t.value<=0||(e.strokeStyle="red",e.lineWidth=3,e.beginPath(),e.arc.apply(e,Object(r.a)(t.point.plus(t.size/2,t.size/2).toNumber()).concat([i,0,2*Math.PI])),e.moveTo.apply(e,Object(r.a)(t.point.plus(t.size/2,t.size/2+i+5).toNumber())),e.lineTo.apply(e,Object(r.a)(t.point.plus(t.size/2,t.size/2+i-5).toNumber())),e.moveTo.apply(e,Object(r.a)(t.point.plus(t.size/2,t.size/2-i+5).toNumber())),e.lineTo.apply(e,Object(r.a)(t.point.plus(t.size/2,t.size/2-i-5).toNumber())),e.moveTo.apply(e,Object(r.a)(t.point.plus(t.size/2+i+5,t.size/2).toNumber())),e.lineTo.apply(e,Object(r.a)(t.point.plus(t.size/2+i-5,t.size/2).toNumber())),e.moveTo.apply(e,Object(r.a)(t.point.plus(t.size/2-i+5,t.size/2).toNumber())),e.lineTo.apply(e,Object(r.a)(t.point.plus(t.size/2-i-5,t.size/2).toNumber())),e.stroke(),e.closePath(),e.strokeStyle="black",e.lineWidth=1)}}]),i}(S),M=function(){function e(t,i,s){Object(l.a)(this,e),this.value=0,this.size=20,this.point=void 0,this.game=void 0,this.beforeDestory=[],this.hooks=[],this.x=0,this.y=0,this.isPicked=!1,this.isPickedByBoom=!1,this.value=t,this.game=s,this.point=new u(i,-this.size,s.coordinate)}return Object(c.a)(e,[{key:"go",value:function(){this.point.y+=.5,this.hooks.forEach((function(e){return e.go()}))}},{key:"addBeforeDestory",value:function(e){this.beforeDestory.push(e)}},{key:"addHook",value:function(e){this.hooks.push(e)}},{key:"hited",value:function(e){var t=this;return e?(this.game.score+=this.value<e?this.value:e,this.value-=e):(this.value--,this.game.score++),this.value<=0&&(this.beforeDestory.forEach((function(e){return e(t)})),this.game.removeEnemy(this),this.hooks.forEach((function(e){return e.beforeDestory(t)})),!0)}},{key:"render",value:function(e){var t=this;this.hooks.forEach((function(i){return i.render(e,t)}));var i=this.point.toNumber(),s=Object(h.a)(i,2),n=s[0],a=s[1];v(n,a,this.size,this.size,5,e),e.textAlign="center",e.fillText("".concat(this.value),n+this.size/2,a+13)}}]),e}(),N=function(){function e(t){Object(l.a)(this,e),this.game=void 0,this.waveNumber=30,this.symbolLife=100,this.isEnd=!1,this.game=t}return Object(c.a)(e,[{key:"createEnemy",value:function(){for(var e,t=[],i=0;i<15;i++)t.push(new M(Math.ceil(this.game.step/120*Math.random()+1),30*i+10,this.game));(e=this.game.enemySet).push.apply(e,t)}},{key:"go",value:function(){0!==this.waveNumber?this.game.step%this.game.cycle===0&&(this.createEnemy(),this.waveNumber--):this.isEnd=!0}},{key:"award",value:function(){}},{key:"renderSymbol",value:function(e){e.beginPath(),e.font="italic bolder 60px Arial",e.fillStyle="grey",e.textAlign="center",e.fillText("ROUND ".concat(this.game.stageNumber+1),this.game.width/2,this.game.height-350),e.font="12px Arial",e.fillStyle="black",e.closePath()}}]),e}(),I=/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent),A=function(e){return[new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e),new N(e)]},Y=function(){function e(){Object(l.a)(this,e),this.coordinate=new d(0,0),this.enemySet=new g,this.offStageHeros=[null,null,null,null,null,null,null,null,null],this.onStageHeros=[null,null,null,null,null,null,null,null,null],this.bullets=[],this.width=460,this.height=460*window.innerHeight/window.innerWidth,this.sizeRate=460/window.innerWidth,this.targetY=this.height-150,this.targetLineLeft=this.coordinate.point(0,this.targetY),this.targetLineRight=this.coordinate.point(this.width,this.targetY),this.offStageHeroY=this.height-70,this.onStageHeroY=this.height-120,this.heroPosList=[new u(55,this.offStageHeroY,this.coordinate),new u(95,this.offStageHeroY,this.coordinate),new u(135,this.offStageHeroY,this.coordinate),new u(175,this.offStageHeroY,this.coordinate),new u(215,this.offStageHeroY,this.coordinate),new u(255,this.offStageHeroY,this.coordinate),new u(295,this.offStageHeroY,this.coordinate),new u(335,this.offStageHeroY,this.coordinate),new u(375,this.offStageHeroY,this.coordinate),new u(55,this.onStageHeroY,this.coordinate),new u(95,this.onStageHeroY,this.coordinate),new u(135,this.onStageHeroY,this.coordinate),new u(175,this.onStageHeroY,this.coordinate),new u(215,this.onStageHeroY,this.coordinate),new u(255,this.onStageHeroY,this.coordinate),new u(295,this.onStageHeroY,this.coordinate),new u(335,this.onStageHeroY,this.coordinate),new u(375,this.onStageHeroY,this.coordinate)],this.cycle=60,this.step=0,this.setEnd=null,this.setRound=null,this.$=300,this.score=0,this.HP=1e3,this.renderHP=1e3,this.result="win",this._round="strategy",this.stageNumber=0,this.stage=A(this),this.isRenderStrategy=!1,this.isMouseDown=!1,this.mouseSelectItem=null,this.mouseSelectItemType="off",this.mouseSelectItemIndex=0,this.mouseSelectItemPosition=[0,0],this.mouseSelectItemOffset=[0,0],this.canvas=null,this.handleMouseMove=this.handleMouseMove.bind(this),this.handleTouchMove=this.handleTouchMove.bind(this)}return Object(c.a)(e,[{key:"round",get:function(){return this._round},set:function(e){this._round=e,this.setRound&&this.setRound(e),"fighting"===e&&this.goFighting()}},{key:"restart",value:function(){this.enemySet.reset(),this.offStageHeros=[null,null,null,null,null,null,null,null,null],this.onStageHeros=[null,null,null,null,null,null,null,null,null],this.bullets=[],this.step=0,this.$=300,this.score=0,this.HP=1e3,this.stageNumber=0,this.round="strategy",this.stage=A(this),this.render()}},{key:"removeBullet",value:function(e){this.bullets=this.bullets.filter((function(t){return t!==e}))}},{key:"removeEnemy",value:function(e){this.enemySet.removeEnemy(e),this.$++}},{key:"refreshHeroList",value:function(){return!(this.$<10)&&(this.$-=10,this.render(),!0)}},{key:"buyHero",value:function(e){switch(e){case"lightning":if(this.$<200)return!1;this.$-=200,this.addOffStageHero(new T(this));break;case"sniper":if(this.$<150)return!1;this.$-=150,this.addOffStageHero(new z(this));break;case"boom":if(this.$<200)return!1;this.$-=200,this.addOffStageHero(new x(this));break;case"grapeshot":default:if(this.$<220)return!1;this.$-=220,this.addOffStageHero(new H(this))}return this.render(),!0}},{key:"go",value:function(){var e=this;return this.stage[this.stageNumber].go(),this.enemySet.forEach((function(t){t.go(),t.point.y>=e.targetY-t.size&&(e.removeEnemy(t),e.HP-=t.value>e.HP?e.HP:t.value)})),this.onStageHeros.forEach((function(e){null===e||void 0===e||e.go()})),this.bullets.forEach((function(e){e.go()})),this.renderHP>this.HP?this.renderHP--:this.renderHP<this.HP&&this.renderHP++,this.step++,this.HP<=0}},{key:"goFighting",value:function(){var e=this,t=this.go();return this.render(),t?(this.setResult("loose"),void this.render()):this.stage[this.stageNumber].isEnd&&0===this.bullets.length&&0===this.enemySet.length&&this.renderHP===this.HP?(this.round="strategy",this.stageNumber++,this.stageNumber===this.stage.length?(this.setResult("win"),void this.render()):(this.stage[this.stageNumber].award(),void this.render())):void requestAnimationFrame((function(){e.goFighting()}))}},{key:"goStrategy",value:function(){this.isRenderStrategy||this.loopRender()}},{key:"loopRender",value:function(){var e=this;this.render(),this.isRenderStrategy&&requestAnimationFrame((function(){e.loopRender()}))}},{key:"render",value:function(){var e;if(this.canvas){var t=this.canvas.getContext("2d");if(t){t.clearRect(0,0,this.canvas.width,this.canvas.height),t.strokeRect.apply(t,Object(r.a)(this.coordinate.origin).concat([this.width,this.height])),null===(e=this.stage[this.stageNumber])||void 0===e||e.renderSymbol(t),t.beginPath(),t.strokeStyle="grey",this.heroPosList.forEach((function(e){v.apply(void 0,Object(r.a)(e.plus(8,8).toNumber()).concat([14,14,5,t]))})),t.strokeStyle="black",t.closePath(),this.enemySet.forEach((function(e){e.render(t)})),t.beginPath(),t.fillStyle="white",t.fillRect(1,this.targetY-30,this.width-2,32),t.fillStyle="grey",t.fillRect(1,this.targetY-25,this.width-2,11),t.fillStyle="lightgreen",t.strokeStyle="green";var i=this.renderHP/1e3*(this.width-2);t.fillRect(this.width-i-1,this.targetY-25,i,11),t.fillStyle="#00CC33";var s=this.HP/1e3*(this.width-2);t.fillRect(this.width-s-1,this.targetY-25,s,11),t.fillStyle="white",t.fillText("".concat(this.HP,"/1000"),this.width/2,this.targetY-15),t.closePath(),t.fillStyle="black",t.strokeStyle="black",t.beginPath(),this.offStageHeros.forEach((function(e){null===e||void 0===e||e.render(t)})),this.onStageHeros.forEach((function(e){null===e||void 0===e||e.render(t)})),t.closePath(),t.beginPath(),t.moveTo.apply(t,Object(r.a)(this.targetLineLeft.plus(0,-30).toNumber())),t.lineTo.apply(t,Object(r.a)(this.targetLineRight.plus(0,-30).toNumber())),t.stroke(),t.closePath(),t.beginPath(),this.bullets.forEach((function(e){e.render(t)})),t.closePath(),this.mouseSelectItem&&(this.mouseSelectItem.render(t,[this.mouseSelectItemPosition[0]+this.mouseSelectItemOffset[0],this.mouseSelectItemPosition[1]+this.mouseSelectItemOffset[1]]),I&&(t.putImageData(t.getImageData(0,this.targetY,this.width,150),0,this.targetY-150),t.rect(0,this.targetY-150,this.width,150),t.stroke())),t.beginPath(),t.font="bold 20px Arial",t.fillStyle="red",t.textAlign="right",t.fillText("$:".concat(this.$),440,29),t.font="12px Arial",t.fillStyle="black",t.closePath();var n="".concat(this.score);this.score>1e3&&(n=(this.score/1e3).toFixed(2)+"k"),t.beginPath(),t.font="bold 18px Arial",t.fillStyle="red",t.textAlign="left",t.fillText("SCORE:".concat(n),20,29),t.font="12px Arial",t.fillStyle="black",t.closePath(),t.beginPath(),t.font="14px Arial",t.fillStyle="black",t.textAlign="center",t.fillText("round ".concat(this.stageNumber+1>this.stage.length?this.stage.length:this.stageNumber+1," / ").concat(this.stage.length),this.width/2,28),t.font="12px Arial",t.fillStyle="black",t.closePath()}}}},{key:"setResult",value:function(e){this.result=e,this.setEnd&&this.setEnd(!0)}},{key:"addOffStageHero",value:function(e,t){if(void 0===t&&this.offStageHeros.some((function(e,i){return null===e&&(t=i,!0)})),void 0!==t&&(this.offStageHeros[t]=e,e)){if(e.point.y=this.offStageHeroY,e.point.x=55+40*t,e.addToOffStage(t),e.level>=3)return;var i=[];this.offStageHeros.forEach((function(t,s){(null===t||void 0===t?void 0:t.type)===e.type&&e.level===t.level&&i.push(s)})),i.length>=3&&(this.addOffStageHero(null,i[0]),this.addOffStageHero(null,i[1]),this.offStageHeros[i[2]].level+=1,this.addOffStageHero(this.offStageHeros[i[2]],i[2]))}}},{key:"addOnStageHero",value:function(e,t){if(void 0===t&&this.onStageHeros.some((function(e,i){return null===e&&(t=i,!0)})),void 0!==t&&(this.onStageHeros[t]=e,e)){if(e.point.y=this.onStageHeroY,e.point.x=55+40*t,e.level>=3)return;var i=[];this.onStageHeros.forEach((function(t,s){(null===t||void 0===t?void 0:t.type)===e.type&&e.level===t.level&&i.push(s)})),i.length>=3&&(this.addOnStageHero(null,i[0]),this.addOnStageHero(null,i[1]),this.onStageHeros[i[2]].level+=1,this.addOnStageHero(this.onStageHeros[i[2]],i[2]))}}},{key:"handleCanvasMouseDown",value:function(e){if("fighting"!==this.round)return this.isMouseDown=!0,this.findHero(this.offStageHeros,e.clientX,e.clientY,"off")||this.findHero(this.onStageHeros,e.clientX,e.clientY,"on")?(window.addEventListener("mousemove",this.handleMouseMove),this.isRenderStrategy=!0,void this.loopRender()):void 0}},{key:"handleTouchStart",value:function(e){if("fighting"!==this.round)return e.stopPropagation(),e.preventDefault(),this.isMouseDown=!0,this.findHero(this.offStageHeros,e.touches[0].clientX,e.touches[0].clientY,"off")||this.findHero(this.onStageHeros,e.touches[0].clientX,e.touches[0].clientY,"on")?(window.addEventListener("touchmove",this.handleTouchMove,{passive:!1}),this.isRenderStrategy=!0,void this.loopRender()):void 0}},{key:"findHero",value:function(e,t,i,s){var n=this,a=e.findIndex((function(e){if(!e)return!1;var s=e.isPointIn(t*n.sizeRate,i*n.sizeRate);if(s){var a=e.point.toNumber();n.mouseSelectItemOffset=[a[0]-t*n.sizeRate,a[1]-i*n.sizeRate]}return s}));return-1!==a&&(this.mouseSelectItem=e[a],this.mouseSelectItemType=s,this.mouseSelectItemIndex=a,this.mouseSelectItemPosition=[t*this.sizeRate,i*this.sizeRate],!0)}},{key:"handleMouseUp",value:function(e){window.removeEventListener("mousemove",this.handleMouseMove),this.handleEventEnd(e.clientX,e.clientY)}},{key:"handleTouchEnd",value:function(e){window.removeEventListener("touchmove",this.handleTouchMove),this.handleEventEnd(e.changedTouches[0].clientX,e.changedTouches[0].clientY)}},{key:"handleEventEnd",value:function(e,t){var i=[e*this.sizeRate+this.mouseSelectItemOffset[0],t*this.sizeRate+this.mouseSelectItemOffset[1]],s=[i[0]+30,i[1]+30],n=this.heroPosList.findIndex((function(e){var t=e.toNumber();return i[0]>t[0]-18&&i[1]>t[1]-18&&s[0]<t[0]+48&&s[1]<t[1]+48}));if(-1!==n&&this.mouseSelectItem)if(0===Math.floor(n/9)){var a=n%9,o=this.offStageHeros[a];this.offStageHeros[a]=null,"on"===this.mouseSelectItemType?this.onStageHeros[this.mouseSelectItemIndex]=null:this.offStageHeros[this.mouseSelectItemIndex]=null,this.addOffStageHero(this.mouseSelectItem,a),"on"===this.mouseSelectItemType?this.addOnStageHero(o,this.mouseSelectItemIndex):this.addOffStageHero(o,this.mouseSelectItemIndex)}else{var r=n%9,h=this.onStageHeros[r];this.onStageHeros[r]=null,"on"===this.mouseSelectItemType?this.onStageHeros[this.mouseSelectItemIndex]=null:this.offStageHeros[this.mouseSelectItemIndex]=null,this.addOnStageHero(this.mouseSelectItem,r),"on"===this.mouseSelectItemType?this.addOnStageHero(h,this.mouseSelectItemIndex):this.addOffStageHero(h,this.mouseSelectItemIndex)}this.isMouseDown=!1,this.mouseSelectItem=null,this.isRenderStrategy=!1}},{key:"handleMouseMove",value:function(e){this.handleMove(e.clientX,e.clientY)}},{key:"handleTouchMove",value:function(e){e.preventDefault(),e.stopPropagation(),this.handleMove(e.changedTouches[0].clientX,e.changedTouches[0].clientY)}},{key:"handleMove",value:function(e,t){this.mouseSelectItemPosition=[e*this.sizeRate,t*this.sizeRate]}}]),e}(),_=i(10),R=i.n(_),B=i(3),L=new Y,D={type:"grapeshot-hero",name:"\u9730\u5f39",price:220},C={type:"lightning-hero",name:"\u95ea\u7535",price:200},K={type:"sniper-hero",name:"\u72d9\u51fb",price:150},$={type:"boom-hero",name:"\u7206\u7834",price:200},F=function(){var e=Math.random();return e<.25?D:e<.5?C:e<.75?$:K},W=function(){return[F(),F(),F(),F(),F()]},X=function(){var e=Object(s.useRef)(null),t=Object(s.useState)(!1),i=Object(h.a)(t,2),n=i[0],a=i[1],o=Object(s.useState)(!1),l=Object(h.a)(o,2),c=l[0],u=l[1],d=Object(s.useState)(W()),g=Object(h.a)(d,2),f=g[0],m=g[1],p=Object(s.useState)(!1),y=Object(h.a)(p,2),v=y[0],b=y[1],S=Object(s.useState)("strategy"),k=Object(h.a)(S,2),O=k[0],w=k[1];return Object(s.useEffect)((function(){e.current&&(e.current.width=L.width,e.current.height=L.height)}),[e]),Object(s.useEffect)((function(){L.setEnd=a}),[n]),Object(s.useEffect)((function(){L.setRound=w}),[O]),Object(s.useEffect)((function(){L.canvas=e.current,L.render()}),[e]),Object(s.useEffect)((function(){var e=L.handleMouseUp.bind(L),t=L.handleTouchEnd.bind(L);return window.addEventListener("mouseup",e),window.addEventListener("touchend",t),function(){window.removeEventListener("mouseup",e),window.removeEventListener("touchend",t)}}),[]),Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)("canvas",{ref:e,className:R.a.canvas,onClick:function(){u(!1),b(!1)},onTouchStart:L.handleTouchStart.bind(L),onMouseDown:L.handleCanvasMouseDown.bind(L)}),Object(B.jsxs)("div",{className:R.a.info,children:[Object(B.jsxs)("div",{children:[Object(B.jsx)("button",{className:R.a.shopBtn,onClick:function(){u(!c),b(!1)},children:"\u5546\u5e97"}),c&&Object(B.jsxs)("div",{className:R.a.shopBox,children:[Object(B.jsxs)("div",{style:{margin:"10px",marginBottom:"20px",display:"flex",justifyContent:"space-between"},children:[Object(B.jsx)("span",{style:{fontSize:"18px",color:"gray"},children:"\u7ae5\u53df\u65e0\u6b3a\uff0c\u5408\u7406\u6d88\u8d39"}),Object(B.jsxs)("button",{onClick:function(){L.refreshHeroList()?m(W()):b(!0)},children:["\u5237\u65b0\u5546\u54c1",Object(B.jsx)("span",{style:{color:"red"},children:"$10"})]})]}),Object(B.jsx)("ul",{className:R.a.shopList,children:f.map((function(e,t){return Object(B.jsxs)("li",{className:R.a.shopItem,onClick:function(){if(e){var i=!1;switch(e.type){case"grapeshot-hero":i=L.buyHero("grapeshot");break;case"boom-hero":i=L.buyHero("boom");break;case"sniper-hero":i=L.buyHero("sniper");break;case"lightning-hero":default:i=L.buyHero("lightning")}if(i){var s=Object(r.a)(f);s[t]=null,m(s),b(!1)}else b(!0)}},children:[null===e||void 0===e?void 0:e.name,Object(B.jsx)("div",{className:R.a.shopItemPrice,children:e&&"$".concat(e.price)})]},t)}))}),v&&Object(B.jsx)("div",{className:R.a.shopError,children:"\u94b1\u4e0d\u591f\uff01\uff01\uff01\uff01\uff01\uff01"})]})]}),Object(B.jsxs)("div",{className:[R.a.gameEndBox,n?R.a.end:""].join(" "),children:["win"===L.result?"\u606d\u559c\ud83c\udf89":"game over",Object(B.jsx)("button",{onClick:function(){L.restart(),a(!1),m(W()),L.canvas=e.current},className:R.a.restartBtn,children:"restart"})]}),Object(B.jsx)("div",{children:"strategy"===O&&Object(B.jsx)("button",{className:R.a.startFighting,onClick:function(){L.round="fighting",u(!1)},children:"\u5f00\u59cb\u963b\u51fb"})})]})]})},U=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,22)).then((function(t){var i=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,o=t.getTTFB;i(e),s(e),n(e),a(e),o(e)}))};o.a.render(Object(B.jsx)(n.a.StrictMode,{children:Object(B.jsx)(X,{})}),document.getElementById("root")),U()}},[[21,1,2]]]);
//# sourceMappingURL=main.bb2d5f69.chunk.js.map