define(["shapes"],function(shapes)
{
	"use strict";


	var obj = {};

	function Node(x,y,gate)
	{
		if (y === undefined)
			this.pos = x;
		else
			this.pos = new shapes.Position(x,y);
		this.circle = new shapes.Circle(this.pos,20);
		this.selcted = false;
		this.wires = [];
		this.gate = null;
	}

	Node.prototype.setGate = function(gate)
	{
		if (this.gate !== null)
		{
			debugger; // Should never happen
		}
		this.gate = gate;
	};

	Node.prototype.hasGate = function()
	{
		return this.gate!==null;
	};


	Node.prototype.destroy = function(state)
	{
		this.wires.forEach(function (wire)
		{
			wire.destroy(state);
		});
		state.currentNodes.splice(state.currentNodes.indexOf(this),1);
	};

	Node.prototype.draw = function(ctx)
	{
		if (this.selcted)
			ctx.strokeStyle = "green";

		ctx.lineWidth = 3;
		this.circle.draw(ctx);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
	};

	Node.prototype.addWire = function(wire)
	{
		this.wires.push(wire);
	};

	Node.prototype.removeWire = function(wire)
	{
		this.wires.splice(this.wires.indexOf(wire),1);
	}

	Node.prototype.contains = function(x,y)
	{
		return this.circle.contains(x,y);
	};

	Node.prototype.getX = function()
	{
		return this.pos.getX();
	};

	Node.prototype.getY = function()
	{
		return this.pos.getY();
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

	Node.prototype.getPosition = function()
	{
		return this.pos;
	};


	obj.Node = Node;

	function Wire(startNode,stopNode)
	{
		this.startNode = startNode;
		this.stopNode = stopNode;
		this.line = new shapes.Line(this.startNode.getPosition(),this.stopNode.getPosition(),30);
		this.selected = false;

		this.startNode.addWire(this);
		this.stopNode.addWire(this);
	}

	Wire.prototype.destroy = function(state)
	{
		this.startNode.removeWire(this);
		this.stopNode.removeWire(this);
		state.currentWires.splice(state.currentWires.indexOf(this),1);
	}

	Wire.prototype.setSelected = function(value)
	{
		this.selected = value;
	}

	Wire.prototype.contains = function(x,y)
	{

		return this.line.contains(x,y);
	};

	Wire.prototype.setStopNode = function(stopNode)
	{
		this.stopNode.removeWire(this);
		this.stopNode = stopNode;
		this.stopNode.addWire(this);
		this.line = new shapes.Line(this.startNode.getPosition(),this.stopNode.getPosition(),30);
	};

	Wire.prototype.draw = function(ctx)
	{
		
		if (this.selected)
			ctx.strokeStyle = "green";

		this.line.draw(ctx);
		ctx.strokeStyle = "black";
		
	};

	obj.Wire = Wire;

	return obj;
});