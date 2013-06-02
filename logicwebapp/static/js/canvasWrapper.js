define(["domReady!","imageManager","gates","wires","shapes"],function(dom,imageManager,gates,wires,shapes)
{
	"use strict";

	console.timeStamp("dom ready");

	var obj = {};


	var callbacks = [];
	var canvas = document.getElementById("mainCanvas");
	console.log(canvas);
	var ctx = canvas.getContext("2d");

	var readyYet = false;

	var state = {
		"currentGates": [],
		"currentWires": [],
		"currentNodes": []
	};

	window.state = state;

	var mode = null;

	var scale = 1;

	var translateX = 0;
	var translateY = 0;


	function getLocalX(event)
	{
		return event.pageX - $(canvas).offset().left;
	}

	function getLocalY(event)
	{
		return event.pageY - $(canvas).offset().top;
	}

	

	obj.getState = function()
	{
		return state;
	};

	obj.setState = function(aState)
	{
		state = aState;
		shapes.allPositions = state.currentPositions;
		mode = null;
		window.state = state;

	};

	var keyMap = {};


	$(window).ready(function()
	{
		var bodyHeight = window.innerHeight;
		canvas.height = bodyHeight-200;
	});

	$(window).resize(function()
	{
		var bodyHeight = window.innerHeight;
		canvas.height = bodyHeight-200;
	});

	$(canvas).attr("tabindex","0");

	$(canvas).keydown(function (event)
	{
		keyMap[event.which] = true;
	});

	$(canvas).keyup(function (event)
	{
		delete keyMap[event.which];
	});

	$(canvas).mousedown(function(event){
		$(this).focus();
		event.preventDefault();
		var localX = getLocalX(event);
		var localY = getLocalY(event);
		if (zoomInCircle.contains(localX,localY))
		{
			scale *= 1.5
		}
		else if (zoomOutCircle.contains(localX,localY))
		{
			scale /= 1.5;
		}
		else if (mode)
			mode.mousedown(localX/scale - translateX,localY/scale - translateY,state,state);
	});

	$(canvas).mousemove(function(event){
		event.preventDefault();

		var localX = getLocalX(event);
		var localY = getLocalY(event);

		if (mode)
			mode.mousemove(localX/scale - translateX,localY/scale - translateY,state);

	});


	$(canvas).blur(function()
	{
		keyMap = {};
	});


	$(canvas).mouseleave(function(event)
	{
		event.preventDefault();

		var localX = getLocalX(event);
		var localY = getLocalY(event);

		if (mode)
			mode.mouseup(localX/scale - translateX,localY/scale - translateY,state,state);
	});

	$(canvas).mouseup(function(event) {
		event.preventDefault();
		var localX = getLocalX(event);
		var localY = getLocalY(event);

		if (mode)
			mode.mouseup(localX/scale - translateX,localY/scale - translateY,state,state);
	});

	var zoomInCircle = new shapes.Circle(new shapes.Position(25,25),15);
	var zoomOutCircle = new shapes.Circle(new shapes.Position(25,65),15);


	var oldTime = false;

	imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png","in.png","out.png","in-on.png","out-on.png"], function(result)
	{
		gates.setImages(result);
		obj.addGate = function(name,gateState,realName,id)
		{
			var gateObj;
			if (name == "composite")
				gateObj =  new gates.Gate(-translateX,-translateY,name,gateState,realName,id);
			else
				gateObj = new gates.Gate(-translateX,-translateY,name);

			state.currentGates.push(gateObj);
			state.currentNodes = state.currentNodes.concat(gateObj.getNodes());
			console.log(gateObj);

		};

		function reverseIterate(arr,func)
		{
			for (var i = arr.length-1; i >= 0 ; i--)
			{
				func(arr[i]);
			}
		}

		function drawPlusSign()
		{
			var radius = 15;
			var cx = radius+10;
			var cy = radius+10;
			ctx.lineWidth = 2;

			ctx.beginPath();
			ctx.arc(cx,cy,radius,0,2*Math.PI,true);
			ctx.stroke();


			ctx.beginPath();
			ctx.moveTo(cx-radius*2/3,cy);
			ctx.lineTo(cx+radius*2/3,cy);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(cx,cy-radius*2/3);
			ctx.lineTo(cx,cy+radius*2/3);
			ctx.stroke();

			ctx.lineWidth = 1;
		}

		function drawMinusSign()
		{
			var radius = 15;
			var cx = radius+10;
			var cy = radius+50;
			ctx.lineWidth = 2;

			ctx.beginPath();
			ctx.arc(cx,cy,radius,0,2*Math.PI,true);
			ctx.stroke();


			ctx.beginPath();
			ctx.moveTo(cx-radius*2/3,cy);
			ctx.lineTo(cx+radius*2/3,cy);
			ctx.stroke();


			ctx.lineWidth = 1;
		}

		function animate(time)
		{
			
			if (oldTime)
			{
				var delta = time - oldTime;
				if (37 in keyMap)
					translateX += .1 * delta/scale;
				if (38 in keyMap)
					translateY += .1 * delta/scale;
				if (39 in keyMap)
					translateX -= .1 * delta/scale;
				if (40 in keyMap)
					translateY -= .1 * delta/scale;

				oldTime = time;
			}
			else
				oldTime = time;


			ctx.clearRect(0,0,canvas.width,canvas.height);

			ctx.save();

			ctx.scale(scale,scale);
			ctx.translate(translateX,translateY);

			reverseIterate(state.currentGates,function(gate) 
			{
				gate.draw(ctx);

			});

			reverseIterate(state.currentNodes,function(node)
			{
				if (!node.hasGate())
					node.draw(ctx);

			});

			reverseIterate(state.currentWires,function(wire)
			{
				wire.draw(ctx);

			});

			ctx.restore();
			drawPlusSign();
			drawMinusSign();


			window.requestAnimationFrame(animate);
		}

		readyYet = true;

		window.requestAnimationFrame(animate);
		console.log(obj);
		callbacks.forEach(function(callback)
		{
			callback();
		});

	});

	obj.canvasReady = function(funcToCall)
	{
		if (!readyYet)
			callbacks.push(funcToCall);
		else
			funcToCall();
	};


	obj.addNode = function()
	{
		var newNode = new wires.Node(-translateX+20,-translateY+20);
		state.currentNodes.push(newNode);
	};

	obj.setMode = function(newMode)
	{
		mode = newMode;
	};



	return obj;
});