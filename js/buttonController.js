define(["domReady!"],function(dom)
{
	"use strict";

	var obj = {};
	var addGateCallbacks = [];
	var wireModeCallbacks = [];
	var addNodeCallbacks = [];


	$(".addGate").click(function (){
		var current = $(this);

		addGateCallbacks.forEach(function(callback)
		{

			callback(current.data("type"));
		});
		
	});

	$(".addNode").click(function (){

		addNodeCallbacks.forEach(function(callback)
		{
			callback();
		});
		
	});

	$(".wireMode").click(function (){
		var current = $(this);

		current.toggleClass("active");

		wireModeCallbacks.forEach(function (callback)
		{
			callback(current.hasClass("active"));
		});
	});

	obj.onAddGate = function(callback)
	{
		addGateCallbacks.push(callback);
	};

	obj.onWireMode = function(callback)
	{
		wireModeCallbacks.push(callback);
	};

	obj.onAddNode = function(callback)
	{
		addNodeCallbacks.push(callback);
	}

	return obj;

});