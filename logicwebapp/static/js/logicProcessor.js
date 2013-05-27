define(function()
{
	
	"use strict";

	var obj = {};

	var wiresForGroup = {};
	var statusForGroups = {};

	function floodFillRecurse(currentNode,currentGroup)
	{
		if (currentNode.group === currentGroup)
			return;

		currentNode.group = currentGroup;

		currentNode.wires.forEach(function (wire)
		{
			wiresForGroup[currentGroup].push(wire);
			floodFillRecurse(wire.startNode,currentGroup);
			floodFillRecurse(wire.stopNode,currentGroup);
		});

	}

	function floodFill(nodes)
	{
		var lastGroup = 1;
		nodes.forEach(function(node)
		{
			if (node.group === undefined)
			{
				wiresForGroup[lastGroup] = [];
				statusForGroups[lastGroup] = false;
				floodFillRecurse(node,lastGroup++);
			}
		});
	}

	function setGroupsForGates(gates)
	{

		gates.forEach(function (gate)
		{
			gate.inputGroups = 
			gate.inputNodes.map(function (node)
			{
				return node.group;
			});

			gate.outputGroups = 
			gate.outputNodes.map(function (node)
			{
				return node.group;
			});
		});

	}


	function LogicProcessor(state)
	{
		

		floodFill(state.currentNodes);
		setGroupsForGates(state.currentGates);

		this.gates = state.currentGates;
		console.log(state);
	}

	LogicProcessor.prototype.processGate = function(gate)
	{
		switch (gate.type)
		{
			case "out":
				gate.setActivated(statusForGroups[gate.inputGroups[0]]);
				break;

			case "not":
				this.setGateStatus(gate.outputGroups[0],gate,!statusForGroups[gate.inputGroups[0]]);
				break;

			case "nand":
				this.setGateStatus(gate.outputGroups[0],gate,!(statusForGroups[gate.inputGroups[0]] && statusForGroups[gate.inputGroups[1]]));
				break;

			case "and":
				this.setGateStatus(gate.outputGroups[0],gate,statusForGroups[gate.inputGroups[0]] && statusForGroups[gate.inputGroups[1]]);
				break;

			case "or":
				this.setGateStatus(gate.outputGroups[0],gate,statusForGroups[gate.inputGroups[0]] || statusForGroups[gate.inputGroups[1]]);
				break;

			case "xor":
				this.setGateStatus(gate.outputGroups[0],gate,statusForGroups[gate.inputGroups[0]] != statusForGroups[gate.inputGroups[1]]);
				break;


			default:
				console.error("Gate could not be processed",gate.type,gate);
				debugger; // Gate not processed
		}
		
	};



	LogicProcessor.prototype.flipSwitch = function(gate)
	{
		if (gate.type !== "in")
			return;

		var status = !gate.getActivated();
		gate.setActivated(status);

		this.setGateStatus(gate.outputGroups[0],gate,status);
	};

	LogicProcessor.prototype.setGateStatus = function(outputGroup,gate,status)
	{

		if (status === statusForGroups[outputGroup])
		{
			return;
		}

		wiresForGroup[outputGroup].forEach(function (wire)
		{
			wire.setActivated(status);
		});

		statusForGroups[outputGroup] = status;

		this.gates.forEach(function (anotherGate)
		{
			if (anotherGate.inputGroups.indexOf(outputGroup) !== -1)
			{
				this.processGate(anotherGate);
			}
		},this);


	};

	obj.LogicProcessor = LogicProcessor;

	return obj;

});