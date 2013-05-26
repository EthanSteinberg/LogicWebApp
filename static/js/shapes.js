define(function()
{
	"use strict";

	var obj = {};

	obj.allPositions = [];

	obj.relativePosition = function(oldPos,xdif,ydif)
	{
		return new Position(xdif,ydif,oldPos);
	};


	function Position(x,y,oldPos)
	{
		this.x = x;
		this.y = y;

		this.oldPos = oldPos;
		this.id = obj.allPositions.length;
		obj.allPositions.push(this);
	}


	Position.prototype.getX = function()
	{
		if (this.oldPos)
			return this.x + this.oldPos.getX();
		else
			return this.x;

	};

	Position.prototype.getY = function()
	{
		if (this.oldPos)
			return this.y + this.oldPos.getY();
		else
			return this.y;
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

	function Line(firstPosition,secondPosition,width)
	{
		this.firstPosition = firstPosition;
		this.secondPosition = secondPosition;
		this.width = width;
	}

	Line.prototype.contains = function(x,y)
	{
		var ax = this.firstPosition.getX();
		var ay = this.firstPosition.getY();

		var bx = this.secondPosition.getX();
		var by = this.secondPosition.getY();

		var abx = bx- ax;
		var aby = by -ay;
		var abNorm = Math.sqrt(abx*abx + aby*aby);
		var abxNorm = abx/abNorm;
		var abyNorm = aby/abNorm;



		var acx = x-ax;
		var acy = y-ay;

		var length = acx * abxNorm + acy*abyNorm;
		var yLength = acx * abyNorm + acy* -abxNorm;

		//console.log(length,yLength,abNorm);
		return (-this.width/2 <= length && length <= (abNorm + this.width/2) && -this.width/2 <= yLength && yLength <= this.width/2);
	};

	Line.prototype.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.globalAlpha = 0.5;
		ctx.lineWidth = this.width;
		ctx.moveTo(this.firstPosition.getX(),this.firstPosition.getY());
		ctx.lineTo(this.secondPosition.getX(),this.secondPosition.getY());
		ctx.stroke();

		ctx.lineCap = "butt";
		ctx.lineWidth = 1;
		ctx.globalAlpha = 1;
	};

	obj.Line = Line;

	return obj;
});