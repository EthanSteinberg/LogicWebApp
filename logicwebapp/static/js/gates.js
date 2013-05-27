define(["shapes","wires"],function(shapes,wires)
{
	"use strict";

	var obj = {};
	var images;



	obj.setImages = function(im)
	{
		images = im;
	};


	

	function Gate(x,y,type)
	{
		this.activated = false;
		this.pos = new shapes.Position(x,y);
		this.type = type;
		this.rect = new shapes.Rect(shapes.relativePosition(this.pos,0,0),200,100);
		this.selected = false;
		this.inputNodes = convertRelativeToNodes(this.pos,this.getInputNodeOffsets(),this);
		this.outputNodes = convertRelativeToNodes(this.pos,this.getOutputNodeOffsets(),this);
		this.nodes = this.inputNodes.concat(this.outputNodes);
	}

	Gate.prototype.destroy = function(state)
	{
		this.nodes.forEach(function(node)
		{
			node.destroy(state);
		});
		state.currentGates.splice(state.currentGates.indexOf(this),1);
	};

	function convertRelativeToNodes(pos,arr,gate)
	{
		return arr.map(function(offset)
		{
			var node = new wires.Node(shapes.relativePosition(pos,offset[0],offset[1]));
			node.setGate(gate);
			return node;
 
		});
	}

	Gate.prototype.getActivated = function()
	{
		return this.activated;
	};

	Gate.prototype.setActivated = function(status)
	{
		this.activated = status;
	};

	Gate.prototype.getInputNodeOffsets = function()
	{
		switch(this.type)
		{
			case "and":
			case "xor":
			case "or":
			case "nand":
				return [[0,30], [0,70]];

			case "not":
			case "out":
				return [ [0,50]];

			case "in":
				return [];

		}
	};

	Gate.prototype.getOutputNodeOffsets = function()
	{
		switch(this.type)
		{
			case "and":
			case "xor":
			case "or":
			case "nand":
			case "not":
			case "in":
				return [ [200,50]];

			case "out":
				return [];

		}
	};

	Gate.prototype.getNodes = function()
	{
		return this.nodes;
	};

	Gate.prototype.setSelected = function(status)
	{
		this.selected = status;
	};

	Gate.prototype.setPosition = function(x,y)
	{
		this.pos.x = x;
		this.pos.y = y;
	};

	Gate.prototype.draw = function(ctx)
	{
		if (this.activated &&  ( this.type === "in" || this.type == "out"))
		{
			ctx.drawImage(images[this.type+"-on.png"],this.pos.getX(),this.pos.getY());
		}
			
		else
			ctx.drawImage(images[this.type+".png"],this.pos.getX(),this.pos.getY());

		if (this.selected)
		{
			ctx.strokeStyle = "yellow";
		}

		ctx.lineWidth = 3;
		this.rect.draw(ctx);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";

				
	};

	Gate.prototype.contains = function(x,y)
	{
		return this.rect.contains(x,y);
	};

	Gate.prototype.getX = function()
	{
		return this.pos.x;
	};

	Gate.prototype.getY = function()
	{
		return this.pos.y;
	};

	obj.Gate =Gate;
	return obj;
});