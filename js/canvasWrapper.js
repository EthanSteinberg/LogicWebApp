define(["domReady!","imageManager","gates"],function(dom,imageManager,gates)
{
	"use strict";

	console.timeStamp("dom ready");

	var obj = {};

	var callbacks = [];
	var canvas = document.getElementById("mainCanvas");
	console.log(canvas);

	var readyYet = false;

	var currentGates = [];
	var ctx = canvas.getContext("2d");

	var dragging = false;
	var selection = null;

	var dragOffsetX;
	var dragOffsetY;

	function getLocalX(event)
	{
		return event.pageX - $(canvas).offset().left;
	}

	function getLocalY(event)
	{
		return event.pageY - $(canvas).offset().top;
	}

	$(canvas).mousedown(function(event){
		var localX = getLocalX(event);
		var localY = getLocalY(event);

		currentGates.forEach(function (gate)
		{
			if (gate.rect.contains(localX,localY))
			{
				selection = gate;
				gate.setSelected(true);
				dragOffsetX = localX - gate.pos.getX();
				dragOffsetY = localY - gate.pos.getY();
				return;
			}
		});
	});
	
	$(canvas).mousemove(function(event){
		if (selection)
		{
			var localX = getLocalX(event);
			var localY = getLocalY(event);

			var targetX = localX - dragOffsetX;
			var targetY = localY - dragOffsetY;

			selection.setPosition(targetX,targetY);
		}

	}  );
	

	$(canvas).mouseup(function() {
		selection.setSelected(false);
		selection = null;
	});

	imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png"], function(result)
	{
		gates.setImages(result);
		obj.drawGate = function(name,x,y)
		{
			var gateObj = new gates.Gate(x,y,name);
			currentGates.push(gateObj);
			console.log(gateObj);
			
		};

		function animate()
		{
			ctx.clearRect(0,0,canvas.width,canvas.height);

			currentGates.forEach(function(gate)
			{
				gate.draw(ctx);
				
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



	return obj;
});