define(function()
{
	"use strict";


	function callOrReturnDirectly(a)
	{
		if (typeof(a) == "function")
		{
			return a();
		}
		else
		{
			return a;
		}
	}

	var obj = {};

	obj.relativePosition = function(oldPos,xdif,ydif)
	{
		return new Position(function() { return oldPos.getX() + xdif}, function() { return oldPos.getY() + ydif});
	};

	function Position(x,y)
	{
		this.x = x;
		this.y = y;
	}

	Position.prototype.getX = function()
	{
		return callOrReturnDirectly(this.x);

	};

	Position.prototype.getY = function()
	{
		return callOrReturnDirectly(this.y);
	};

	obj.Position = Position;

	function Rect(position,width,height)
	{
		this.pos = position;
		this.width = width;
		this.height = height;
	}

	Rect.prototype.contains = function(x,y)
	{
		var inX = (this.pos.getX() <= x) && (x <= (this.pos.getX()+ this.width));
		var inY = (this.pos.getY() <= y) && (y <= (this.pos.getY()+ this.height));
		return inX && inY;
	};

	Rect.prototype.draw = function(ctx)
	{
		ctx.strokeRect(this.pos.getX(),this.pos.getY(),this.width,this.height);
	};

	obj.Rect = Rect;


	function Circle(position,radius)
	{
		this.pos = position;
		this.radius = radius;
	}

	Circle.prototype.contains = function(x,y)
	{
		return (x-this.pos.getX()) *(x-this.pos.getX()) + (y-this.pos.getY())*(y-this.pos.getY()) <= this.radius * this.radius;
	};

	Circle.prototype.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.arc(this.pos.getX(),this.pos.getY(),this.radius,0,2*Math.PI,false);
		ctx.stroke();
	};

	obj.Circle = Circle;

	return obj;
});