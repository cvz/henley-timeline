(function($){
    $.fn.vectorMap('addMap', 'us-map', map);
    var markers = [];
    for (var event_index = 0; event_index < timelineData.length; event_index++) {
        var event = timelineData[event_index];
        var latlong = event['latlong'];
        if (latlong) {
            markers[markers.length] = {latLng: latlong, name: event.title};
        }
    }

    var markerStyle =   {
        initial: {
          fill: 'white',
          stroke: '#505050',
          "fill-opacity": 0,
          "stroke-width": 1,
          "stroke-opacity": 0,
          r: 10
        },
        hover: {
          stroke: 'black',
          "stroke-width": 5
        }
    };

    var onMarkerOver = function(e, code) {
    	console.log('onMarkerOver code: '+code+' e: '+JSON.stringify(e));
    };

    var onMarkerClick = function(e, code) {
    	console.log('onMarkerOver code: '+code+' e: '+JSON.stringify(e));
    };

    var onMarkerSelected = function(e, code, isSelected, selectedMarkers ) {
    	console.log('onMarkerSelected code: '+code+' isSelected: '+isSelected+' e: '+JSON.stringify(e));
    };

    $('#map').vectorMap({
        map: 'us-map',
        backgroundColor: 'gray',
        zoomOnScroll: false,
        markers: markers,
        markerStyle: markerStyle,
        focusOn: {
            x: 1,
            y: 0.5,
            scale: 2
        },
        onMarkerOver: onMarkerOver,
        onMarkerClick: onMarkerClick,
        onMarkerSelected: onMarkerSelected
    });
    
    $('#map').droppable({
		drop: function( e, ui ) {
			console.log('Dropped!! ui: '+JSON.stringify(ui));
		}
	});
    
})(jQuery);


