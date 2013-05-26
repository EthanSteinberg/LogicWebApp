define(function()
{
	"use strict";

	var obj = {};

	obj.loadImages = function(urls, callback) 
	{
		var result = {};
		var sum = urls.length;
		urls.forEach(function(url)
		{
			var img = new Image();
			img.src = "img/"+url;
			img.onload = function()
			{
				sum--;
				if (sum === 0)
				{
					callback(result);
				}
			};
			result[url] = img;
		});
	};

	return obj;

});