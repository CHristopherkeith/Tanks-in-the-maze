Astar=function(oMap,posRecord){

	getRound=function(maparr,curr){
			//console.log(curr.x);
			//console.log(curr.y);
			var getRound_=[];
			var upNode={},downNode={},leftNode={},rightNode={};
			//upNode.value=maparr[];
			upNode.direction="up";
			upNode.x=curr.x-1;
			upNode.y=curr.y;

			downNode.direction="down";
			downNode.x=curr.x+1;
			downNode.y=curr.y;

			leftNode.direction="left";
			leftNode.x=curr.x;
			leftNode.y=curr.y-1;

			rightNode.direction="right";
			rightNode.x=curr.x;
			rightNode.y=curr.y+1;

			/*
			var downNode=maparr[curr_x+1][curr_y];
			var leftNode=maparr[curr_x][curr_y-1];
			var rightNode=maparr[curr_x][curr_y+1];*/
			//console.log(maparr);
			//console.log(maparr[-1]);
			if(maparr[upNode.x]!=undefined&&maparr[upNode.x][upNode.y]!=undefined){
				getRound_.push(upNode);
			}

			if(maparr[downNode.x]!=undefined&&maparr[downNode.x][downNode.y]!=undefined){
				getRound_.push(downNode);
			}

			if(maparr[leftNode.x]!=undefined&&maparr[leftNode.x][leftNode.y]!=undefined){
				getRound_.push(leftNode);
			}

			if(maparr[rightNode.x]!=undefined&&maparr[rightNode.x][rightNode.y]!=undefined){
				getRound_.push(rightNode);
			}

			return getRound_;
		}

		function sortNumber(a, b){
			return a.F - b.F
		}

/*******************判断是否在OPEN集合**************/
		ifInOpen=function(node_){
			for(var i=0;i<open.length;i++){
				if(open[i].x==node_.x&&open[i].y==node_.y){
					return true;
					break;
				}
			}
			return false;
		}
/*******************判断是否在CLOSE集合**************/
		ifInClose=function(node_){
			for(var i=0;i<close.length;i++){
				if(close[i].x==node_.x&&close[i].y==node_.y){
					return true;
					break;
				}
			}
			return false;
		}
/*******************计算G,H,F值**************/
		calPathLength=function(node_,curr_){
			//var hDistance=Math.abs(parseInt(endId)-parseInt(node_.id));
			node_.G=curr_.G+1;
			//node_.H=Math.floor(hDistance/10)+Math.abs(parseInt(endId)%10-parseInt(node_.id)%10);
			node_.H=Math.abs(node_.x-END.x)+Math.abs(node_.y-END.y);
			//console.log(node_.direction)
			//console.log("x    "+Math.abs(node_.x-END.x))
			//console.log("y    "+Math.abs(node_.y-END.y))
			node_.F=node_.G+node_.H;
		}

		var open=[],close=[],path=[],round=[],/*storePath=[],storeMark=[],*/START={},END={},curr={};
		var patharr=[];
		var maparr=oMap.maparr;

		START.x=oMap.start_x;
		START.y=oMap.start_y;

		END.x=oMap.end_x;
		END.y=oMap.end_y;
		//console.log(END.x)
		//console.log(END.y)

		/*
		var pathTarget=document.getElementsByClassName("path");
		var markTarget=document.getElementsByClassName("mark");
		*/

/*******************清除前一次路径标识**************/
/*
		for(var i=0;i<pathTarget.length;i++){
			storePath[i]=pathTarget[i];
		}
		for(var i=0;i<storePath.length;i++){
			storePath[i].className="chessblock";
		}
		for(var i=0;i<markTarget.length;i++){
			storeMark[i]=markTarget[i];
		}
		for(var i=0;i<storeMark.length;i++){
			storeMark[i].className="chessblock";
		}*/
		//console.log(END.x)
		//console.log(END.y)
		if(maparr[END.x][END.y]==1){
			//clearInterval(timeFlag);
			//timeFlag=0;
			//alert("终点位置不可用，请重新确认");
			
			patharr.push("false");
			//console.log(patharr)
			return patharr;
		}



		START.G=0;
		START.H=0;
		START.F=0;
		curr=START;
		open.push(curr);

		outermost:
		while(open.length){

			round=getRound(maparr,curr);
			for(var i=0;i<round.length;i++){

				if(!ifInOpen(round[i])&&!ifInClose(round[i])&&!maparr[round[i].x][round[i].y]){
					round[i].parent=curr;
					calPathLength(round[i],curr);
					open.push(round[i]);
					//round[i].className="mark";
					//console.log(round[i])
					//console.log(round[i])
					if(round[i].x==END.x&&round[i].y==END.y){
						break outermost;
					}
					
				}
				
				if(ifInOpen(round[i])&&round[i]!=curr){
					if((curr.G+1)<round[i].G){
						round[i].parent=curr;
						round[i].G=curr.G+1;
						round[i].F=round[i].G+round[i].H;
					}				
				}
				
			}

			close.push(curr);
			open.shift();
			open.sort(sortNumber);

			curr=open[0];
			//console.log(open[0])

		}
		
		curr=open[open.length-1];

		if(!open.length){
			return patharr;
		}
		else{
			while(curr!=START){
				patharr.push(curr.direction);
				//console.log(typeof posRecord)
				if(typeof posRecord==="object"){
					posRecord.push(curr);
				}
				curr=curr.parent;
			}
			if(typeof posRecord==="object"){
				posRecord.reverse();
			}
			return patharr.reverse();
		}
}