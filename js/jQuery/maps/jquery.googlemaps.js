/**
 * Plugin para google maps api
 * 
 * @required 
 * 		- API do Google Maps V3
 *			<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=set_to_true_or_false"></script>
 *		- jQuery 1.5.2
 *
 * @author thomaz takashi oda toyama <contato@thomazot.com.br>
 */
(function($, window, undefined){

	var maps = (function() {
		var 
			latLng = new google.maps.LatLng(-34.397, 150.644)
			, map = null, marker = null
			, geocoder = new google.maps.Geocoder()
			opt = {
				latitude: null
				, longitude: null
				, icon: 'http://www.hotpixel.com.br/images/ico-mapa.png'
				, address: 'Marília, São Paulo, Av. Ipiranga 85'
				, contentString: '<div><center>'
					+ '<a href="http://www.hotpixel.com.br" target="_blank" >'
						+ '<img src="http://www.hotpixel.com.br/images/hot_pixel.png" alt="Hot Pixel" border="0" align="absmiddle" />'
					+ '</a>'
				+ '</center></div>'
				, options: {
					zoom: 16
					, center: latLng
					, mapTypeId: google.maps.MapTypeId.ROADMAP
				}
			};
		
		return {
			infowindow: function(contentString,open) { 
				if(opt.contentString) contentString = opt.contentString;
				
				var infowindow = new google.maps.InfoWindow({
    				content: contentString
					});
				
				return infowindow; 
			}
			, codeAdress : function() {
				if(geocoder) {
					geocoder.geocode({'address': opt.address}, function(results, status){
						if(status == google.maps.GeocoderStatus.OK){						
							map.setCenter(results[0].geometry.location);
							
							var infowindow = maps.infowindow(opt.address, true);
          					marker = new google.maps.Marker({
              					map: map, 
              					position: results[0].geometry.location,
              					title: 'teste',
              					icon: opt.icon
          					});
          					
          					infowindow.open(map,marker);
          					
          					google.maps.event.addListener(marker, 'click', function() {
  								infowindow.open(map,marker);
							});
          					
						} else alert('Geocode não foi bem sucedida pelo seguinte motivo:' + status)
					});
				}
			}
			, init: function(options) {
				opt = $.extend(opt,options);
				map = new google.maps.Map(document.getElementById($(this).attr('id')), opt.options);
				
				maps.codeAdress();
				
				return this;
			}
			
		};
		
	})();
	
	$.fn.extend({
		googlemaps: maps.init
	});

})(jQuery, window);