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
		this.pos = new shapes.Position(x,y);
		this.type = type;
		this.rect = new shapes.Rect(this.pos,200,100);
		this.selected = false;

	}

	function convertRelativeToNodes(pos,arr)
	{
		return arr.map(function(offset)
		{
			return new wires.Node(shapes.relativePosition(pos,offset[0],offset[1]));
		});
	}

	Gate.prototype.getNodeOffsets = function()
	{
		switch(this.type)
		{
			case "and":
				return [ [200,50], [0,30], [0,70]];

		}
	};

	Gate.prototype.getNodes = function()
	{
		return convertRelativeToNodes(this.pos,this.getNodeOffsets());
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
		ctx.drawImage(images[this.type+".png"],this.pos.getX(),this.pos.getY());

		if (this.selected)
		{
			ctx.strokeStyle = "green";
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