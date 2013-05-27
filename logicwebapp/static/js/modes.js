define(["moveMode","wireMode","deleteMode","viewerMode"],function(moveMode,wireMode,deleteMode,viewerMode)
{
	"use strict";

	var obj = {};

	var map = {
		"Move Mode": moveMode.MoveMode,
		"Wire Mode": wireMode.WireMode,
		"Delete Mode": deleteMode.DeleteMode,
		"Viewer Mode": viewerMode.ViewerMode
	};

	obj.getMode = function(modeName)
	{
		return new map[modeName];
	};

	return obj;


});