define(["domReady!","imageManager","shapes"],function(dom,imageManager,shapes)
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
				dragOffsetX = localX - gate.rect.x;
				dragOffsetY = localY - gate.rect.y;
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

			selection.rect.x = targetX;
			selection.rect.y = targetY;

		}

	}  );
	

	$(canvas).mouseup(function() {
		selection = null;
	});

	imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png"], function(result)
	{
		obj.drawGate = function(name,x,y)
		{
			console.log(result);
			var gateObj = {
				"name": name,
				"rect": new shapes.Rect(x,y,200,100)
			};
			currentGates.push(gateObj);
			
		};

		function animate()
		{
			ctx.clearRect(0,0,canvas.width,canvas.height);

			currentGates.forEach(function(gate)
			{
				gate.rect.draw(ctx);
				ctx.drawImage(result[gate.name+".png"],gate.rect.x,gate.rect.y);
			});

			if (selection)
			{
				ctx.save();
				ctx.strokeStyle = "green";
				ctx.lineWidth = 3;
				selection.rect.draw(ctx);
				ctx.restore();
			}

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