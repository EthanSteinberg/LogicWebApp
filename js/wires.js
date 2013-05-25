define(["shapes"],function(shapes)
{
	"use strict";


	var obj = {};

	function Node(x,y)
	{
		this.position = new shapes.Position(x,y);
		this.circle = new shapes.Circle(this.position,20);
	}

	Node.prototype.draw = function(ctx)
	{
		this.circle.draw(ctx);
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