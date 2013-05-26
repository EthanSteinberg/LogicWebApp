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

	var mode = "Add Mode";

	var movableObjects = [];

	var wireMode = false;
	
	var eraseMode = false;
	
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

		switch(mode)
		{

			case "Wire Mode":


			if (!selection)
			{
				if (newSelection)
				{
					newSelection.setSelected(false);
					newSelection = null;
				}

				state.currentNodes.forEach(function (object)
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
					state.currentWires.push(newWire);
				}
			}
			else
			{
				if (newSelection)
				{
					newSelection.setSelected(false);
					newSelection = null;
				}

				state.currentNodes.forEach(function (object)
				{
					if (!newSelection && object !== selection && object.contains(localX,localY))
					{
						newSelection = object;
						return;
					}
				});
				newWire.setStopNode(newSelection);
				selection.setSelected(false);
				selection = null;

			}
			break;

		case "Delete Mode":

		
			if (selection)
			{
				selection.setSelected(false);
				selection = null;

			}


			state.currentWires.forEach(function (object)
			{
				if (!selection && object.contains(localX,localY))
				{
					selection = object;
					selection.setSelected(true);
				}
			});

			state.currentNodes.forEach(function (object)
			{
				if (!selection && !object.hasGate() && object.contains(localX,localY))
				{
					selection = object;
					selection.setSelected(true);
				}
			});

			state.currentGates.forEach(function (object)
			{
				if (!selection && object.contains(localX,localY))
				{
					selection = object;
					selection.setSelected(true);
				}

			});

			if (selection)
			{
				selection.destroy(state);
				selection = null;
				return;
			}
			break;



		case "Add Mode":
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
			break;
		}
	});



$(canvas).mousemove(function(event){
	event.preventDefault();

	var localX = getLocalX(event);
	var localY = getLocalY(event);

	switch(mode)
	{
		case "Wire Mode":
		if (selection)
			tempNode.setPosition(localX,localY);

		if (newSelection)
		{
			newSelection.setSelected(false);
			newSelection = null;
		}
		state.currentNodes.forEach(function (object)
		{
			if (!newSelection && object !== selection && object.contains(localX,localY))
			{
				newSelection = object;
				newSelection.setSelected(true);
				return;
			}
		});
		break;


	case "Delete Mode":
		if (selection)
		{
			selection.setSelected(false);
			selection = null;

		}
		state.currentWires.forEach(function (object)
		{
			if (!selection && object.contains(localX,localY))
			{
				selection = object;
				selection.setSelected(true);
			}
		});

		state.currentNodes.forEach(function (object)
		{
			if (!selection && !object.hasGate()&&object.contains(localX,localY))
			{
				selection = object;
				selection.setSelected(true);
			}
		});

		state.currentGates.forEach(function (object)
		{
			if (!selection && object.contains(localX,localY))
			{
				selection = object;
				selection.setSelected(true);
			}
		});
		break;
	

	case "Add Mode":
		if (selection)
		{
			var targetX = localX - dragOffsetX;
			var targetY = localY - dragOffsetY;

			selection.setPosition(targetX,targetY);
		}
		break;
	}
	

}  );


$(canvas).mouseup(function() {
	event.preventDefault();
	switch(mode)
	{
	case "Wire Mode":
		break;
	case "Delete Mode":
		break;
	case "Add Mode":

	
		if (selection)
		{
			selection.setSelected(false);
			selection = null;
		}
		break;
	}
});

imageManager.loadImages(["and.png","not.png","or.png","xor.png","nand.png"], function(result)
{
	gates.setImages(result);
	obj.drawGate = function(name,x,y)
	{
		var gateObj = new gates.Gate(x,y,name);
		state.currentGates.push(gateObj);
		movableObjects.push(gateObj);
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

obj.setWireMode = function(value)
{
	wireMode = value;
};

obj.addNode = function(x,y)
{
	var newNode = new wires.Node(x,y);
	state.currentNodes.push(newNode);
	movableObjects.push(newNode);

};

obj.setEraseMode = function(value)
{
	eraseMode = value;
};

obj.setMode = function(newMode)
{
	mode = newMode;
};



return obj;
});