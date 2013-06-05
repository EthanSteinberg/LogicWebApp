define(function()
{
	
	"use strict";

	var obj = {};

	


	function LogicProcessor(state)
	{
		this.wiresForGroup = [];
		this.statusForGroups = {};
		

		this.floodFill(state.currentNodes);
		setGroupsForGates(state.currentGates);




		this.gates = state.currentGates;
		this.gates.sort(function (a,b)
		{

			return a.yValue - b.yValue;
		});
		this.setInputAndOutput();

		this.toggleAllInputs();
		console.log(state);



	}

	LogicProcessor.prototype.toggleAllInputs = function()
	{
		this.inputGates.forEach(function (gate)
		{
			this.statusForGroups[gate.outputGroups[0]] = true;
			this.setGateStatus(gate.outputGroups[0],gate,false);
		},this);
	};


	LogicProcessor.prototype.setInputAndOutput = function()
	{
		this.inputGates = this.gates.filter(function (gate)
		{
			return gate.type === "in";
		});

		this.outputGates = this.gates.filter(function (gate)
		{
			return gate.type === "out";
		});
	};


	LogicProcessor.prototype.floodFillRecurse = function (currentNode,currentGroup)
	{
		if (currentNode.group === currentGroup)
			return;

		currentNode.group = currentGroup;

		currentNode.wires.forEach(function (wire)
		{
			this.wiresForGroup[currentGroup].push(wire);
			this.floodFillRecurse(wire.startNode,currentGroup);
			this.floodFillRecurse(wire.stopNode,currentGroup);
		},this);

	};

	LogicProcessor.prototype.floodFill = function (nodes)
	{
		var lastGroup = 1;
		nodes.forEach(function(node)
		{
			if (node.group === undefined)
			{
				this.wiresForGroup[lastGroup] = [];
				this.statusForGroups[lastGroup] = false;
				this.floodFillRecurse(node,lastGroup++);
			}
		},this);
	};

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

	LogicProcessor.prototype.getInputNodes = function()
	{
		return this.inputGates.length;
	};

	LogicProcessor.prototype.getOutputNodes = function()
	{
		return this.outputGates.length;
	};
	

	LogicProcessor.prototype.processGate = function(gate)
	{
		switch (gate.type)
		{
			case "out":
				gate.activated = this.statusForGroups[gate.inputGroups[0]];
				break;

			case "not":
				this.setGateStatus(gate.outputGroups[0],gate,!this.statusForGroups[gate.inputGroups[0]]);
				break;

			case "nand":
				this.setGateStatus(gate.outputGroups[0],gate,!(this.statusForGroups[gate.inputGroups[0]] && this.statusForGroups[gate.inputGroups[1]]));
				break;

			case "and":
				this.setGateStatus(gate.outputGroups[0],gate,this.statusForGroups[gate.inputGroups[0]] && this.statusForGroups[gate.inputGroups[1]]);
				break;

			case "or":
				this.setGateStatus(gate.outputGroups[0],gate,this.statusForGroups[gate.inputGroups[0]] || this.statusForGroups[gate.inputGroups[1]]);
				break;

			case "xor":
				this.setGateStatus(gate.outputGroups[0],gate,this.statusForGroups[gate.inputGroups[0]] !== this.statusForGroups[gate.inputGroups[1]]);
				break;

			case "composite":
				for (var i =0; i < gate.logic.inputGates.length; i++)
				{

					gate.logic.setGateStatus(gate.logic.inputGates[i].outputGroups[0],gate.logic.inputGates[i],this.statusForGroups[gate.inputGroups[i]]);
				}
				for (i =0; i < gate.logic.outputGates.length; i++)
				{

					this.setGateStatus(gate.outputGroups[i],gate.logic.outputGates[i],gate.logic.statusForGroups[gate.logic.outputGates[i].inputGroups[0]]);
				}

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

		var status = !gate.activated;
		gate.activated = status;

		this.setGateStatus(gate.outputGroups[0],gate,status);
	};

	LogicProcessor.prototype.setGateStatus = function(outputGroup,gate,status)
	{

		if (status === this.statusForGroups[outputGroup])
		{
			return;
		}

		this.wiresForGroup[outputGroup].forEach(function (wire)
		{
			wire.setActivated(status);
		});

		this.statusForGroups[outputGroup] = status;

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