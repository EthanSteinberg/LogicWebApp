define(["logicProcessor"],function(logicProcessor)
{
	"use strict";

	var obj = {};

	function ViewerMode()
	{
	}

	ViewerMode.prototype.setState = function(state)
	{
		this.logic = new logicProcessor.LogicProcessor(state);
	};

	ViewerMode.prototype.mouseup = function()
	{

	};

	ViewerMode.prototype.mousemove = function(x,y)
	{

	};

	ViewerMode.prototype.mousedown = function(x,y,state)
	{

		state.currentGates.forEach(function (object)
		{
			if (!this.selection && object.contains(x,y))
			{
				this.selection = object;
			}

		},this);

		if (this.selection)
		{
			this.logic.flipSwitch(this.selection);
			this.selection = null;
		}
	};

	obj.ViewerMode = ViewerMode;
	return obj;

});