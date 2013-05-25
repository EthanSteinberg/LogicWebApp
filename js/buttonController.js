define(["domReady!"],function(dom)
{
	"use strict";

	var obj = {};
	var addGateCallbacks = [];

	$(".addGate").click(function (){
		var current = $(this);

		addGateCallbacks.forEach(function(callback)
		{

			callback(current.data("type"));
		});
		
	});

	obj.onAddGate = function(callback)
	{
		addGateCallbacks.push(callback);
	};

	return obj;

});