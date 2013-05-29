define(["canvasWrapper","buttonController","modes","serialize"],function(canvasWrapper,buttonController,modes,serialize)
{
	"use strict";



	

	
	var newMode = modes.getMode("Viewer Mode");
	newMode.setState(canvasWrapper.getState());
	canvasWrapper.setMode(newMode);
	canvasWrapper.canvasReady(function()
	{


		console.timeStamp("images loaded");
		

		if ($("#alreadyOpen").html() !== "")
		{
			var msg = $("#alreadyOpen").text();
			var result = JSON.parse(msg);
			var st = serialize.deserialize(msg,result);
			canvasWrapper.setState(st);
			var newMode = modes.getMode("Viewer Mode");
			newMode.setState(canvasWrapper.getState());
			canvasWrapper.setMode(newMode);
		}



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
					var newMode = modes.getMode("Viewer Mode");
					newMode.setState(canvasWrapper.getState());
					canvasWrapper.setMode(newMode);
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