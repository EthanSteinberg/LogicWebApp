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

	var currentGates = [];
	var currentWires = [];
	var currentNodes = [];

	var movableObjects = [];

	var wireMode = false;
	var wireStage = 0;
	
	var tempNode;
	var newWire;

	var selection = null;

	var dragOffsetX;
	var dragOffsetY;

	var newSelection;

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

		if (wireMode)
		{


			if (!selection)
			{
				if (newSelection)
				{
					newSelection.setSelected(false);
					newSelection = null;
				}

				currentNodes.forEach(function (object)
				{
					if (!selection && object.contains(localX,localY))
					{
						selection = object;
						object.setSelected(true);
						return;
					}
				});

				if (selection)
				{
					tempNode = new wires.Node(localX,localY);
					newWire = new wires.Wire(selection,tempNode);
					currentWires.push(newWire);
				}
			}
			else
			{
				if (newSelection)
				{
					newSelection.setSelected(false);
					newSelection = null;
				}

				currentNodes.forEach(function (object)
				{
					if (!newSelection && object !== selection && object.contains(localX,localY))
					{
						newSelection = object;
						return;
					}
				});
				newWire.stopNode = newSelection;
				selection.setSelected(false);
				selection = null;

			}
		}

		
		else
		{
			movableObjects.forEach(function (object)
			{
				if (!selection && object.contains(localX,localY))
				{
					selection = object;
					object.setSelected(true);
					dragOffsetX = localX - object.getX();
					dragOffsetY = localY - object.getY();
					return;
				}
			});
		}
	});

$(canvas).mousemove(function(event){
	event.preventDefault();

	var localX = getLocalX(event);
	var localY = getLocalY(event);

	if (wireMode)
	{
		if (selection)
			tempNode.setPosition(localX,localY);

		if (newSelection)
		{
			newSelection.setSelected(false);
			newSelection = null;
		}
		currentNodes.forEach(function (object)
		{
			if (!newSelection && object !== selection && object.contains(localX,localY))
			{
				newSelection = object;
				newSelection.setSelected(true);
				return;
			}
		});

	}
	else
	{
		if (selection)
		{
			var targetX = localX - dragOffsetX;
			var targetY = localY - dragOffsetY;

			selection.setPosition(targetX,targetY);
		}

	}

}  );


$(canvas).mouseup(function() {
	event.preventDefault();
	if (wireMode)
	{

	}
	else
	{
		if (selection)
		{
			selection.setSelected(false);
			selection = null;
		}
	}
});

imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png"], function(result)
{
	gates.setImages(result);
	obj.drawGate = function(name,x,y)
	{
		var gateObj = new gates.Gate(x,y,name);
		currentGates.push(gateObj);
		movableObjects.push(gateObj);
		currentNodes = currentNodes.concat(gateObj.getNodes());
		console.log(gateObj);

	};

	function animate()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);

		currentGates.forEach(function(gate)
		{
			gate.draw(ctx);

		});

		currentNodes.forEach(function(node)
		{
			node.draw(ctx);

		});

		currentWires.forEach(function(wire)
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

obj.setWireMode = function(value)
{
	wireMode = value;
	wireStage = 0;
};

obj.addNode = function(x,y)
{
	var newNode = new wires.Node(x,y);
	currentNodes.push(newNode);
	movableObjects.push(newNode);

};



return obj;
});