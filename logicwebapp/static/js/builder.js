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
			canvasWrapper.addGate(gate,0,0);
		});


		buttonController.onAddNode(function ()
		{
			canvasWrapper.addNode(20,20);
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
					$("#openErrors").html(result.error);
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

		buttonController.onOpenButton(function()
		{
			$("#oldDesignId").val("");
			$("#openErrors").html("");
			$("#openModal").modal("show");

		});
		
	});

	
});