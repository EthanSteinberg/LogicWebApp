define(function()
{
	"use strict";

	var obj = {};

	function DeleteMode()
	{
	}

	DeleteMode.prototype.mouseup = function()
	{
	};

	DeleteMode.prototype.mousemove = function(x,y,state)
	{
		if (this.selection)
		{
			this.selection.setSelected(false);
			this.selection = null;

		}
		state.currentWires.forEach(function (object)
		{
			if (!this.selection && object.contains(x,y))
			{
				this.selection = object;
			}
		},this);

		state.currentNodes.forEach(function (object)
		{
			if (!this.selection && !object.hasGate()&&object.contains(x,y))
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
			this.selection.setSelected(true);
	};

	DeleteMode.prototype.mousedown = function(x,y,state)
	{


		if (this.selection)
		{
			this.selection.setSelected(false);
			this.selection = null;

		}
		state.currentWires.forEach(function (object)
		{
			if (!this.selection && object.contains(x,y))
			{
				this.selection = object;
			}
		},this);

		state.currentNodes.forEach(function (object)
		{
			if (!this.selection && !object.hasGate()&&object.contains(x,y))
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
			this.selection.destroy(state);
			this.selection = null;
			return;
		}
	};

	obj.DeleteMode = DeleteMode;
	return obj;
});