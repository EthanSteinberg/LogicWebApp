define(["shapes"],function(shapes)
{
	"use strict";


	var obj = {};

	function Node(x,y)
	{
		this.pos = new shapes.Position(x,y);
		this.circle = new shapes.Circle(this.pos,20);
		this.selcted = false;
	}

	Node.prototype.draw = function(ctx)
	{
		if (this.selcted)
			ctx.strokeStyle = "green";

		ctx.lineWidth = 3;
		this.circle.draw(ctx);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
	};

	Node.prototype.contains = function(x,y)
	{
		return this.circle.contains(x,y);
	};

	Node.prototype.getX = function()
	{
		return this.pos.x;
	};

	Node.prototype.getY = function()
	{
		return this.pos.y;
	};

	Node.prototype.setSelected = function(value)
	{
		this.selcted = value;
	};

	Node.prototype.setPosition = function(x,y)
	{
		this.pos.x = x;
		this.pos.y = y;
	};


	obj.Node = Node;

	function Wire(startNode,stopNode)
	{
		this.startNode = startNode;
		this.stopNode = stopNode;
	}

	obj.Wire = Wire;

	return obj;
});