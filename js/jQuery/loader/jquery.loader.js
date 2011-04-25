/**
 * Loader
 *
 * @author Thomaz Takashi Oda toyama <thomazot>
 */
(function($) {
	$.fn.Loader = function (options) {
		var opt 		= $.extends({}, $.fn.Loader.defaults, options),
		tagId 			= this,
		started 		= false,
		each 			= $.each,
		start = (function(){
			
		}),
		//select all imgs
		getImages = (function() {
			var images = new Array();
			var urlReplace = ["url(\"","url(","\")",")"];
			
			//add own back image
			var url = "";
			if($(tagId).css("background-image") != "none"){
				url = $(tagId).css("background-image");	
			}else if(typeof(tagId).attr("src") != "undefined" && $(tagId).attr("tagName").toLowerCase() == "img"){
				url = $(tagId).attr("src");	
			}
			each(urlReplace, function(i,rep){ url.replace(rep,""); });
			if(url.length > 0){ images.push(url); }
			
			var everything = $(tagId).find("*:not(script)").each(function() {
				var url = "";
				if($(this).css("background-image") != "none"){
					url = $(this).css("background-image");	
				}else if(typeof(this).attr("src") != "undefined" && $(this).attr("tagName").toLowerCase() == "img"){
					url = $(this).attr("src");	
				}
				each(urlReplace, function(i,rep){ url.replace(rep,""); });
				if(url.length > 0){ images.push(url); }
			});
			
			return images;
		});
	};
	$.fn.Loader.defaults = {
		
	};
})(jQuery);