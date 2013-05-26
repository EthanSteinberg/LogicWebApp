define(function()
{
	"use strict";

	var obj = {};

	function MoveMode()
	{
	}

	MoveMode.prototype.mouseup = function()
	{
		if (this.selection)
		{
			this.selection.setSelected(false);
			this.selection = null;
		}
	};

	MoveMode.prototype.mousemove = function(x,y)
	{
		if (this.selection)
		{
			var targetX = x - this.dragOffsetX;
			var targetY = y - this.dragOffsetY;

			this.selection.setPosition(targetX,targetY);
		}
	};

	MoveMode.prototype.mousedown = function(x,y,state)
	{

		state.currentNodes.forEach(function (object)
		{
			if (!this.selection && !object.hasGate() && object.contains(x,y))
			{
				this.selection = object;
			}
		},this);

		state.currentGates.forEach(function (object)
		{
			if (!this.selection && object.contains(x,y))
			{
				this.selection = object;
			}

		},this);

		if (this.selection)
		{
		this.selection.setSelected(true);
		this.dragOffsetX = x - this.selection.getX();
		this.dragOffsetY = y - this.selection.getY();
		}
	};

	obj.MoveMode = MoveMode;
	return obj;

});