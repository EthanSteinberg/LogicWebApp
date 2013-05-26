define(["canvasWrapper","buttonController","modes","shapes"],function(canvasWrapper,buttonController,modes,shapes)
{
	"use strict";


	buttonController.onSetMode(function (mode)
	{
		canvasWrapper.setMode(modes.getMode(mode));
	});


	canvasWrapper.canvasReady(function()
	{


		console.timeStamp("images loaded");

		buttonController.onAddGate(function (gate)
		{
			canvasWrapper.addGate(gate,0,0);
		});

	
		buttonController.onAddNode(function ()
		{
			canvasWrapper.addNode(20,20);
		});
		
	});

	function giveId(array)
	{
		var i = 0;
		for (i =0; i < array.length;i++)
		{
			array[i].id = i;
		}
	}

	function mapId(array)
	{
		return array.map(function (o)
			{
				return o.id;
			});
	}

	function unmapId(array,source)
	{
		return array.map(function (o)
			{
				return source[o];
			});
	}



	window.serialize = function()
	{
		var state = window.state;


		giveId(state.currentNodes);
		giveId(state.currentGates);
		giveId(state.currentWires);

		state.currentNodes.forEach(function (node)
		{
			if (node.gate)
				node.gate = node.gate.id;

			node.wires = mapId(node.wires);
		});

		state.currentGates.forEach(function (gate)
		{
			gate.nodes = mapId(gate.nodes);
			gate.inputNodes = mapId(gate.inputNodes);
			gate.outputNodes = mapId(gate.outputNodes);
		});

		state.currentWires.forEach(function (wire)
		{
			wire.startNode = wire.startNode.id;
			wire.stopNode = wire.stopNode.id;
		});

		state.currentPositions = shapes.allPositions;

		var result = JSON.stringify(state,function(key,value)
		{
			if (key === "pos" || (value && key === "oldPos"))
			{
				return value.id;
			}
			else
				return value;
		});

		state.currentNodes.forEach(function (node)
		{
			if (node.gate)
				node.gate = state.currentGates[node.gate];

			node.wires = unmapId(node.wires,state.currentWires);
		});

		state.currentGates.forEach(function (gate)
		{
			gate.nodes = unmapId(gate.nodes,state.currentNodes);
			gate.inputNodes = unmapId(gate.inputNodes,state.currentNodes);
			gate.outputNodes = unmapId(gate.outputNodes,state.currentNodes);
		});

		state.currentWires.forEach(function (wire)
		{
			wire.startNode = state.currentNodes[wire.startNode];
			wire.stopNode = state.currentNodes[wire.startNode];
		});
		



		return result;
		



	};
});