import Tools from './Tools.js'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';


class Graph extends Component {
	constructor(props) {
		super(props);
		//this.setSomeVariable = this.setSomeVariable.bind(this);
		this.MouseDown = this.MouseDown.bind(this);
		this.MouseMove = this.MouseMove.bind(this);
		this.MouseUp = this.MouseUp.bind(this);
		this.ZoomOut = this.ZoomOut.bind(this);
		this.TogglePause = this.TogglePause.bind(this);
		this.ToggleDotMode = this.ToggleDotMode.bind(this);
		this.ToggleMaxHFlag = this.ToggleMaxHFlag.bind(this);
		this.ToggleAvgFlag = this.ToggleAvgFlag.bind(this);
		this.GetExpoValues = this.GetExpoValues.bind(this);
		this.AVGNumSet = this.AVGNumSet.bind(this);
		this.state = {
			pauseFlag : 0,
			forcePlot : 0,
			zoomFlag : 0,
			maxHFlag : 0,
			plotNum : 0,
			refLevel : -1,
			AXES_STEP_NUM_Y : -1,
			dotFlag : 0,
			avgFlag : 0,
		}
	}
	
	AVGNumSet(){

	var avgNum = parseInt(prompt("Enter Avg Num", this.global.accNum));
	if(avgNum || avgNum == 0)
	{
		this.global.accNum = avgNum;
	}
}


	ZoomOut (){
		this.state.forcePlot = 1;
		this.setState({zoomFlag : 0});
		this.global.sxIndex = 0;
		this.global.exIndex = 0;
		this.state.refLevel = -1;
		//this.Plot();
	}

	TogglePause()
	{
		if(this.state.pauseFlag == 0)
		{
			this.setState({pauseFlag : 1});
		}

		else
		{
			this.setState({pauseFlag : 0});
		}
	}


	ToggleMaxHFlag()
	{
		if(this.state.maxHFlag == 0)
		{
			this.setState({maxHFlag : 1});
		}

		else
		{
			this.setState({maxHFlag : 0});
			this.global.maxHoldBuffer = []
		}
	}

	ToggleAvgFlag()
	{
		if(this.state.avgFlag == 0)
		{
			this.setState({avgFlag : 1});
		}

		else
		{
			this.setState({avgFlag : 0});
			this.global.avgAcc = [];
		}
	}
	
	ToggleDotMode (ptr)
	{
		if(this.state.dotFlag == 0)
		{
			this.setState({dotFlag : 1});
		}

		else
		{
			this.setState({dotFlag : 0});
		}
	}


