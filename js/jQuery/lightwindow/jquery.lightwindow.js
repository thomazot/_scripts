/**
 * lightwindows
 * 
 * @author thomaz takashi oda toyama <contato@thomazot.com.br>
 */
(function($,window,undefined) {
	
	$.fn.lightwindow = function(options) {
		var config = $.extend({ width: '925', height: '553' , 'winBody': 'body', 'speedyOpen': 'fast', 'speedyClose': 'fast' }, options) 
		, self = this
		, element = function (e) { return document.createElement(e); }
		, windows = { 
			instance: function() {
				if($(config.winBody).find('div.lightwindow-window').length <= 0){
					var _window = $(element('div'))
					, y = $(window).height(), x = $(window).width();

					$(config.winBody).css({'min-width': config.width + 'px', 'min-height': config.height + 'px'});

					_window.addClass('lightwindow-window'); 
					_window.css({ top: (y/2), left: (x/2) });

					$(config.winBody).append(_window);

					return _window;
				} else {
					return $(config.winBody).find('div.lightwindow-window')
				}
			}
			, open: function(calback) {
				var _window = windows.instance();
				if(calback != undefined) calback();
				_window.animate({ width: config.width, height: config.height, top:'-='+(config.height/2), left: '-='+(config.width/2) }
								,config.speedyOpen, function() { });
			}
			, close: function() {
				var _window = windows.instance();
				_window.animate({ width: 0, height: 0, top:'+='+(config.height/2), left: '+='+(config.width/2)},config.speedyClose,function(){
					_window.remove(); overlay.close();
				});
			}
		}
		, overlay = {
			instance: function () {
				if($(config.winBody).find('div.lightwindow-overbody').length <= 0){
					var overBody = $(element('div'))
					, y = $(window).height(), x = $(window).width();
					overBody.addClass('lightwindow-overbody'); 
					overBody.css({'width': x, 'height' : y, display:'none'});

					overBody.click(function(){ windows.close(); });

					$(window).keydown(function(e) {
						if(e.keyCode == 27 && $(config.winBody).find('div.lightwindow-window').length > 0){
							windows.close();
						};
					});

					$(config.winBody).append(overBody);

					return overBody;
				}else{
					return $(config.winBody).find('div.lightwindow-overbody');
				};
			}
			, open: function(callback) {
				var _overlay = overlay.instance();
				_overlay.fadeIn('fast',function() { windows.open(callback); });
				return false;
			}
			, close: function() {
				var _overlay = overlay.instance();
				_overlay.fadeOut('fast',function() { _overlay.remove(); });
			}
		}
		, lightwindow = {
			open: function(callback) {
				overlay.open(callback);
				return false;
			},
			close: function() {
				windows.close();
			}
		}
		, loading = {
			instance: function() {
				var _window = windows.instance();
				if($(_window).find('div.lightwindow-loading').length <= 0){
					var loadwin = element('div');

					loadwin.addClass('lightwindow-loading');
					loadwin.css({ 'display':'none' });
					_window.append(loadding);

					return loadwin;
				}else return $(_window).find('div.lightwindow-loading');
			}
			, start: function() {
				var loadwin = loading.instance();

				loadwin.fadeIn('fast');
			}
			,stop: function() {
				var loadwin = loading.instance();

				loadwin.fadeOut('fast');
			}
		};
		
		$(window).resize(function(){ 
			var width 	= $(this).width();
			var height 	= $(this).height();
			var _overlay 	= overlay.instance();
			var _window		= windows.instance();
			var top = ((height/2) - (config.height/2)) , left = ((width/2) - (config.width/2)) ;
			
			_overlay.css({'width': width, 'height' : height});
			_window.css({ 'top': top, 'left':left });
			
		});
		
		/**
		 * Start light window
		 */
		$.fn.lightwindow.start = (function( obj, config) {
			var rel = $(obj).attr('rel');
			var galery = element('ul');
			if(rel != '' && rel != undefined) {
				var _window = windows.instance();
				$('a[rel="'+rel+'"]',config.winBody).click(function(){ 
					
					var href = $(this).attr('href');
					
					return lightwindow.open(function(){
						var _window = windows.instance();
						var iframe = element('iframe');
					
						$(iframe).attr({
							width: config.width
							, height: config.height
							, frameborder: 0
							, scrolling: 'no'
							, src: href
						});
						
						$(_window).append(iframe);
					}); 
				});
			};
			return this;
		})(this, config);
		
	};
	
	
})(jQuery,window);