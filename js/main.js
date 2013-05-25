define(["canvasWrapper","buttonController"],function(canvasWrapper,buttonController)
{
	"use strict";



	canvasWrapper.canvasReady(function()
	{
		console.timeStamp("images loaded");

		buttonController.onAddGate(function (gate)
		{
			canvasWrapper.drawGate(gate,0,0);
		});
		
		
	});
});