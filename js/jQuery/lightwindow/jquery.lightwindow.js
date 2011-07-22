/**
 * lightwindows
 * 
 * @author thomaz takashi oda toyama <contato@thomazot.com.br>
 */
(function($,window,undefined) {
	var config = {}
		,element = function(tag) { return document.createElement(tag); }
		,lightwindow = {
			_init: function (options) {
				config = $.extend({ width: '925', height: '553' , 'winBody': 'body', 'speedyOpen': 'fast', 'speedyClose': 'fast', 'scrolling': 'no' }, options);
				
				lightwindow.start(this, config);
				
				$(window).resize(function(){ 
					var width 	= $(this).width();
					var height 	= $(this).height();
					var overlay 	= lightwindow._overlay.instance();
					var win			= lightwindow._window.instance();
					var top = ((height/2) - (config.height/2)) , left = ((width/2) - (config.width/2)) ;

					overlay.css({'width': width, 'height' : height});
					win.css({ 'top': top, 'left':left });

				});
				
				return lightwindow;
			}
			, _window: {
				instance: function() {
					if($(config.winBody).find('div.lightwindow-window').length <= 0){
						var win = element('div')
						, y = $(window).height(), x = $(window).width();

						$(config.winBody).css({'min-width': config.width + 'px', 'min-height': config.height + 'px'});

						$(win).addClass('lightwindow-window'); 
						$(win).css({ top: (y/2), left: (x/2) });

						$(config.winBody).append(win);

						return $(win);
					} else {
						return $(config.winBody).find('div.lightwindow-window');
					}
				}
				, open: function(calback) {
					var win = lightwindow._window.instance();
					if(calback != undefined) calback();
					win.animate({ width: config.width, height: config.height, top:'-='+(config.height/2), left: '-='+(config.width/2) }
									,config.speedyOpen, function() { });
				}
				, close: function() {
					var win = lightwindow._window.instance();
					win.animate({ width: 0, height: 0, top:'+='+(config.height/2), left: '+='+(config.width/2)},config.speedyClose,function(){
						win.remove(); lightwindow._overlay.close();
					});
				}
			}
			, _overlay: {
				instance: function () {
					if($(config.winBody).find('div.lightwindow-overbody').length <= 0){
						var overBody = $(element('div'))
						, y = $(window).height(), x = $(window).width();
						overBody.addClass('lightwindow-overbody'); 
						overBody.css({'width': x, 'height' : y, display:'none'});

						overBody.click(function(){ lightwindow._window.close(); });

						$(window).keydown(function(e) {
							if(e.keyCode == 27 && $(config.winBody).find('div.lightwindow-window').length > 0){
								lightwindow._window.close();
							};
						});

						$(config.winBody).append(overBody);

						return overBody;
					}else{
						return $(config.winBody).find('div.lightwindow-overbody');
					};
				}
				, open: function(callback) {
					var overlay = lightwindow._overlay.instance();
					overlay.fadeIn('fast',function() { lightwindow._window.open(callback); });
					return false;
				}
				, close: function() {
					var overlay = lightwindow._overlay.instance();
					overlay.fadeOut('fast',function() { overlay.remove(); });
				}
			}	
			, open: function(callback) {
				lightwindow._overlay.open(callback);
				return false;
			}
			, close: function() {
				lightwindow._window.close();
				return false;
			}
			, start: function(obj, config) {
				var rel = $(obj).attr('rel');
				var galery = element('ul');
				if(rel != '' && rel != undefined) {
					
					$('a[rel="'+rel+'"]',config.winBody).click(function(){ 

						var href = $(this).attr('href');

						return lightwindow.open(function(){
							var win = lightwindow._window.instance();
							var iframe = element('iframe');

							$(iframe).attr({
								width: config.width
								, height: config.height
								, frameborder: 0
								, scrolling: config.scrolling
								, src: href
							});

							$(win).append(iframe);
						}); 
					});
				};
			}
		};
	
	$.fn.lightwindow = lightwindow._init;
	
})(jQuery,window);