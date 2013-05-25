define(function()
{
	"use strict";

	var obj = {};

	function Rect(x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	Rect.prototype.contains = function(x,y)
	{
		var inX = (this.x <= x) && (x <= (this.x+ this.width));
		var inY = (this.y <= y) && (y <= (this.y+ this.height));
		return inX && inY;
	};

	Rect.prototype.draw = function(ctx)
	{
		ctx.strokeRect(this.x,this.y,this.width,this.height);
	};

	obj.Rect = Rect;

	return obj;
})