	componentWillMount() {

		//this.props.data.y[0] = [0];
		//this.props.data.y[1] = [0];

	}
	componentDidMount = ()=> {
		console.log("componentDidMount = ");
		var i;
		for(i = 0; i < 100000; i++)
		{
			this.global.gx[i] = i;
		}

        this.InitCanvas();
//		setInterval(this.Test.bind(this), 10);
		this.Plot();
		this.refs.canvas2.addEventListener("mousedown", this.MouseDown);
		this.refs.canvas2.addEventListener("mousemove", this.MouseMove);
		this.refs.canvas2.addEventListener("mouseup", this.MouseUp.bind(this));
    }



	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.hidden == 0 && this.global.updateFlag == 1)
		{
			this.global.updateFlag = 0;
			return true;
		}
		else
		{
			console.log("updateFlag = ", this.global.updateFlag);

			return false;
		}
	}

	componentDidUpdate()
	{
		if(this.props.data.y[0] != undefined)
		{
			//if(this.props.data.y[1] != undefined)
			{
				this.Plot();
			}
		}
	}

	FindMaxH(inn, prev)
	{
		var out = [];
		var i;
		if(prev)
		{
			for(i = 0; i < inn.length; i++)
			{
				if(inn[i] > prev[i])
				{
					out[i] = inn[i];
				}
				else
				{
					out[i] = prev[i];
				}
			}
			return out;
		}
		else{
			return inn;
		}

	}
	
	global = {
		padding : {
			x : {left : 90, right : 80},
			y : {up:70 , down:70}
		},
		sxIndex : 0,
		gx : [],
		maxHoldBuffer : [],
		avgAcc : [],
		accNum : 10,
		FIRST_ROW_WIDTH : 50,
		updateFlag : 0,

	}


	showAxes() {

		//ctx1.textAlign="center"; 

		var ptr = this.global;
		var step = (ptr.maxX - ptr.minX) * 1 / ptr.AXES_STEP_NUM_X;


		//x grid
		ptr.ctx1.closePath();
		ptr.ctx1.beginPath();
		ptr.ctx1.font="15px Arial";
		ptr.ctx1.strokeStyle = "green"; 
		ptr.ctx1.lineWidth = "1";
		for(var i = 0; i <= ptr.AXES_STEP_NUM_X; i++)
		{
			ptr.ctx1.moveTo(this.global.padding.x.left + ptr.scaleX * i * step, ptr.canvas1.height - this.global.padding.y.up);
			ptr.ctx1.lineTo(this.global.padding.x.left + ptr.scaleX * i * step, this.global.padding.y.down);;

		}


		//y grid
		step = (ptr.maxY - ptr.minY) * 1 / this.state.AXES_STEP_NUM_Y;
		for(i = 1; i <= this.state.AXES_STEP_NUM_Y; i++)
		{
			ptr.ctx1.moveTo(this.global.padding.x.left, ptr.canvas1.height - this.global.padding.y.up - ptr.scaleY * i * step);
			ptr.ctx1.lineTo(ptr.canvas1.width - this.global.padding.x.right, ptr.canvas1.height - this.global.padding.y.up - ptr.scaleY * i * step)

		}

		ptr.ctx1.stroke();
		ptr.ctx1.closePath();



		ptr.ctx1.beginPath();
		ptr.ctx1.lineWidth = "2";
		ptr.ctx1.strokeStyle = "white"; 
		ptr.ctx1.fillStyle = "white";

		// X axis
		ptr.ctx1.moveTo(this.global.padding.x.left, ptr.canvas1.height - this.global.padding.y.up);
		ptr.ctx1.lineTo(ptr.canvas1.width - this.global.padding.x.right, ptr.canvas1.height - this.global.padding.y.up);  

		//Y axis
		ptr.ctx1.moveTo(this.global.padding.x.left, this.global.padding.y.down);  
		ptr.ctx1.lineTo(this.global.padding.x.left, ptr.canvas1.height - this.global.padding.y.up);

		//x label
		step = (ptr.maxX - ptr.minX) * 1 / ptr.AXES_STEP_NUM_X;
		var w1 = ptr.ctx1.measureText(ptr.maxX).width;
		var w2 = ptr.ctx1.measureText(ptr.minX).width;
		var showRotatedX = 0;
		if(w1 > ptr.scaleX * step - 12 || w2 > ptr.scaleX * step - 12)
		{
			showRotatedX = 1;
		}

		var minP = this.GetExpoValues(ptr.minX).power;
		var maxP = this.GetExpoValues(ptr.maxX).power;
		var showScien = 0;
		if(Math.abs(minP) > 3 || Math.abs(maxP) > 3)
		{
			showScien = 0;
		}


		for(i = 0; i <= ptr.AXES_STEP_NUM_X; i++)
		{
			var xl = ptr.minX + i * step;
			ptr.ctx1.moveTo(this.global.padding.x.left + ptr.scaleX * i * step, ptr.canvas1.height - this.global.padding.y.up);

			//zaedehaye x
			ptr.ctx1.lineTo(this.global.padding.x.left + ptr.scaleX * i * step, ptr.canvas1.height - this.global.padding.y.down + this.global.padding / 4);
			var w = ptr.ctx1.measureText(xl).width;
			xl = Math.round(xl * 10000) / 10000;


			if(showScien == 1)
			{
				var ans = this.GetExpoValues(xl);
				var base = Math.round(ans.base * 10000) / 10000;
				w = ptr.ctx1.measureText(base + "e" + ans.power).width;
			}

			//rotate canvas
			if(showRotatedX == 1)
			{
				ptr.ctx1.save();
				ptr.ctx1.translate(this.global.padding.x.left + ptr.scaleX * i * step, ptr.canvas1.height - this.global.padding.y.up + 10 );
				ptr.ctx1.rotate(Math.PI / 4);
				ptr.ctx1.textAlign = 'left';
				if(showScien == 1)
				{
					ptr.ctx1.fillText(base + "e" + ans.power, 0, 0);
				}
				else
				{
					ptr.ctx1.fillText(xl, 0, 0);
				}
				ptr.ctx1.stroke();	
				//ptr.ctx1.fillRect(x, y, 2, 2);
			}

			else
			{
				ptr.ctx1.fillText(xl, this.global.padding.x.left + ptr.scaleX * i * step - w / 2, ptr.canvas1.height - this.global.padding.y.up + this.global.X_LABEL_PADDING);
			}
			ptr.ctx1.restore();
		}

		//y label
		step = (ptr.maxY - ptr.minY) * 1 / this.state.AXES_STEP_NUM_Y;
		minP = this.GetExpoValues(ptr.minY).power;
		maxP = this.GetExpoValues(ptr.maxY).power;
		showScien = 0;
		if(Math.abs(minP) > 5 || Math.abs(maxP) > 5)
		{
			showScien = 1;
		}
		for(i = 0; i <= this.state.AXES_STEP_NUM_Y; i++)
		{
			var yl = parseFloat(ptr.minY + i * step);
			if(showScien == 1)
			{
				ans = this.GetExpoValues(yl);
				//yl = Math.round(parseFloat(ans.base) * Math.pow(10, ans.power) * Math.pow(10, -ans.power)) * Math.pow(10, ans.power) ;
				//yl = yl.toExponential();
				base = Math.round(ans.base * 10000) / 10000;
				w = ptr.ctx1.measureText(base + "e" + ans.power).width;
				ptr.ctx1.fillText(base + "e" + ans.power, this.global.padding.x.left - w - 10, ptr.canvas1.height - this.global.padding.y.down - ptr.scaleY * i * step);
			}
			else
			{
				yl = Math.round(yl * 10000) / 10000;
				w = ptr.ctx1.measureText(yl).width;
				ptr.ctx1.fillText(yl, this.global.padding.x.left - w - 10, ptr.canvas1.height - this.global.padding.y.up - ptr.scaleY * i * step);

			}
		}
		ptr.ctx1.stroke();
		ptr.ctx1.closePath();

	}



	MouseDown (e){
		var rect = this.global.canvas2.getBoundingClientRect();
		this.global.startX = parseInt(e.clientX) - rect.left;
		this.global.startY = parseInt(e.clientY) - rect.top;
		this.global.downFlag = 1;
	}	



	MouseMove (e) {
		if(this.global.downFlag == 1)
		{
			if(this.global.panFlag == 1)
			{

			}
			else
			{
				this.global.ctx3.clearRect(0, 0, this.global.canvas3.width, this.global.canvas3.height);
				this.global.ctx2.fillStyle = "white";
				this.global.ctx2.font="bold 15px Arial";
				this.global.ctx2.lineWidth = "2";
				this.global.mouseMove = 1;
				this.global.ctx2.beginPath();

				this.global.ctx2.clearRect(0, 0, this.global.canvas2.width, this.global.canvas2.height);
				this.global.ctx2.stroke();
				var rect = this.global.canvas2.getBoundingClientRect();
				var mouseX = parseInt(e.clientX);
				var mouseY = parseInt(e.clientY);
				mouseX = mouseX - rect.left;
				mouseY = mouseY - rect.top;
				this.global.ctx2.closePath();
				this.global.ctx2.beginPath();
				this.global.ctx2.strokeStyle = "white";
				this.global.ctx2.rect(this.global.startX, this.global.startY, mouseX - this.global.startX, mouseY - this.global.startY);


				var sx = Math.round((this.global.startX - this.global.padding.x.left) / this.global.scaleX) + this.global.minX;
				x = Math.round((mouseX - this.global.padding.x.left) / this.global.scaleX) + this.global.minX;
				this.global.ctx2.fillText(x, mouseX + 5, mouseY + 5);
				this.global.ctx2.fillText(sx, this.global.startX, this.global.startY - 5);
				this.global.ctx2.closePath();
				this.global.ctx2.stroke();
				this.global.ctx2.closePath();
			}
		}
		else
		{
			var rect = this.global.canvas2.getBoundingClientRect();
			mouseX = parseInt(e.clientX);
			mouseY = parseInt(e.clientY);
			mouseX = mouseX - rect.left;
			mouseY = mouseY - parseInt(rect.top);

			var x = Math.round((mouseX - this.global.padding.x.left) / this.global.scaleX) + this.global.minX;
			var indexX = this.FindIndex(this.global.xPlot, x);
			var Xcanvas = this.FindX(this.global, x);
			this.global.ctx3.clearRect(0, 0, this.global.canvas3.width, this.global.canvas3.height);



			var th = 12;//Math.min( 12 / this.global.scaleX, 12 / this.global.scaleY);
			var found = 0;
			var y;
			for(var i = 0; i < this.state.plotNum; i++)
			{
				y = this.global.yPlot[i][indexX];
				var ycanvas = this.FindY(this.global, y);
				y = Math.round(y * 10000) / 10000;
				if(Math.abs(mouseX - Xcanvas) < th && Math.abs(mouseY - ycanvas) < th)
				{
					this.global.ctx3.fillText(x.toString() +  ", " + y.toString(), mouseX, mouseY);
					found = 1;
				}

			}

			if(found == 0)
			{
				this.global.ctx3.clearRect(0, 0, this.global.canvas3.width, this.global.canvas3.height);
			}
			var prevMouseX = mouseX;
			var prevMouseY = mouseY;

		}

	}	



	MouseUp(e) {
		if(this.global.downFlag == 1 && this.global.mouseMove == 1)
		{
			this.global.mouseMove = 0;
			var rect = this.global.canvas2.getBoundingClientRect();
			var zoomStartX = Math.round((this.global.startX - this.global.padding.x.left) / this.global.scaleX);    //x[0] 
			var zoomEndX = (parseInt(e.clientX) - rect.left - this.global.padding.x.left) / this.global.scaleX; 

			var zoomStartY = ((this.global.canvas3.height - this.global.padding.y.down - this.global.startY) / this.global.scaleY) + this.global.minY;
			var zoomEndY = ((this.global.canvas3.height - this.global.padding.y.down - (parseInt(e.clientY) - rect.top)) / this.global.scaleY + this.global.minY);

			var minY, maxY;
			if(zoomEndY > zoomStartY)
			{
				maxY = zoomEndY;
				minY = zoomStartY;
			}
			else
			{
				minY = zoomEndY;
				maxY = zoomStartY;
			}

			if(zoomStartX > zoomEndX)
			{
				var temp = zoomEndX;
				zoomEndX = zoomStartX;
				zoomStartX = temp;
			}
			var ex = this.global.minX + zoomEndX;
			if(zoomEndX + this.global.minX > this.global.maxXOrig /*this.global.maxX*/)
			{
				ex = this.global.maxXOrig;
			}
			var sx = this.global.minX + zoomStartX;
			if(sx < this.global.minX)
			{
				sx = this.global.minX;
			}


			if(zoomEndX - zoomStartX > 1)
			{
				this.global.ctx2.beginPath();
				this.global.ctx2.clearRect(0, 0, this.global.canvas2.width, this.global.canvas2.height);
				this.global.downFlag = 0;
				this.global.ctx1.clearRect(0, 0, this.global.canvas1.width, this.global.canvas1.height);


				temp = [];
				temp = this.FindMinMax(this.global, minY, maxY);
				this.global.zoomMinY = temp.min;
				this.global.zoomMaxY = temp.max;
				this.state.AXES_STEP_NUM_Y = temp.stepNum;
				var sy = temp.max - temp.min;
				this.global.scaleY = this.global.canvas1.height / sy - 2 * this.global.padding.y.up / sy;


				temp = [];
				temp = this.FindMinMax(this.global, sx, ex);
				this.global.zoomMinX = temp.min;
				this.global.zoomMaxX = temp.max;
				this.global.AXES_STEP_NUM_X = temp.stepNum;
				var sxx = temp.max - temp.min;
				this.global.scaleX = this.global.canvas1.width / sxx - (this.global.padding.x.left + this.global.padding.x.right) / sxx;

				//y = Math.round((this.global.canvas3.height - this.global.padding.y - mouseY) / this.global.scaleY) + this.global.minY;
				var prevSxIndex = this.global.sxIndex;
				this.global.sxIndex = this.FindIndex(this.global.xPlot, sx) + prevSxIndex;
				this.global.exIndex = this.FindIndex(this.global.xPlot, ex) + prevSxIndex;

				this.global.xPlot = this.global.xPlot.slice(this.global.sxIndex - prevSxIndex , this.global.exIndex - prevSxIndex + 1);

				this.global.ctx2.stroke();
				this.global.forcePlot = 1;
				this.state.zoomFlag = 1;
				this.state.forcePlot = 1;
				this.Plot(); 
			}
		}	
		this.global.downFlag = 0;
		this.global.mouseMove = 0;
		this.global.ctx2.clearRect(0, 0, this.global.canvas2.width, this.global.canvas2.height);
	}	

	FindX(test,x){
		return(this.global.padding.x.left + (x - this.global.minX) * this.global.scaleX);
	}


	FindIndex(arr, val){
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i] >= val)
			{
				return i;
			}
		}
		return (arr.length - 1);
	}



	FindMinMax(ptr, min, max){
		var i;
		var temp;
		var minY, maxY;
		minY = min;
		maxY = max;

		if(maxY - minY > 2)
		{
			maxY = Math.round(maxY);
			minY = Math.round(minY);
		}
		this.global.maxYOrig = maxY;
		this.global.minYOrig = minY;

		if(maxY == minY)
		{
			if(minY == 0)
			{
				minY = -1;
				maxY = 1;
			}
			else
			{
				temp = maxY;
				maxY = temp + 1;
				minY = temp - 1;
			}
		}
		if(maxY == Infinity || minY == -Infinity)
		{
			//alert("Infinity Number");
		}


		//d baraye on ast ta step ha addade ghabeleghabuli shavad
		var ss = -1;
		if((maxY < 1 && maxY> -1 & maxY < 1 && maxY> -1) || ((maxY - minY) > -1 && (maxY - minY) < 1))
		{
			ss = Math.min(Math.floor(Math.log10(Math.abs(maxY))), Math.floor(Math.log10(Math.abs(maxY))), Math.floor(Math.log10(maxY - minY)));
			ss = -ss;
			maxY = maxY * Math.pow(10, ss);
			minY = minY * Math.pow(10, ss);
		}
		var d = maxY - minY;
		d = Math.round(d / 10);
		temp = Math.pow(10, d.toString().length - 1);
		d = d + temp - (d % temp);


		/*
		   ans = GetExpoValues(d);
		   this.base = ans.base;
		   this.power = ans.power;

		   d = Math.round(this.base * 10 / 10);
		   temp = Math.pow(10, d.toString().length - 1);
		   d = d + temp - (d % temp);
		   d = d * Math.pow(10, this.power - 1);
		   */

		if(Math.abs(minY) % d != 0)
		{
			if(minY < 0)
			{
				minY = minY + (Math.abs(minY) % d) - d;
			}
			else
				minY = minY - (minY % d);
		}

		if(maxY % d != 0)
		{
			if(maxY > 0)
			{
				maxY = maxY + d - (maxY % d);
			}

			else
			{
				maxY = maxY - (maxY % d);
			}

		}
		if(ss != -1)
		{

			maxY = maxY * Math.pow(10, -ss);
			minY = minY * Math.pow(10, -ss);
		}
		var out = [];
		var stepNum = Math.ceil((maxY - minY) / d);
		var step = (maxY - minY) / stepNum;


		out.min = minY;
			out.max = maxY;

		var s = maxY - this.global.minX;
		out.scale = ptr.canvas1.width / s - (this.global.padding.x.left + this.global.padding.x.right) / s;
		out.stepNum = Math.ceil((maxY - minY) / d);
		return out;


	}


	FindY(test, y)
	{
		ptr = this.global;
		var yy = y * ptr.scaleY; 
		var ptr = this.global
		return(ptr.canvas1.height / 1 / ptr.scale - yy +  ptr.minY * ptr.scaleY - this.global.padding.y.up);
	}

	db(inp)
	{		
		if(inp <= 0)
		{
			return 0;
		}
		else
		{
			return(20 * Math.log10(inp));
		}	
	}

	WritePlotInfo(ptr) { 
		ptr = this.global;
		var pos = 10;
		ptr.ctx1.font="15px Arial";
		var text;
		var w;


		if(this.state.avgFlag == 1)
		{
			{
				ptr.ctx1.fillStyle = "yellow";
				text = "AvgCntr = ";
				w = ptr.ctx1.measureText(text).width;
				ptr.ctx1.fillText(text, pos, 20);
				pos += w;

				text = ptr.avgAcc[0].length.toString();
				w = ptr.ctx1.measureText(text).width;
				ptr.ctx1.fillStyle = "white";
				ptr.ctx1.fillText(text, pos, 20);
				pos += w;
				pos += (this.global.FIRST_ROW_WIDTH);
			}
		}




		//this.global.maxY = -Infinity;
		var max = -Infinity;
		var out = [];
		var i;
		var index;
		for(i = 0; i < this.state.plotNum; i++)
		{
			out = this.FindMax(ptr.yPlot[i]);	
			if(out.max > max)
			{
				max = out.max;
				index = out.index;
			}
		}

		text = "Max = ";
		ptr.ctx1.fillStyle = "yellow";
		w = ptr.ctx1.measureText(text).width;
		ptr.ctx1.fillText(text, pos, 20);
		pos += w;
		ptr.ctx1.fillStyle = "white";


		var maxPower  = this.GetExpoValues(max).power;
		if(maxPower > 4)
		{
			var ans = this.GetExpoValues(max);
			var base = Math.round(ans.base * 1000) / 1000;
			text =  base + "e" + ans.power;
		}
		else
		{
			text = Math.round(max * 10000) / 10000;
		}

		ptr.ctx1.fillText(text, pos, 20);
		w = ptr.ctx1.measureText(text).width;

		pos += w;
		//pos += (FIRST_ROW_WIDTH);


		text = "  at  ";
		ptr.ctx1.fillStyle = "yellow";
		w = ptr.ctx1.measureText(text).width;
		ptr.ctx1.fillText(text, pos, 20);
		pos += w;

		text = Math.round(ptr.xPlot[index] * 1000) / 1000;
		ptr.ctx1.fillStyle = "white";
		ptr.ctx1.fillText(text, pos, 20);
		w = ptr.ctx1.measureText(text).width;
		pos += w;

		pos += (this.global.FIRST_ROW_WIDTH);







	}

	FindMax(inn)
	{
		var max = -Infinity;
		var out = [];
		var index = 0;
		var i;
		for(i = 0; i < inn.length; i++)
		{
			if(inn[i] > max)
			{
				max = inn[i];
				index = i;
			}
		}

		out.max = max;
		out.index = index;
		return out;
	}


	GetExpoValues(num)
	{
		var ans={};
		var power = 0;
		var temp = Math.abs(num);
		if(num == 0)
		{
			power = 0;
			var base = 0;
		}
		else if(temp == 1)
		{
			power = 0;
			base = 1;
		}

		else if(temp < 1)
		{
			while(temp < 1)
			{
				temp = temp * 10;
				power--;
			}
		}

		else if(temp > 1)
		{
			while(temp > 1)
			{
				temp = temp / 10;
				power++;
				if(power > 50)
				{
					//alert("Infinity loop");
					break;
					return;
				}
			}

		}

		power = power;
		base = temp;


		if(num < 0)
		{
			base = -base;
		}

		ans.base = base;
		ans.power = power;

		return ans;
	}

	Plot(){

		var i;
		this.global.y = this.props.data.y;
		this.state.plotNum = this.global.y.length;

		if(this.state.pauseFlag == 0 || this.state.forcePlot == 1)
		{
			this.state.forcePlot = 0;
			if(this.state.zoomFlag == 0)
			{
				this.global.x = this.global.gx.slice(0, this.global.y[0].length);
				this.global.xPlot = this.global.x.slice(0, this.global.x.length);
				if(this.state.maxHFlag == 1) //zoomFlag = 0 &  maxHFlag = 1
				{
					for(i = 0; i < this.state.plotNum; i++)
					{
						this.global.yPlot[i] = this.FindMaxH(this.global.y[i], this.global.maxHoldBuffer[i]);
						this.global.maxHoldBuffer[i] = this.global.yPlot[i].slice(0, this.global.yPlot[i].length);
					}

				}

				else //zoomFlag = 0 &  maxHFlag = 0
				{
					this.global.yPlot = [];
					for(i = 0; i < this.state.plotNum; i++)
					{
						this.global.yPlot[i] = [];
						this.global.yPlot[i] = this.global.y[i].slice();
					}
				}
			}

			else //zoomflag = 1
			{
				for(i = 0; i < this.state.plotNum; i++)
				{
					if(this.state.maxHFlag == 1)
					{
						var out = [];
						out = this.FindMaxH(this.global.y[i], this.global.maxHoldBuffer[i]);
						this.global.maxHoldBuffer[i] = out.slice();
						this.global.yPlot[i] = out.slice(this.global.sxIndex, this.global.exIndex);
					}
					else
					{
						this.global.yPlot[i] = this.global.y[i].slice(this.global.sxIndex, this.global.exIndex + 1);
					}
				}
			}


			if(this.state.avgFlag == 1)
			{
				for(i = 0; i < this.state.plotNum; i++)
				{
					this.global.avgAcc[i] = this.ArrangeAvg(this.global.avgAcc[i], this.global.yPlot[i], this.global.accNum);
					this.global.yPlot[i] = [];
					this.global.yPlot[i] = this.CalcAvg(this.global.avgAcc[i], 0);
				}
			}


			/*if(this.state.dbFlag == 1)
			{
				
				for(i = 0; i < this.state.plotNum; i++)
				{					
					var tempF = [];
					for(j = 0; j < this.global.yPlot[i].length; j++)
					{
						tempF[j] = this.db(this.global.yPlot[i][j]) + parseFloat(this.props.dbOffset);
					}
					
					this.global.yPlot[i] = Float32Array.from(tempF);
				}
			}*/

			this.global.ctx1.beginPath();
			this.global.ctx4.clearRect(0, 0, this.global.canvas1.width, this.global.canvas2.height);
			this.global.ctx1.clearRect(0, 0, this.global.canvas1.width, this.global.canvas2.height);

			//backGround
			this.global.ctx1.rect(0, 0, this.global.canvas1.width, this.global.canvas1.height);
			this.global.ctx1.fillStyle = "black";
			this.global.ctx1.fill();
			this.global.ctx1.lineWidth = "1";
			this.global.ctx1.stroke();
			this.global.ctx1.closePath();

			//label
			this.global.ctx1.beginPath();
			this.global.ctx1.fillStyle = "yellow";
			this.global.ctx1.font="20px Arial";
			var w = this.global.ctx1.measureText(this.label).width;
			this.global.ctx1.fillText(this.props.title, this.global.canvas1.width / 2  - w / 2, 2 * this.global.padding.y.up / 3);
			this.global.ctx1.stroke();
			this.global.ctx1.closePath();

			var pos = 10;
			this.global.ctx1.font="15px Arial";

			var colors = ['red', 'yellow', 'green', 'orange', 'blue'];

			//labels for subplots
			this.global.ctx1.beginPath();
			this.global.ctx1.lineWidth = "2";
			this.global.ctx1.fillStyle = "white";
			this.global.ctx1.font="12px Arial";
			var h = parseInt(this.global.ctx1.font);
			for(i = 0; i < this.state.plotNum; i++)
			{
				if(this.props.sTitle[i] != null)
				{
					this.global.ctx1.beginPath();
					this.global.ctx1.strokeStyle = colors[i]; 
					var tempX = this.global.canvas1.width - this.global.padding.x.right + this.global.padding.x.right / 8;
					var tempY = this.global.padding.y.up + 2 * h * i;
					this.global.ctx1.moveTo(tempX, tempY);

					tempX += this.global.padding.x.right / 5;//lenght of line
					this.global.ctx1.lineTo(tempX, tempY);

					//text
					tempX += this.global.padding.x.right / 16;
					this.global.ctx1.fillText(this.props.sTitle[i], tempX, tempY + h / 4);
					this.global.ctx1.stroke();
					this.global.ctx1.closePath();
				}
			}


			this.global.ctx1.stroke();
			this.global.ctx1.closePath();


			if(this.state.zoomFlag == 0)
			{
				if(this.state.refLevel == -1)
				{
					//if(this.settings.autoScaleFlag == true)
					{
						//alert("sfs")
						this.global.minY = Infinity;
						this.global.maxY = -Infinity;
						for(i = 0; i < this.state.plotNum; i++)
						{
							var temp = Math.max.apply(null, this.global.yPlot[i]);
							if(temp > this.global.maxY)
							{
								this.global.maxY  = temp
							}

							temp = Math.min.apply(null, this.global.yPlot[i]);
							if(temp  < this.global.minY)
							{
								this.global.minY = temp;
							}
						}

						if(this.global.maxY - this.global.minY > 2)
						{
							this.global.maxY = Math.round(this.global.maxY);
							this.global.minY = Math.round(this.global.minY);
						}
						this.global.maxYOrig = this.global.maxY;
						this.global.minYOrig = this.global.minY;

						if(this.global.maxY == Infinity || this.global.minY == -Infinity)
						{
							//alert("Infinity Number");
						}


						//d baraye on ast ta step ha addade ghabeleghabuli shavad
						if(this.global.minY != this.global.maxY)
						{
							var d = (this.global.maxY - this.global.minY) / 5;
							var countOfDec = 0;

							var ans = this.GetExpoValues(d);
							var base = ans.base;
							var power = ans.power;

							d = Math.round(base * 10);

							//temp = Math.pow(10, d.toString().length - 1);
							//d = d + temp - (d % temp);
							d = d * Math.pow(10, power - 1);


							if(Math.abs(this.global.minY) % d != 0)
							{
								if(this.global.minY < 0)
									this.global.minY = this.global.minY + (Math.abs(this.global.minY) % d) - d;
								else
									this.global.minY = this.global.minY - (this.global.minY % d);
							}

							if(this.global.maxY % d != 0)
							{
								if(this.global.maxY > 0)
								{
									this.global.maxY = this.global.maxY + d - (this.global.maxY % d);
								}
								else
								{
									this.global.maxY = this.global.maxY - (this.global.maxY % d);
								}
							}
						}

						else
						{
							temp = this.global.maxY;
							this.global.maxY = temp + 1;
							this.global.minY = temp - 1;
							d = 1;
						}

						this.state.AXES_STEP_NUM_Y = Math.ceil((this.global.maxY - this.global.minY) / d);
					}
					/*else
					{
						maxY = this.settings.yAxisMaxVal;
						minY = this.settings.yAxisMinVal;
						d = (maxY - minY) / 5;
						this.AXES_STEP_NUM_Y = Math.ceil((maxY - minY) / d);
					}*/

				}

				else
				{
					this.global.maxY = this.state.refLevel;
					this.global.minY = this.state.refLevel - 140;
					d = 20;
					this.state.AXES_STEP_NUM_Y = Math.ceil((this.global.maxY - this.global.minY) / d);
				}



				this.global.maxX = Math.max.apply(null, this.global.xPlot);
				this.global.minX = Math.min.apply(null, this.global.xPlot);
				this.global.maxXOrig = this.global.maxX;
				this.global.minXOrig = this.global.minX;

				//X
				d = this.global.maxX - this.global.minX;
				d = Math.round(d / 10);
				temp = Math.pow(10, d.toString().length - 1);
				d = d + temp - (d % temp);


				//minX = minX - minX % d;
				if(Math.abs(this.global.minX) % d != 0)
				{
					if(this.global.minX < 0)
						this.global.minX = this.global.minX + (Math.abs(this.global.minX) % d) - d;
					else
						this.global.minX = this.global.minX - (this.global.minX % d);
				}

				if(this.global.maxX % d != 0)
					this.global.maxX = this.global.maxX + d - (this.global.maxX % d);// mihahim maxX mazrabe d bashad

				this.global.AXES_STEP_NUM_X = (this.global.maxX - this.global.minX) / d;

				this.global.maxX = this.global.maxX;
				this.global.minX = this.global.minX;
				this.global.maxY = this.global.maxY;
				this.global.minY = this.global.minY;

				var sx = this.global.maxX - this.global.minX;
				this.global.scaleX = this.global.canvas1.width / sx - (this.global.padding.x.left + this.global.padding.x.right) / sx;
				var s = this.global.maxY - this.global.minY;//;
				this.global.scaleY = this.global.canvas1.height / 1 / (s) - 2 * this.global.padding.y.up / (s);
				this.global.scale = 1;

			}//end of if autoscale flag == 1

			else
			{
				this.global.minX = this.global.zoomMinX;
				this.global.minY = this.global.zoomMinY;
				this.global.maxX = this.global.zoomMaxX;
				this.global.maxY = this.global.zoomMaxY;
			}

			this.showAxes(this);



			this.global.ctx4.lineWidth = "2";
			this.global.ctx4.beginPath();
			var jump = Math.floor(this.global.yPlot[0].length / (this.global.canvas1.width)); 

			if(jump == 0)
			{
				jump = 1;
			}
			if(jump == 0)
			{
				return;
			}

			this.WritePlotInfo(this);
			var i, j, t;

			for(j = 0; j < this.state.plotNum; j++)
			{
				this.global.ctx4.stroke();
				this.global.ctx4.closePath();
				this.global.ctx4.beginPath();
				this.global.ctx4.strokeStyle = colors[j];
				this.global.ctx4.moveTo(this, this.FindX(this, this.global.xPlot[0]), this.FindY(this, this.global.yPlot[j][0]));
				var num = this.global.xPlot.length;//minX va maxX faghat baraye namayesh ast va dar plot az onha estefade nemokonim
				if(num == 0)
				{
					break;
				}





			//	if(this.state.dotFlag == 0)
				{
					for(var i = 0; i < num; i+= jump) 
					{
						var minIndex = i;
						var maxIndex = i;
						for(t = i + 1; t < i + jump; t++)
						{
							if(this.global.yPlot[j][t] > this.global.yPlot[j][maxIndex])
							{
								maxIndex = t;
							}
							else if(this.global.yPlot[t] < this.global.yPlot[j][minIndex])
							{
								minIndex = t;
							}
						}

						var xx = this.FindX(this, this.global.xPlot[minIndex]) - this.global.padding.x.left;
						var yy = this.FindY(this, this.global.yPlot[j][minIndex]) - this.global.padding.y.up;
						const pi = 2 * Math.PI;
						if(this.state.dotFlag == 0)
						{
							this.global.ctx4.lineTo(xx, yy);
						}
						else
						{
							this.global.ctx4.arc(xx - 1.5, yy - 1.5, 3, 0, pi);
						}

						if(jump != 1)
						{
							xx = this.FindX(this, this.global.xPlot[maxIndex]) - this.global.padding.x.left;
							yy = this.FindY(this, this.global.yPlot[j][maxIndex]) - this.global.padding.y.up;
							this.global.ctx4.lineTo(xx, yy);
						}
					}
				}
			}
			//this.global.ctx1.clearRect(0, this.global.canvas1.height - this.global.padding.y, this.global.canvas1.width, this.global.padding.y);

			this.global.ctx4.stroke();
			this.global.ctx4.stroke();
			this.WriteMarkers(this);
			this.global.ctx1.stroke();
			this.global.ctx1.closePath();

		}
	}

	WriteMarkers(ptr)
	{
		ptr =  this.global;
		ptr.ctx1.closePath();
		ptr.ctx1.beginPath();
		var i = 0;
		var color = ptr.ctx1.strokeStyle; 
		ptr.ctx1.strokeStyle = 'white'; 
		var prevW = 0;
		var offset = ptr.canvas1.width / 7;
		for(i = 0; i < ptr.markerNum; i++)
		{
			var plotNum = ptr.marker[i].plotNum;
			var x = ptr.marker[i].x;
			var indexX = this.FindIndex(ptr.x, x);
			var xCanvas = this.FindX(ptr, x);
			var y = ptr.yPlot[plotNum][indexX];
			y = Math.round(y * 100) / 100;

			//vlaue
			ptr.ctx1.fillStyle = "yellow";
			var text = "m" + i.toString() + ": ";
			var w = ptr.ctx1.measureText(text).width;

			ptr.ctx1.fillText(text,  offset * i + 10, ptr.canvas1.height - 10);
			ptr.ctx1.fillStyle = "white";
			ptr.ctx1.fillText(y, offset * i + 10 + w, ptr.canvas1.height - 10);

			//line
			text = "m" + i.toString();
			w = ptr.ctx1.measureText(text).width;
			if(xCanvas > ptr.padding.x.left && (xCanvas < (ptr.canvas1.width - ptr.padding.x.right)))
			{
				ptr.ctx1.fillText(text, xCanvas - w / 2, ptr.padding.y.up - 5);
				ptr.ctx1.moveTo(xCanvas, ptr.canvas1.height - ptr.padding.y.up);
				ptr.ctx1.lineTo(xCanvas, ptr.padding.y.up);
			}
			else
			{
			}
		}

	}


	ArrangeAvg(acc, y, accNum){
		var out = [];
		if(!acc)
		{
			out[0] = y.slice();
			return out;
		}
		else
		{
			if(acc.length >= accNum)
			{
				for(i = 0; i < accNum - 1; i++)
				{
					out[i] = acc[i + 1].slice();
				}
				out[accNum - 1] = y.slice();
				return out;
			}

			else
			{
				acc[acc.length] = y.slice();
				return acc;
			}
		}
	}


	CalcAvg(avgAcc, absPlot){
		var y = [];
		var j;
		for(j = 0; j < avgAcc[0].length; j++)
		{
			y[j] = 0;
			for(i = 0; i < avgAcc.length; i++)
			{
				/*if(absPlot == 1)
				{
					y[j] = y[j] + avgAcc[i][j] * avgAcc[i][j];
				}*/
				//else
				{
					y[j] = y[j] + avgAcc[i][j];
				}
			}
			/*if(absPlot == 1)
			{
				y[j] = Math.sqrt(y[j] / avgAcc.length);
			}*/

			//else
			{
				y[j] = y[j] / avgAcc.length;
			}

		}
		return y;
	}

	InitCanvas() {

		this.global.X_LABEL_PADDING = 20;
        this.global.ctx1 = this.refs.canvas1.getContext('2d');
		this.global.canvas1 = this.refs.canvas1;
        this.global.ctx1.fillRect(0,0,this.global.canvas1.width , this.global.canvas1.height);
		this.global.ctx1.beginPath();
		this.global.ctx1.strokeStyle = "white";
		this.global.ctx1.moveTo(this.props.x,0);
		this.global.ctx1.lineTo(this.props.x,300);
		this.global.ctx1.stroke();


        this.global.ctx2 = this.refs.canvas2.getContext('2d');
		this.global.canvas2 = this.refs.canvas2;


		this.global.canvas3 = this.refs.canvas3;
        this.global.ctx3 = this.refs.canvas3.getContext('2d');

		this.refs.canvas4.style.left = this.global.padding.x.left.toString() + "px";
		this.refs.canvas4.style.top = this.global.padding.y.up.toString() + "px";


		var temp = (this.refs.canvas1.width - this.global.padding.x.left - this.global.padding.x.right);
		this.refs.canvas4.width = temp.toString();
		this.refs.canvas4.height = (this.refs.canvas1.height - 2 * this.global.padding.y.up).toString();
		this.global.canvas4 = this.refs.canvas4;
		this.global.ctx4 = this.refs.canvas4.getContext('2d');
		this.global.ctx4.fillStyle = "white";
        this.global.ctx4.fillRect(0,0,this.global.canvas4.width , this.global.canvas4.height);

		this.global.ctx3 = this.global.canvas3.getContext("2d");
		this.global.ctx3.font="15px Arial";
		this.global.ctx3.fillStyle = "white";

		setInterval(this.Interval(), 50)

	}

	Interval(){
		this.global.updateFlag = 1;
	}

	render() {
		var Style = {
			position:"absolute",
			left: "0", 
			top: "0", 
			zIndex: "0"
			}

		
		var divStyle = {
			position: "relative",
			width: this.props.width + "px",
			height: this.props.height + "px",
			margin: "15px 15px 15px 15px",
			display: "inline-block",
			float: "left",
			}

		return (
				<div>
				<div style={divStyle}>
				<canvas id="canvas1" ref="canvas1" width={this.props.width} height={this.props.height}></canvas>
				<canvas id="canvas4" ref="canvas4" style={Style}></canvas>
				<canvas id="canvas3" ref="canvas3" width={this.props.width} height={this.props.height} style= {Style}></canvas>
				<canvas id="canvas2" ref="canvas2" width={this.props.width} height={this.props.height} style={Style}></canvas>
				</div>
				<Tools ZoomOut={this.ZoomOut} pauseFlag = {this.state.pauseFlag} TogglePause = {this.TogglePause} 
				ToggleDotMode = {this.ToggleDotMode} ToggleMaxHFlag= {this.ToggleMaxHFlag} ToggleAvgFlag= {this.ToggleAvgFlag} 
				ToggleAvgFlag = {this.ToggleAvgFlag} AVGNumSet = {this.AVGNumSet}/>
				</div>
			   );
	}
}

var gx = [];
for(var i = 0; i < 10000; i++)
{
	gx[i] = 0;
}

//function mapStateToProps(state, ownProps) {
//	var out = [];
//	  return {
//		  data: {y:ownProps.index.map(i=>{
//			  if(state.graph1Data[i] === undefined) 
//			  	return([0, 1, 2, 3, 4, 5]) 
//			  else 
//			  	return(state.graph1Data[i])
//		  })
//	  },
//	}
//
//}
export default (Graph);



