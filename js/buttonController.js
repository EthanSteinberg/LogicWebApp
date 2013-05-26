define(["domReady!"],function(dom)
{
	"use strict";

	var obj = {};
	var addGateCallbacks = [];
	var wireModeCallbacks = [];
	var eraseModeCallbacks = [];
	var addNodeCallbacks = [];

	var setModeCallbacks = [];

	$("#modeSelectorMenu li a").click(function()
	{
		var mode = $(this).html();
		$("#modeSelectorText").html(mode);
		console.log(mode);

		setModeCallbacks.forEach(function(callback)
		{
			callback(mode);
		});
	});


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

	$(".eraseMode").click(function (){
		var current = $(this);

		current.toggleClass("active");

		eraseModeCallbacks.forEach(function (callback)
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

	obj.onEraseMode = function(callback)
	{
		eraseModeCallbacks.push(callback);
	};

	obj.onSetMode = function(callback)
	{
		setModeCallbacks.push(callback);
	};

	return obj;

});