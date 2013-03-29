(function($){
    console.log('map: '+JSON.stringify(map));
    $.fn.vectorMap('addMap', 'us-map', map);
    $('#map').vectorMap({
        map: 'us-map',
        backgroundColor: 'gray',
        zoomOnScroll: false,
        focusOn: {
            x: 1,
            y: 0.5,
            scale: 2
        }
    });
})(jQuery);