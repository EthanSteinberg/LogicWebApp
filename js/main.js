define(["canvasWrapper","buttonController"],function(canvasWrapper,buttonController)
{
	"use strict";



	canvasWrapper.canvasReady(function()
	{
		console.timeStamp("images loaded");
		canvasWrapper.drawGate("and",0,0);

		buttonController.onAddGate(function (gate)
		{
			canvasWrapper.drawGate(gate,0,0);
		});

		buttonController.onWireMode(function (value)
		{
			canvasWrapper.setWireMode(value);
		});

		buttonController.onAddNode(function (value)
		{
			canvasWrapper.addNode(20,20);
		});
		
		
	});
});