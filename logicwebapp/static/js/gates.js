define(["shapes","wires","logicProcessor"],function(shapes,wires,logicProcessor)
{
	"use strict";

	var obj = {};
	var images;



	obj.setImages = function(im)
	{
		images = im;
	};


	

	function Gate(x,y,type,gateState,name,id)
	{
		this.activated = false;
		this.pos = new shapes.Position(x,y);
		this.type = type;

		this.yValue = this.pos.y;
		
		this.selected = false;
		

		if (type === "composite")
		{
			this.logic = new logicProcessor.LogicProcessor(gateState);
			this.name = name;
			this.sourceId = id;
		}

		this.inputNodes = convertRelativeToNodes(this.pos,this.getInputNodeOffsets(),this);
		this.outputNodes = convertRelativeToNodes(this.pos,this.getOutputNodeOffsets(),this);
		this.nodes = this.inputNodes.concat(this.outputNodes);

		if (type === "composite")
		{
			var maxWidth = Math.max(this.inputNodes.length,this.outputNodes.length);
			this.rect = new shapes.Rect(shapes.relativePosition(this.pos,0,0),200,maxWidth*50);
		}
		else
		{
			this.rect = new shapes.Rect(shapes.relativePosition(this.pos,0,0),200,100);
		}


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

			case "composite":
				var result = [];
				for (var i = 0; i < this.logic.getInputNodes(); i++)
				{
					result.push([0,25+i*50]);
				}
				return result;

			default:
				debugger;

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

			case "composite":
				var result = [];
				for (var i = 0; i < this.logic.getOutputNodes(); i++)
				{
					result.push([200,25+i*50]);
				}
				return result;

			default:
				debugger;

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
		this.yValue = this.pos.y;
	};

	Gate.prototype.draw = function(ctx)
	{
		if (this.activated &&  ( this.type === "in" || this.type === "out"))
		{
			ctx.drawImage(images[this.type+"-on.png"],this.pos.getX(),this.pos.getY());
		}
			
		else if (this.type === "composite")
		{
			ctx.font = "20px sans-serif";
			ctx.fillText(this.name,this.pos.getX()+50,this.pos.getY()+this.rect.height/2);
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

		this.nodes.forEach(function (node)
		{
			node.draw(ctx);
		});

				
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