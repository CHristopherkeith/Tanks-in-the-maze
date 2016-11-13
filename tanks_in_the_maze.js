//对象池，管理频繁创建和销毁的对象，如子弹
function Pool(maxSize) {
	var size = maxSize; // Max bullets allowed in the pool
	var pool = [];
	//获取所有处于激活的对象池里的对象
	this.getPool = function() {
		var obj = [];
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				obj.push(pool[i]);
			}
		}
		return obj;
	}

	/*
	 * Populates the pool array with the given object
	 */
	 //根据不同类型初始化对象池里的对象
	this.init = function(object) {
		var colliType,bulletType;
		if(object=="bulletup"||object=="bulletdown"||object=="bulletleft"||object=="bulletright"){
			colliType=["enemy","wall"];
			bulletType="bullet";
			for (var i = 0; i < size; i++) {
				// Initalize the object
				var bullet = new Bullet(object);
				bullet.init(0,0, imageRepository[object].width,imageRepository[object].height);
				bullet.collidableWith = colliType;
				bullet.type = bulletType;
				pool[i] = bullet;
			}
		}
		else if(object=="enemybulletup"||object=="enemybulletdown"||object=="enemybulletleft"||object=="enemybulletright"){
			colliType=["spy","wall"];
			bulletType="enemybullet";
			for (var i = 0; i < size; i++) {
				// Initalize the object
				var bullet = new Bullet(object);
				bullet.init(0,0, imageRepository[object].width,imageRepository[object].height);
				bullet.collidableWith = colliType;
				bullet.type = bulletType;
				pool[i] = bullet;
			}
		}
		else if(object=="enemy"||object=="enemydown"||object=="enemyleft"||object=="enemyright"){
			colliType="bullet";
			//bulletType="enemy"; 
			for (var i = 0; i < size; i++) {
				// Initalize the object
				var enemy = new Enemy(object);
				enemy.init(0,0, imageRepository[object].width,imageRepository[object].height);
				enemy.collidableWith = colliType;
				enemy.type = bulletType;
				pool[i] = "enemy";
			}
		}
		
	};

	/*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
	 //激活对象池里的对象
	this.get = function(x, y, speed) {
		
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	/*
	 * Used for the ship to be able to get two bullets at once. If
	 * only the get() function is used twice, the ship is able to
	 * fire and only have 1 bullet spawn instead of 2.
	 */
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
		if(!pool[size - 1].alive && !pool[size - 2].alive) {
			this.get(x1, y1, speed1);
			this.get(x2, y2, speed2);
		}
	};

	/*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
	 //绘制对象池里的对象，直到对象呗回收
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			// Only draw until we find a bullet that is not alive
			if (pool[i].alive) {

				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}

//所有可绘制对象抽象类，方便继承
function Drawable() {
	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.context=new Object();
	this.speed = 0;
	this.isStop=true;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	this.draw = function() {
	};
	this.move = function() {
	};
	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}

//图片库，方便调用
var imageRepository = new function() {
	this.spy = new Image();
	this.spydown = new Image();
	this.spyleft = new Image();
	this.spyright = new Image();
	this.enemy= new Image();
	this.enemydown = new Image();
	this.enemyleft = new Image();
	this.enemyright = new Image();
	this.target = new Image();
	this.wall=new Image();
	this.bulletup = new Image();
	this.bulletdown = new Image();
	this.bulletleft = new Image();
	this.bulletright = new Image();
	
	this.enemybulletup = new Image();
	this.enemybulletdown = new Image();
	this.enemybulletleft = new Image();
	this.enemybulletright = new Image();

	// Ensure all images have loaded before starting the game
	var numImages = 18;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
		}
	}
	this.spy.onload = function() {
		imageLoaded();
	}
	this.spydown.onload = function() {
		imageLoaded();
	}
	this.spyleft.onload = function() {
		imageLoaded();
	}
	this.spyright.onload = function() {
		imageLoaded();
	}
	this.enemy.onload = function() {
		imageLoaded();
	}
	this.enemydown.onload = function() {
		imageLoaded();
	}
	this.enemyleft.onload = function() {
		imageLoaded();
	}
	this.enemyright.onload = function() {
		imageLoaded();
	}
	this.target.onload = function() {
		imageLoaded();
	}
	this.wall.onload = function() {
		imageLoaded();
	}
	this.bulletup.onload = function() {
		imageLoaded();
	}
	this.bulletdown.onload = function() {
		imageLoaded();
	}
	this.bulletright.onload = function() {
		imageLoaded();
	}
	this.bulletleft.onload = function() {
		imageLoaded();
	}
	this.enemybulletup.onload = function() {
		imageLoaded();
	}
	this.enemybulletdown.onload = function() {
		imageLoaded();
	}
	this.enemybulletright.onload = function() {
		imageLoaded();
	}
	this.enemybulletleft.onload = function() {
		imageLoaded();
	}

	// Set images src
	this.spy.src = "images/spy.png";
	this.spydown.src = "images/down.png";
	this.spyleft.src = "images/left.png";
	this.spyright.src = "images/right.png";
	this.enemy.src = "images/enemy.png";
	this.enemydown.src = "images/enemydown.png";
	this.enemyleft.src = "images/enemyleft.png";
	this.enemyright.src = "images/enemyright.png";
	this.target.src = "images/target.png";
	this.wall.src = "images/wall.png";
	this.bulletup.src = "images/bulletup.png";
	this.bulletdown.src = "images/bulletdown.png";
	this.bulletleft.src = "images/bulletleft.png";
	this.bulletright.src = "images/bulletright.png";
	this.enemybulletup.src = "images/enemybulletup.png";
	this.enemybulletdown.src = "images/enemybulletdown.png";
	this.enemybulletleft.src = "images/enemybulletleft.png";
	this.enemybulletright.src = "images/enemybulletright.png";
}

//主角对象
var Spy=function(){

	var oripos_x,oripos_y,spyimg,xcnt=0,ycnt=0;

	this.markdir=false;//标识是否改变方向
	this.speed=2;//每一帧速度
	this.isStop=true;//是否停止
	this.levelUp=false;//是否升级
	this.patharr=[];//存储可行走路径
	this.collidableWith = "enemybullet";//可碰撞对象
	this.isColliding = false;//是否碰撞
	this.type = "spy";//对象类型，用于碰撞检测
	this.counter=0;//配合射击速率使用
	this.firerate=15;//射击速率，适当设置避免子弹过快或者过慢绘制
	this.cnt=0;//计算已走过多少路径方格

	this.context=$("#role").getContext("2d");
	this.canvasHeight=$("#role").height;
	this.canvasWidth=$("#role").width;
	//绑定并初始化和spy有关的子弹对象
	this.bulletup=new Pool(10);
	this.bulletdown=new Pool(10);
	this.bulletleft=new Pool(10);
	this.bulletright=new Pool(10);
	this.bulletup.init("bulletup");
	this.bulletdown.init("bulletdown");
	this.bulletleft.init("bulletleft");
	this.bulletright.init("bulletright");
	this.bulletLibrary ={
		up:this.bulletup,
		down:this.bulletdown,
		left:this.bulletleft,
		right:this.bulletright,
	}
	

	//绘制对象
	this.draw=function(spyimg){
		this.context.drawImage(spyimg||imageRepository.spy,this.x,this.y);
	}
	//射击
	this.fire=function(){	
		switch(this.patharr[this.cnt]||this.patharr[this.patharr.length-1]){
			case "up":
				this.bulletLibrary["up"].get(this.x+15,this.y-10,3);
				break;
			case "down":
				this.bulletLibrary["down"].get(this.x+15,this.y+28,3);
				break;
			case "left":
				this.bulletLibrary["left"].get(this.x-10,this.y+15,3);
				break;
			case "right":
				this.bulletLibrary["right"].get(this.x+28,this.y+15,3);
				break;
		}
	}
	//根据可行路径移动
	this.move=function(){

		this.context.clearRect(this.x,this.y,imageRepository.spy.width,imageRepository.spy.height);
		//保存每个行走到每个方格的初始路径
		if(this.cnt!=this.patharr.length){

			if(!this.markdir){
				oripos_x=this.x;
				oripos_y=this.y;
				this.markdir=true;
			}
			//判断行走方向
			
			if (this.patharr[this.cnt]=="up") { 
				this.y -= this.speed;
				spyimg=imageRepository.spy;
			}
			if (this.patharr[this.cnt]=="down") {
				this.y += this.speed;
				spyimg=imageRepository.spydown;
			}
			if (this.patharr[this.cnt]=="left") { 
				this.x -= this.speed;
				spyimg=imageRepository.spyleft;
			}
			if (this.patharr[this.cnt]=="right") { 
				this.x += this.speed;
				spyimg=imageRepository.spyright;
			}
			//超出每个方格时修正并结束此方格的行走，进入下一方格
			if(Math.abs(oripos_x-this.x)>=32||Math.abs(oripos_y-this.y)>=32){
				
				if(Math.abs(oripos_x-this.x)>=32){
					xcnt=(this.patharr[this.cnt]=="right"?xcnt+1:xcnt-1);
					this.x=xcnt*32;

				}
				if(Math.abs(oripos_y-this.y)>=32){
					ycnt=(this.patharr[this.cnt]=="down"?ycnt+1:ycnt-1);
					
					this.y=ycnt*32;
				}

				this.cnt++;
				this.markdir=false;
			}
		}
		//路径行走完毕
		else{
			this.isStop=true;
			//到达终点
			if(this.x/32==Math.ceil(this.canvasWidth/32)-2&&this.y/32==Math.ceil(this.canvasHeight/32)-2){
				this.levelUp=true;
				xcnt=0;
				ycnt=0;
			}
		}

		if(!this.isColliding){
			this.draw(spyimg);
		}
		else{
			oripos_x=0;
			oripos_y=0;
			xcnt=0;
			ycnt=0;
		}



	}

	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};

}
Spy.prototype=new Drawable();
//目标对象
var Target=function(){

	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.context=$("#canvas").getContext("2d");
	this.draw=function(){
		this.context.drawImage(imageRepository.target,this.x,this.y);
	}

}
Target.prototype=new Drawable();
//子弹对象
var Bullet=function(object) {
	var self = object;

	this.collidableWith = ["wall","spy"];
	this.isColliding = false;
	this.context=$("#role").getContext("2d");
	this.canvasWidth=$("#role").width;
	this.canvasHeight=$("#role").height;
	this.alive = false;

	this.spawn = function(x, y, speed/*,direction*/) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};


	this.draw = function() {
		this.context.clearRect(this.x, this.y, this.width+1, this.height+1);
		//子弹碰撞，回收
		if (this.isColliding) {
			return true;
			//子弹超出画布边界，回收
		}else if(this.y <= 0 - this.height||this.y >= this.canvasHeight||this.x <= 0 - this.width||this.x >= this.canvasWidth){
			return true;
		}else{
			//判断子弹方向
			switch(self){
			case "bulletup":
				this.y-=this.speed;
				break;
			case "bulletdown":
				this.y+=this.speed;
				break;
			case "bulletleft":
				this.x-=this.speed;
				break;
			case "bulletright":
				this.x+=this.speed;
				break;
			case "enemybulletup":
				this.y-=this.speed;
				break;
			case "enemybulletdown":
				this.y+=this.speed;
				break;
			case "enemybulletleft":
				this.x-=this.speed;
				break;
			case "enemybulletright":
				this.x+=this.speed;
				break;
			}
			this.context.drawImage(imageRepository[self], this.x, this.y);

			return false;
		}
	};

	this.isCollidableWith = function(object) {
		return (this.collidableWith[0] === object.type||this.collidableWith[1] === object.type);
	};

	/*
	 * Resets the bullet values
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();

var Wall=function(){

	this.init = function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.collidableWith = ["enemybullet","bullet"];
	this.isColliding = false;
	this.type = "wall";

	this.context=$("#canvas").getContext("2d");
	this.draw=function(){
		this.context.drawImage(imageRepository.wall,this.x,this.y);
	}

	this.isCollidableWith = function(object) {
		return (this.collidableWith[0] === object.type||this.collidableWith[1] === object.type);
	};

}
Wall.prototype=new Drawable();
//敌人对象
var Enemy=function(){

	var enemeyImg=new Image();
	this.alive = false;
	this.firerate=60;
	this.counter=0;
	this.spyInRange=false;
	this.shootRange=8;//设定敌人的胎侧范围（格）

	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	
	this.collidableWith = "bullet";
	this.isColliding = false;
	this.type = "enemy";
	this.direction="";

	this.context=$("#role").getContext("2d");
	this.canvasHeight=$("#role").height;
	this.canvasWidth=$("#role").width;
	this.draw=function(){

		if (this.isColliding) {
			return true;
		}else{

			this.context.clearRect(this.x,this.y,imageRepository.enemy.width,imageRepository.enemy.height);

			switch(this.direction){
				case "up":
				enemeyImg=imageRepository.enemy;
					break;
				case "down":
				enemeyImg=imageRepository.enemydown;
					break;
				case "left":
				enemeyImg=imageRepository.enemyleft
					break;
				case "right":
				enemeyImg=imageRepository.enemyright;
					break;
			}
			this.context.drawImage(enemeyImg||imageRepository.enemy,this.x,this.y);

			return false;
		}
		
	}

	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};

}
Enemy.prototype=new Drawable();

var Map_=function(){

	this.array=[];
	this.patharr=[];
	this.mapcell=32;
	this.maprow=Math.ceil($("#canvas").height/this.mapcell);
	this.mapcol=Math.ceil($("#canvas").width/this.mapcell);
//随机初始化地图，1代表有墙，0代表可行。参数chance代表难度级别
	this.initmaparr=function(chance){
		for(i=0;i<this.maprow;i++){
			this.array[i]=new Array();
			for(j=0;j<this.mapcol;j++){
				this.array[i][j]=Math.random()<chance?1:0;
			}
		}
		this.array[0][0]=0;
		this.array[this.maprow-2][this.mapcol-2]=0;
	};
//用Atar算法寻路
	this.findpath=function(startEndPos,posRecord){
		this.patharr=new Array();
		//将地图数据与开始结束位置传递给寻找路径函数
		var oMap={};
		oMap.maparr=this.array;
		oMap.start_x=startEndPos.start_x;
		oMap.start_y=startEndPos.start_y;
		oMap.end_x=startEndPos.end_x;
		oMap.end_y=startEndPos.end_y;

		this.patharr=Astar(oMap,posRecord);

	};
	
}

function Game(){

	var self=this;
	this.level=[1/10,1/9,1/8,1/7,1/6,1/5,1/4,1/3.5,1/3,1/2.5];//存储难度级别的数组
	this.nowlevel=0;//当前级别
	this.wallArr=[];//存储所有墙对象数组
	this.isGo=false//是否已开始运行
	this.posRecord=[];//记录每个可行方格的位置
	this.enemyPos=[];//记录敌人位置
	this.enemy=[];//敌人对象（多个）数组
	this.then=Date.now();
	//动画开始循环时间，用于展现每秒帧数
	this.fpsCount=0;//控制帧数展示的更新时间;
	this.startEndPos={
		start_x:0,
		start_y:0,
		end_x:0,
		end_y:0,
	};//记录起始与结束位置的数组
	

	this.init=function(){

		this.creatCans();

		this.map=new Map_();
		this.spy=new Spy();
		this.target=new Target();
		
		this.enemybulletup=new Pool(10);
		this.enemybulletdown=new Pool(10);
		this.enemybulletleft=new Pool(10);
		this.enemybulletright=new Pool(10);
		this.enemybulletup.init("enemybulletup");
		this.enemybulletdown.init("enemybulletdown");
		this.enemybulletleft.init("enemybulletleft");
		this.enemybulletright.init("enemybulletright");
		this.enemyBulletLibrary ={
			up:this.enemybulletup,
			down:this.enemybulletdown,
			left:this.enemybulletleft,
			right:this.enemybulletright,
		}
		this.spy.init(0,0,imageRepository.spy.width,imageRepository.spy.height);
		this.target.init((this.map.mapcol-2)*32,(this.map.maprow-2)*32,imageRepository.target.width,imageRepository.target.height);
		for(var i=0;i<3;i++){
			this.enemy[i]=new Enemy();
			this.enemy[i].direction="up";
			this.enemy[i].alive=true;
			this.enemy[i].init(0,0,imageRepository.enemy.width,imageRepository.enemy.height);
		}

		this.startEndPos.end_x=this.map.maprow-2;
		this.startEndPos.end_y=this.map.mapcol-2;

		addEvent($("#role"),"click",function(event){
			if(!self.spy.isColliding&&$){
				self.startEndPos.end_x=Math.floor(event.clientY/self.map.mapcell);	
				self.startEndPos.end_y=Math.floor(event.clientX/self.map.mapcell);
				self.findSpecPath();
			}
			
		});
	//按下空格键射击
		addEvent($("html"),"keydown",function(event){
			if(getKeyCode(event)==32&&self.spy.counter>self.spy.firerate&&!self.spy.isColliding){
				self.spy.counter=0;
				self.spy.fire();
			}
		});
	//spy被射击后重新开始
		addEvent($("#restart"),"click",function(event){
			$("#gameovershader").style.display="none";
			self.isGo=false;
			$("#fpscount").innerHTML="";
			self.reset();
			self.start();
		});
	//初始化四叉树
		this.quadTree = new QuadTree({x:0,y:0,width:$("canvas").width,height:$("canvas").height});

		this.start();


	}

	this.start=function(){
		this.map.patharr=[];
		//寻路，直到找到可行路径
		while(this.map.patharr.length==0){
			this.map.initmaparr(this.level[this.nowlevel]);
			this.map.findpath(this.startEndPos,this.posRecord);
		}
		//每个敌人的参考位置
		var refPos=[
			[this.posRecord[Math.floor(this.posRecord.length/2)].x,this.posRecord[Math.floor(this.posRecord.length/2)].y],
			[this.posRecord[Math.floor(this.posRecord.length/4)].x,this.posRecord[Math.floor(this.posRecord.length/4)].y],
			[this.posRecord[Math.floor(this.posRecord.length*3/4)].x,this.posRecord[Math.floor(this.posRecord.length*3/4)].y],

		]

		for(var i=0;i<refPos.length;i++){
			this.enemyPos[i]=new Array();
			//以此参考位置中心向周围定位合适的敌人位置
			this.enemyPos[i]=this.getEnemeyPos(refPos[i][0],refPos[i][1]);
		}
		

		this.drawMap();
	}

	this.creatCans=function(){
		var oCanvas,oCanvasRole;
		//添加画布元素
		oCanvasRole=document.createElement("canvas");
		oCanvasRole.id="role";
		oCanvasRole.width=$("body").clientWidth;
		oCanvasRole.height=$("body").clientHeight;
		oCanvasRole.innerHTML="您的浏览器不支持canvas";
		$("body").insertBefore(oCanvasRole,$("body").firstChild);
		
		$("body").innerHTML="<div id='fps'>fps:<span id='fpscount'></span></div>"+$("body").innerHTML;

		oCanvas=document.createElement("canvas");
		oCanvas.id="canvas";
		oCanvas.width=$("body").clientWidth;
		oCanvas.height=$("body").clientHeight;
		oCanvas.innerHTML="您的浏览器不支持canvas";
		$("body").insertBefore(oCanvas,$("body").firstChild);
	
		$("body").innerHTML="<div id='gameovershader'><div id='textbox'><p id='tittle'>Game Over !</p><p id='restart'>RESTART</p></div></div>"+$("body").innerHTML;

		var ctxrole = document.getElementById('role').getContext('2d');
		ctxrole.fillStyle = "rgba(0,0,0,0)";
		ctxrole.fillRect(0,0,oCanvasRole.width,oCanvasRole.height);

		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0,0,oCanvas.width,oCanvas.height);
	}

	this.getEnemeyPos=function(ref_x,ref_y){
		var pos_x,pos_y;
		var returnPos=new Array();
		pos_x=ref_x;
		pos_y=ref_y;
		outerbreak:
		for(var j=0;j<=4;j++){
			for(var i=0;i<=4;i++){
				if(this.map.array[pos_x-i]!=undefined&&this.map.array[pos_x-i][pos_y-i]!=undefined){
					if(this.map.array[pos_x-i][pos_y-j]==0){
						pos_x=pos_x-i;
						pos_y=pos_y-j;
						break outerbreak;
					}
				}

				if(this.map.array[pos_x+i]!=undefined&&this.map.array[pos_x+i][pos_y+i]!=undefined){
					if(this.map.array[pos_x+i][pos_y+j]==0){
						pos_x=pos_x+i;
						pos_y=pos_y+j;
						break outerbreak;
					}
				}	

			}
		}

		returnPos[0]=pos_x;
		returnPos[1]=pos_y;

		return returnPos;

	}

	this.drawMap=function(){

		for (var i=0;i<this.map.array.length;i++){
			for (var j=0;j<this.map.array[i].length;j++){
				if(this.map.array[i][j]==1){
					var wall=new Wall();
					wall.init(32*j,32*i,imageRepository.wall.width,imageRepository.wall.height)
					this.wallArr.push(wall);
					wall.draw();
				}
			}
		}
		for(var i=0;i<this.enemy.length;i++){
			this.enemy[i].y=this.enemyPos[i][0]*this.map.mapcell;
			this.enemy[i].x=this.enemyPos[i][1]*this.map.mapcell;
			this.map.array[this.enemyPos[i][0]][this.enemyPos[i][1]]=1;
			this.enemy[i].draw();
		}

		this.spy.draw();
		this.target.draw();

	}
	//寻找由用户点击后的特定路径
	this.findSpecPath=function(){
		var self=this;
		if(this.spy.isStop){
		//获取由用户点击后得出的目标位置
			if(this.startEndPos.start_x!=this.startEndPos.end_x||this.startEndPos.start_y!=this.startEndPos.end_y){
				this.map.findpath(this.startEndPos);//查找路径
				this.spy.isStop=false;

				if(this.map.patharr[0]!="false"){
					if(this.map.patharr.length!=0){
						this.spy.patharr=this.map.patharr;
						self.spy.cnt=0;
						if(!this.isGo){
							this.then=Date.now();
							this.isGo=true;
							this.go();
						}
						this.startEndPos.start_x=this.startEndPos.end_x;
						this.startEndPos.start_y=this.startEndPos.end_y;
						
					}
					if(this.map.patharr.length==0){
						
						alert("无可行路径，请重新确认");
						this.spy.isStop=true;
					}
				}
				else{
					alert("终点位置不可用，请重新确认");
					this.spy.isStop=true;
				}
			}
		}
	};
//在游戏结束或者重来或者升级的时候初始化某系参数
	this.reset=function(){
		$("#role").getContext("2d").clearRect(0,0,this.spy.canvasWidth,this.spy.canvasHeight);

		$("#canvas").getContext("2d").clearRect(0,0,this.spy.canvasWidth,this.spy.canvasHeight);
		var oCanvas=$("#canvas");
		var ctx = oCanvas.getContext('2d');
		ctx.fillRect(0,0,oCanvas.width,oCanvas.height);

		this.spy.init(0,0,imageRepository.spy.width,imageRepository.spy.height);
		this.spy.isColliding=false;
		this.spy.isStop=true;
	
		this.startEndPos.start_x=0;
		this.startEndPos.start_y=0;
		this.startEndPos.end_x=this.map.maprow-2;
		this.startEndPos.end_y=this.map.mapcol-2;
		this.posRecord=[];
		
		for(var i=0;i<this.enemy.length;i++){
			this.enemy[i].isColliding=false;
		}
		
		this.wallArr=[];
		this.quadTree.clear();
		this.enemybulletup.init("enemybulletup");
		this.enemybulletdown.init("enemybulletdown");
		this.enemybulletleft.init("enemybulletleft");
		this.enemybulletright.init("enemybulletright");
		this.spy.bulletup.init("bulletup");
		this.spy.bulletdown.init("bulletdown");
		this.spy.bulletleft.init("bulletleft");
		this.spy.bulletright.init("bulletright");

		self.spy.levelUp=false;
	}
//主角是否进入到敌人的射击范围
	this.checkIfinRange=function(){
		var distance;
		for(var i=0;i<this.enemy.length;i++){
			if(this.enemy[i].x==this.spy.x){
				distance=(this.enemy[i].y-this.spy.y)/this.map.mapcell;
				if(Math.abs(distance)<=this.enemy[i].shootRange){
					this.enemy[i].spyInRange=true;
					this.enemy[i].direction=distance>0?"up":"down";
				}
			}else if(this.enemy[i].y==this.spy.y){
				distance=(this.enemy[i].x-this.spy.x)/this.map.mapcell;
				if(Math.abs(distance)<=this.enemy[i].shootRange){
					this.enemy[i].spyInRange=true;
					this.enemy[i].direction=distance>0?"left":"right";
				}
			}
			else{
				this.enemy[i].spyInRange=false;
			}
		}
	}
//敌人开始设计，初始化子弹位置
	this.enemyShoot=function(){
		for(var i=0;i<this.enemy.length;i++){
			if(this.enemy[i].counter>this.enemy[i].firerate&&this.enemy[i].spyInRange&&!this.enemy[i].isColliding){
				switch(this.enemy[i].direction){
				case "up":
					this.enemyBulletLibrary["up"].get(this.enemy[i].x+15,this.enemy[i].y-10,.3);
					break;
				case "down":
					this.enemyBulletLibrary["down"].get(this.enemy[i].x+15,this.enemy[i].y+28,.3);
					break;
				case "left":
					this.enemyBulletLibrary["left"].get(this.enemy[i].x-10,this.enemy[i].y+15,.3);
					break;
				case "right":
					this.enemyBulletLibrary["right"].get(this.enemy[i].x+28,this.enemy[i].y+15,.5);
					break;
				}
				this.enemy[i].counter=0;
			}

		}

	};


//开始动画
	this.go=function(){
		var myReq;
		myReq=requestAnimationFrame(self.go);		
		self.quadTree.clear();
		self.quadTree.insert(self.spy);

//展现每秒帧数
		var now = Date.now();
		var delta = (1000/(now - self.then)).toFixed(1)	
		self.fpsCount++;
		if(self.fpsCount==5){
			$("#fpscount").innerHTML=delta;
			self.fpsCount=0;
		}
//将所有需碰撞检测对象放进四叉树
		for(var p in self.spy.bulletLibrary){
			self.quadTree.insert(self.spy.bulletLibrary[p].getPool());
		}
		for(var p in self.enemyBulletLibrary){
			self.quadTree.insert(self.enemyBulletLibrary[p].getPool());
		}
		for(var i=0;i<self.enemy.length;i++){
			if(!self.enemy[i].isColliding){
				self.quadTree.insert(self.enemy[i]);
			}
		}
		
		self.quadTree.insert(self.wallArr);
		detectCollision(self);

//绘制主角
		self.spy.move();

		if(self.spy.isColliding){			
			cancelAnimationFrame(myReq);
			$("#gameovershader").style.display="block";	
		}
		if(self.spy.levelUp){

			alert("Congratulation!!Level up!!"+"\n"+"\n"+"Now Level: Level "+(self.nowlevel+1));
			self.nowlevel++;
			if(self.nowlevel==self.level.length){
				alert("Excellent!!You've completed the task!");
				self.nowlevel=0;
			}
			self.spy.levelUp=false;
			self.reset();
			self.start();
		}

		self.spy.counter++;
		//绘制主角子弹
		for(var p in self.spy.bulletLibrary){
			self.spy.bulletLibrary[p].animate();
		}

		self.checkIfinRange();
//绘制敌人
		for(var i=0;i<self.enemy.length;i++){
			self.enemy[i].draw();
			if(self.enemy[i].isColliding)
			{
				if(self.map.array[self.enemy[i].y/32][self.enemy[i].x/32]==1){
					self.enemy[i].context.clearRect(self.enemy[i].x,self.enemy[i].y,imageRepository.enemy.width,imageRepository.enemy.height);
				}
				self.map.array[self.enemy[i].y/32][self.enemy[i].x/32]=0;
			}
			self.enemy[i].counter++;
		}
//绘制敌人子弹
		for(var i=0;i<self.enemy.length;i++){
			self.enemyShoot();
			for(var p in self.enemyBulletLibrary){
				self.enemyBulletLibrary[p].animate();
			}   
		}

		self.then = now;
	}

}
//碰撞检测
function detectCollision(game) {
	var objects = [];
	//获得在四叉树划定范围内可碰撞对象
	game.quadTree.getAllObjects(objects);
	for (var x = 0, len = objects.length; x < len; x++) {
		game.quadTree.findObjects(obj = [], objects[x]);

		for (y = 0, length = obj.length; y < length; y++) {
			// DETECT COLLISION ALGORITHM
			if (objects[x].isCollidableWith(obj[y]) &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[x].height > obj[y].y)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
			}
		}
	}
};



