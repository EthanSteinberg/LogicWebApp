define(["canvasWrapper","buttonController","modes"],function(canvasWrapper,buttonController,modes)
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

		buttonController.onAddNode(function ()
		{
			canvasWrapper.addNode(20,20);
		});

		buttonController.onEraseMode(function (value)
		{
			canvasWrapper.setEraseMode(value);
		});

		buttonController.onSetMode(function (mode)
		{
			canvasWrapper.setMode(mode);
		});
		
		
	});
});