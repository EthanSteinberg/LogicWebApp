define(["domReady!","imageManager","gates","wires"],function(dom,imageManager,gates,wires)
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

	var mode = null;

	function getLocalX(event)
	{
		return event.pageX - $(canvas).offset().left;
	}

	function getLocalY(event)
	{
		return event.pageY - $(canvas).offset().top;
	}

	$(canvas).mousedown(function(event){
		event.preventDefault();
		var localX = getLocalX(event);
		var localY = getLocalY(event);
		if (mode)
			mode.mousedown(localX,localY,state);
	});



$(canvas).mousemove(function(event){
	event.preventDefault();

	var localX = getLocalX(event);
	var localY = getLocalY(event);

	if (mode)
		mode.mousemove(localX,localY,state);

});


$(canvas).mouseup(function() {
	event.preventDefault();
	var localX = getLocalX(event);
	var localY = getLocalY(event);

	if (mode)
		mode.mouseup(localX,localY,state);
});

imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png"], function(result)
{
	gates.setImages(result);
	obj.addGate = function(name,x,y)
	{
		var gateObj = new gates.Gate(x,y,name);
		state.currentGates.push(gateObj);
		state.currentNodes = state.currentNodes.concat(gateObj.getNodes());
		console.log(gateObj);

	};

	function animate()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);

		state.currentGates.forEach(function(gate)
		{
			gate.draw(ctx);

		});

		state.currentNodes.forEach(function(node)
		{
			node.draw(ctx);

		});

		state.currentWires.forEach(function(wire)
		{
			wire.draw(ctx);

		});


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


obj.addNode = function(x,y)
{
	var newNode = new wires.Node(x,y);
	state.currentNodes.push(newNode);
};

obj.setMode = function(newMode)
{
	mode = newMode;
};



return obj;
});