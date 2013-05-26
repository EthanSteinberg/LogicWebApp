define(["domReady!"],function()
{
	"use strict";

	var obj = {};
	var addGateCallbacks = [];
	var addNodeCallbacks = [];
	var setModeCallbacks = [];


	var lastMode;


	$("#modeSelectorMenu li a").click(function()
	{
		console.log("clicked");
		var mode = $(this).html();
		lastMode = mode;
		$("#modeSelectorText").html(mode);
		console.log(mode);

		setModeCallbacks.forEach(function(callback)
		{
			callback(mode);
		});
	});


	$("#modeSelectorMenu li a:first").click();


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


	obj.onAddGate = function(callback)
	{
		addGateCallbacks.push(callback);
	};

	obj.onAddNode = function(callback)
	{
		addNodeCallbacks.push(callback);
	};

	obj.onSetMode = function(callback)
	{

		setModeCallbacks.push(callback);
		callback(lastMode);

	};

	return obj;

});