define(["canvasWrapper","buttonController","modes","serialize"],function(canvasWrapper,buttonController,modes,serialize)
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
			canvasWrapper.addGate(gate);
		});


		buttonController.onAddNode(function ()
		{
			canvasWrapper.addNode();
		});


		buttonController.onSaveButton(function ()
		{
			var result = serialize.serialize(canvasWrapper.getState());
			$.ajax({
				type: "POST",
				url: "/save",
				data: { chipToSave: result}
			}).done(function( msg ) {
				$("#resultOfSave").html(msg);
				$("#saveModal").modal("show");
			});

		});

		buttonController.onAddButton(function ()
		{
			$("#addDesignId").val("");
			$("#addDesignName").val("");
			$(".openErrors").html("");
			$("#addModal").modal("show");
		});

		$("#openButton").click(function()
		{
			//alert("Hi");
			//alert($("#oldDesignId").val());
			var id = $("#oldDesignId").val();
			$.ajax({
				type: "GET",
				url: "/open/" + id,
			}).done(function( msg ) {
				var result = JSON.parse(msg);
				console.log(result);
				if (result.error)
				{
					$(".openErrors").html(result.error);
				}
				else
				{
					$("#openModal").modal("hide");
					var st = serialize.deserialize(msg,result);
					canvasWrapper.setState(st);
					$("#modeSelectorMenu li a:first").click();
				}
				
			});
		});

		$("#addButton").click(function()
		{
			//alert("Hi");
			//alert($("#oldDesignId").val());
			var id = $("#addDesignId").val();
			$.ajax({
				type: "GET",
				url: "/open/" + id,
			}).done(function( msg ) {
				var result = JSON.parse(msg);
				console.log(result);
				if (result.error)
				{
					$(".openErrors").html(result.error);
				}
				else
				{
					$("#addModal").modal("hide");
					var st = serialize.deserialize(msg,result);
					

					canvasWrapper.addGate("composite",st,$("#addDesignName").val(),id);
				}
				
			});
		});


		buttonController.onOpenButton(function()
		{
			$("#oldDesignId").val("");
			$(".openErrors").html("");
			$("#openModal").modal("show");

		});
		
	});

	
});