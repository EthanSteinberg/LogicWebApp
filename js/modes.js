define(["moveMode","wireMode","deleteMode"],function(moveMode,wireMode,deleteMode)
{
	"use strict";

	var obj = {};

	var map = {
		"Move Mode": moveMode.MoveMode,
		"Wire Mode": wireMode.WireMode,
		"Delete Mode": deleteMode.DeleteMode
	};

	obj.getMode = function(modeName)
	{
		return new map[modeName];
	};

	return obj;


});