define(["canvasWrapper"],function(canvasWrapper)
{
	"use strict";

	canvasWrapper.canvasReady(function()
	{
		//alert("Images loaded");
		canvasWrapper.drawGate("and",0,0);
		console.timeStamp("images loaded");
	});
});