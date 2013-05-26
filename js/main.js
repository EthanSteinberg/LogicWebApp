define(["canvasWrapper","buttonController","modes"],function(canvasWrapper,buttonController,modes)
{
	"use strict";




	canvasWrapper.canvasReady(function()
	{


		console.timeStamp("images loaded");

		buttonController.onAddGate(function (gate)
		{
			canvasWrapper.addGate(gate,0,0);
		});

	
		buttonController.onAddNode(function ()
		{
			canvasWrapper.addNode(20,20);
		});


		buttonController.onSetMode(function (mode)
		{
			canvasWrapper.setMode(modes.getMode(mode));
		});
		
		
	});
});