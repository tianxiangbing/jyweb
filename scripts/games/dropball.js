/*
*
*author: 田想兵 
*date:2014/3/10
*email:55342775@qq.com
*web:http://www.lovewebgames.com
*/
(function(win){
	var Hoop = function(){};
	Hoop.prototype = new Sprite;
	JY.extend(Hoop.prototype,{
		create:function(){
			this.init(5,5,{"backgroundColor":"#FFFFFF"});
		}
	});
	var Level = function(){};
	Level.prototype = new Sprite;
	JY.extend(Level.prototype,{
		create:function(html){
			this.init(50,50,{"backgroundColor":"#FFFFFF","borderRadius":"5px","fontStyle":"normal","fontSize":"16px","fontWeight":"bold","fontFamily":"微软雅黑",color:"#4d4d4d","lineHeight":"50px","textAlign":"center","cursor":"pointer"});
			this.DOM.innerHTML = html;
		}
	});
	var Ball = function(){
		this.x = 0 ;
		this.y = 0 ;
		this.v ={x:0,y:0} ;

	};
	var WordGame =function(){
	};
	var game =function(){
	};
	game.prototype = new Game;
	g=new game();
	JY.extend(game.prototype,{
		newGame:function(){		
			this .currentLevel = 1;
			this.dragPos = {};//鼠标与圆环的差值
			this.life =3;
			this.count = 1;
			this.user = null;
			this.speed = 5;
			this.time = (new Date()).getTime();
			this.gameBoard = null;
			this.canvas = JY.getCtx ("drawBall");
			this.x = JY.width(b.stage);
			this.y = JY.height(b.stage);
			this.oldPos ={x:0,y:0};
			this.stimer = 0 ;//开始时间
			this.etimer = 0 ;//结束时间
			this.ball = null;
			this.ballArr = [];
			this.ballv = {x:10,y:1};
			this.ballPos = {x:20,y :200};
			this.v = {x : 0 ,y :0 };
			this.path = { s:0, e:0 };
			this.garv = .1;//重力加速度
			this.init();
			this.bindEvent();
			//JY.soundManage.play("bg",true);
		},
		init:function(){
			this.draw();//
			this.ballMove();
			this.gameBoard = new Sprite(b.stage.width,b.stage.height);
			b.addChild(this.gameBoard);
			JY.css(b.stage,{'cursor':'none'});
		},
		bindEvent:function(){
			var _self = this;
			JY.bind(this.gameBoard.DOM,"mousemove",function(e){
				var pos = {x:	event. offsetX,y:event.offsetY};
				pos.x = Math.min(pos.x, b.stage.width-_self .user.width/2);
				pos.x = Math.max(pos.x,_self .user.width/2);
				pos.y = Math.min(pos.y, b.stage.height-_self .user.height/2);
				pos.y = Math.max(pos.y,_self.user.height/2);
				_self.v = { x : _self.oldPos.x - pos.x , y :_self.oldPos.y - pos.y };
				_self.path = { s:{x:_self.oldPos.x ,y:_self.oldPos.y } , e:{x: pos.x ,y: pos.y} };
				if ( _self.v.x == 0 && _self.v.y ==0 ){
					return false;
				};
				_self.oldPos = {x :pos.x,y:pos.y};
				_self .user.setPosition( pos.x -_self.user.width/2 , pos.y - _self.user.height/2 );
				_self.testHits();
			});
		},
		draw:function(){
			//b.clearState();//清空界面，定时器
			this.user = new Sprite(80,10,{backgroundColor:"#ededed",border:"1px solid #CCC",zIndex:"-1"});
			this.user.setPosition(this.x/2 - this.user.width/2,this.y-this.user.height);
			b.addChild(this.user);	
		},
		ballMove:function(){			
			this.count++;
			if (this.count % 500==0 ||this.ballArr.length ==0){	
				if (this.ballArr.length ==0){
					this.stimer = +new Date();
				}		
				var b = new Ball();
				b.x = Math.random()*this.x;	
				b.y = 20;
				b.timer = 0 ;
				this.ballArr.push(b);
			};
			var _this = this;
			this.canvas.clearRect(0,0,JY.width(this.canvas.canvas),JY.height(this.canvas.canvas));	
			JY.each(this.ballArr,function(d,i){					
				//球
				var ball = new Sprite5();
				var img = new Image();
				if (this.timer >0){
					this.timer --;
				}
				img.src= "images/pingpang/ball.png";
				ball.init(_this.canvas,img,{x:0,y:0},{x:24,y:24});
				this.v.y += _this.garv;
				this.size = ball.size;
				this.pos = ball.size;
				if(_this.count % 10==0){
					this.v .y *= .9;
				}
				if (this.y + ball.size.y > _this.y){
					this.v.y *= -1;
					_this.etimer = +new Date();
					_this.life --;
				};
				// if (this .v.y >0){
					if (JY.hits(_this.user,{width:ball.size.x,height:ball.size.y,x:this.x,y:this.y}) && this.timer==0){
						//this.v.y *= -1;
						this.timer =10;
						var tmp = Math.abs ( _this.path.s.y - _this.path.e.y);
						//console.log(tmp,this.v.y)
						if ( _this.path.s.y - _this.path.e.y >0 ){
							this.v.y = - Math.min(tmp + Math.abs(this.v.y),20);
						}else if( _this.path.s.y - _this.path.e.y <0 ){
							this.v.y = Math.min(tmp + Math.abs(this.v.y),20);
						}else{
							this.v.y *=-1;
						}
					}
				// };
				this.y+=this.v.y; 
				ball.setPosition(this.x,this.y);
			});
		},		
		getEventPosition:function(event){	
			var parent =b.stage;
			var po = JY.offset(parent);
			var x =0,y=0;
			x  = event.clientX -po.x +  document.documentElement.scrollLeft;
			y  = event.clientY -po.y + document.documentElement.scrollTop;
			return {x:x,y:y};
		},
		moveUser:function(event){
			var _self = this;
			if (!_self.moveEnabled ){
				return;
			}
			var pos = this .getEventPosition(event);
			var y = pos.y - this.dragPos.y;
			var x = pos.x -this.dragPos.x;
			if (Math.abs(x - this.user.x)>=1 || Math.abs(y - this.user.y)>=1){
				if (x <0){
					x = 0;
				}else
				if (x > JY.width(b.stage)- _self.user.width ){
					x = JY.width(b.stage)- _self.user.width;
				};
				if (y < 0){
					y = 0 ;
				}else
				if (y > JY.height(b.stage)- _self.user.height){
					y = JY.height(b.stage)- _self.user.height;
				};
				//this.user.setPosition(x,y);
			}
		},
		runGame:function(){	
			this.checkLife();
			this.ballMove();
			this.testHits();
			this.checkStage();
		},
		testHits:function(){
			// if (JY.hits( this.user,{width:this.ball.size.x,height:this.ball.size.y,x:this.ball.x,y:this.ball.y}) && this.ballv.y >= 0 ){
			// 	this.ballv.x *= -1 ;
			// 	this.ballv.x -= Math.abs(this.v.x);
			// 	var tmp = Math.abs ( this.path.s.y - this.path.e.y);
			// 	this.ballv.y = - Math.min(tmp + this.ballv.y,10);
			// }
			var _this = this;
			JY.each(this.ballArr,function(d){		
				var ball = d;	
				if (JY.hits(_this.user,{width:ball.size.x,height:ball.size.y,x:this.x,y:this.y}) && this.timer==0){
					//this.v.y *= -1;
					this.timer =10;
					var tmp = Math.abs ( _this.path.s.y - _this.path.e.y);
					//console.log(tmp,this.v.y)
					if ( _this.path.s.y - _this.path.e.y >0 ){
						this.v.y = - Math.min(tmp + Math.abs(this.v.y),20);
					}else if( _this.path.s.y - _this.path.e.y <0 ){
						this.v.y = Math.min(tmp + Math.abs(this.v.y),20);
					}else{
						this.v.y *=-1;
					}
				}	
			});
		},
		checkStage:function(){
			if (JY.height(b.stage)!==b.stage.height){
				JY.height(b.stage,b.stage.height);
			};
			if (JY.width(b.stage)!==b.stage.width){
				JY.width(b.stage,b.stage.width);
			};
		},
		shiAnimate:function(){			
			var _self= this;
			JY.resolve(function(v,i){
				v.y += _self.speed;				
				v.setPosition(v.x,v.y);
				if (v.y>JY.height(b.stage)){
					b.removeChild( v.DOM);
					delete v;
				}
			},0,this.shiArr.length,this.shiArr);
		},
		checkLife:function(){
			if (this.life==0 ){
				JY.css(b.stage,{'cursor':'default'});
				var timer = (this.etimer - this.stimer )/1000;
				b.gameOverScreen=JY.convertDOM('<div style="color:#555;padding:200px 100px;width:500px;margin:0 auto;"><h1>您的最后时间是：<strong>'+timer+'</strong>秒,共接住'+this.ballArr.length+'球</h1><p>点击重新开始游戏</p><div>');
				b.checkState(JYGSTATE.STATE_SYSTEM_GAME_OVER);
			}
		},
		newLevel:function(){		
			/*写分数*/			
			this.isFire = false;
			this.oldPos ={x:0,y:0};
			this.ballv = {x:10,y:1};
			this.ballPos = {x:0,y :200};
			
			var _self = this;
			setTimeout(function(){
				b.clearState();//清空界面，定时器
				b.startTimer();
				_self.init();
				_self.bindEvent();
			},1200);
		},
		writeLevel:function(){
			var t = Math.round(( (new Date()).getTime() - this.time )/1000);
			this.writeScore(t,{x:b.stage.width-100,y:20},13);
		},
		writeScore:function(text,pos,size){
			var scoreBoard = new CanvasText(pos,this.canvas);
			var size =size ||48;
			scoreBoard.family('Georgia')
						 .size(size+'px')
						 .weight('800')
						 .color('red')
						.append(text.toString());
			scoreBoard.render();
		},
		levelup:function(){
			if (this.isFire || this .currentLevel ==1){
				return;
			};			
			b.clearState();//清空界面，定时器
			var max = JY.cookie("level")||1;
			max = Math.max( this.currentLevel ,max);
			JY.cookie("level" , max,30);
			this.isFire = true;
			this.newLevel();
		}
	});
	WordGame.prototype = new JYG (JY.byId("gameboard"));
	JY.extend(WordGame.prototype,{
		init : function(){
			var _this = this;
			this.frequency =15;
			this.game = g;
			this.waitTime= 5;
			this.checkState(JYGSTATE.STATE_SYSTEM_TITLE);
			this.startTimer();
			/**创建欢迎界面**/
			this.titleScreen=JY.convertDOM('<div style="color:red;font-weight:bold;text-align:center;padding-top:50px;width:100%;margin:0 auto;"><h1 style="color:red;font-weight:bold;">乒乓球-JY游戏</h1></div>');
			this.InstructionsScreen=JY.convertDOM('<div style="margin:0 auto;height:100%;width:100%;position:relative;"><span style="display:block;cursor:pointer;width:100%;height:110px;line-height:100px;font-family: Tahoma,宋体;text-align:center;font-size:28px;font-weight:bolder;color:#FFFFFF;top:100px;position:absolute;">Play</span><p style="position:absolute;top:350px;text-align:center;width:100%;color:#0091e0;"><a href="http://www.lovewebgames.com" target="_blank" style="color:#0091e0;">作者：田想兵55342775@qq.com</a></p><p style="position: absolute;top: 390px;text-align: left;color: #0091e0;margin: 0 50px;">鼠标可以控制拦板的移动，你所要做的就是尽量不要让小球掉到地上，把球打向空中，掉三球，游戏就会结束。看你能坚持多少时间，守住多少个球。</p></div>');
			this.scoreScreen = JY.convertDOM('<div style="color:#FFF;width:200px;float:right;font-weight:bold;position:absolute;z-index:2;right:0;" id="scoreScreen"></div>');
			
			JY.delegate(JY.byId('gameboard'),"a","mousedown",function(e){
				location.href = JY.attr(e.target,"href");
			});
			JY.soundManage.init("/scripts/swfobject.min.js","/scripts/flash/playSound.swf","playSound",function(){
				JY.soundManage.loadSound("sound/zuma/bg.mp3","bg");
			});
			JY.bind(document,"keydown",function(e){
				g.bindEvent(e.keyCode);
			});
			var loading = JY.convertDOM('<p style="font-size:12px;">资源正在加载中。。。</p>');
			this.addChild(loading);
			var _self = this;
			JY.loadFile("/scripts/JY.cookie.js","script",function(){
				_self.removeChild(loading);
		   });
		}
	});
	var  b=new WordGame;
	b.init();	
	if (location.host !=="www.lovewebgames.com"&&location.hostname !=="localhost"){
		location.href="http://www.lovewebgames.com";
	};
})(window);