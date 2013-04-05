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
    console.log('markers: '+JSON.stringify(markers));
    $('#map').vectorMap({
        map: 'us-map',
        backgroundColor: 'gray',
        zoomOnScroll: false,
        markers: markers,
        markerStyle: {initial: {fill: 'white', r:10}},
        focusOn: {
            x: 1,
            y: 0.5,
            scale: 2
        }
    });
})(jQuery);