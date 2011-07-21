/**
 * lightwindows
 * 
 * @author thomaz takashi oda toyama <contato@thomazot.com.br>
 */
(function($,window,undefined) {
	$.fn.lightwindow = function(options) {
		var config = $.extend({ width: '925', height: '553' , 'winBody': 'body', 'speedyOpen': 'fast', 'speedyClose': 'fast' }, options)
		, element = function (e) { return document.createElement(e); }
		, windows = { 
			instance: function() {
				if($(config.winBody).find('div.lightwindow-window').length <= 0){
					var _window = $(element('div'))
					, y = $(window).height(), x = $(window).width();
					
					$(config.winBody).css({'min-width': config.width + 'px', 'min-height': config.height + 'px'});
					
					_window.addClass('lightwindow-window'); 
					_window.css({ top: (y/2), left: (x/2) });
					
					_window.click(function(){
						_window.close();
					});
					
					$(config.winBody).append(_window);
					
					return _window;
				} else {
					return $(config.winBody).find('div.lightwindow-window')
				}
			}
			, open: function() {
				var _window = windows.instance();
				_window.animate({ width: config.width, height: config.height, top:'-='+(config.height/2), left: '-='+(config.width/2) },config.speedyOpen);
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
					
					overBody.click(function(){
						windows.close();
					});
					
					$(window).keydown(function(e) {
						if(e.keyCode = 27 && $(config.winBody).find('div.lightwindow-window').length > 0){
							windows.close();
						}
					});
					
					$(config.winBody).append(overBody);
					
					return overBody;
				}else{
					return $(config.winBody).find('div.lightwindow-overbody');
				}
			}
			, open: function() {
				var _overlay = overlay.instance();
				_overlay.fadeIn('fast',function() { windows.open(); });
				return false;
			}
			, close: function() {
				var _overlay = overlay.instance();
				_overlay.fadeOut('fast',function() { _overlay.remove(); });
			}
		}
		lightwindow = {
			open: function() {
				overlay.open();
			},
			close: function() {
				windows.close();
			}
		};
		
		$(this).click(function(){
			lightwindow.open();
			return false;
		});
		
		$(window).resize(function(){ 
			var width 	= $(this).width();
			var height 	= $(this).height();
			var _overlay 	= overlay.instance();
			var _window		= windows.instance();
			var top = ((height/2) - (config.height/2)) , left = ((width/2) - (config.width/2)) ;
			
			_overlay.css({'width': width, 'height' : height});
			_window.css({ 'top': top, 'left':left });
			
		});
		
	};
})(jQuery,window);