define(["moveMode"],function(moveMode)
{
	"use strict";

	var obj = {};

	var map = {
		"Move Mode": moveMode.MoveMode
	};

	obj.getMode = function(modeName)
	{
		return new map[modeName];
	};

	return obj;


});