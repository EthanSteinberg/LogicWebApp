define(["domReady!"],function()
{
	"use strict";

	var obj = {};
	var addGateCallbacks = [];
	var addNodeCallbacks = [];
	var setModeCallbacks = [];
	var saveButtonCallbacks = [];
	var openButtonCallbacks = [];
	var addButtonCallbacks = [];
	var lastMode;



	$("#modeSelectorMenu li a").click(function()
	{
		var mode = $(this).html();
		lastMode = mode;
		$("#modeSelectorText").html(mode);

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

	$(".save").click(function (){

		saveButtonCallbacks.forEach(function(callback)
		{
			callback();
		});
		
	});

	$(".open").click(function (){

		openButtonCallbacks.forEach(function(callback)
		{
			callback();
		});
		
	});

	$(".add").click(function (){

		addButtonCallbacks.forEach(function(callback)
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

	obj.onSaveButton = function(callback)
	{
		saveButtonCallbacks.push(callback);
	};

	obj.onOpenButton = function(callback)
	{
		openButtonCallbacks.push(callback);
	};

	obj.onAddButton = function(callback)
	{
		addButtonCallbacks.push(callback);
	};

	return obj;

});