define(["wires"],function(wires)
{
	"use strict";

	var obj = {};

	function WireMode()
	{
	}

	WireMode.prototype.mouseup = function()
	{
	};

	WireMode.prototype.mousemove = function(x,y,state)
	{
		if (this.selection)
			this.tempNode.setPosition(x,y);

		if (this.newSelection)
		{
			this.newSelection.setSelected(false);
			this.newSelection = null;
		}
		state.currentNodes.forEach(function (object)
		{
			if (!this.newSelection && object !== this.selection && object.contains(x,y))
			{
				this.newSelection = object;
				this.newSelection.setSelected(true);
				return;
			}
		},this);
	};

	WireMode.prototype.mousedown = function(x,y,state)
	{


		if (!this.selection)
			{
				if (this.newSelection)
				{
					this.newSelection.setSelected(false);
					this.newSelection = null;
				}

				state.currentNodes.forEach(function (object)
				{
					if (!this.selection && object.contains(x,y))
					{
						this.selection = object;
						object.setSelected(true);
						return;
					}
				},this);

				if (this.selection)
				{
					this.tempNode = new wires.Node(x,y);
					this.newWire = new wires.Wire(this.selection,this.tempNode);
					state.currentWires.push(this.newWire);
				}
			}
			else
			{
				if (this.newSelection)
				{
					this.newSelection.setSelected(false);
					this.newSelection = null;
				}

				state.currentNodes.forEach(function (object)
				{
					if (!this.newSelection && object !== this.selection && object.contains(x,y))
					{
						this.newSelection = object;
						return;
					}
				},this);
				this.newWire.setStopNode(this.newSelection);
				this.selection.setSelected(false);
				this.selection = null;

			}
	};

	obj.WireMode = WireMode;
	return obj;

});