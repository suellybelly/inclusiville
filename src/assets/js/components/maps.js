//
// Google maps integration
//

jQuery(window).one('wph.google_maps_loaded', function () {
    'use strict';

    // bail early if google maps is not loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        return;
    }

    // cache variable shortcut
    var $ = jQuery;

    // select map placements
    var $mapBlocks = $('.gmap');

    // map colour theme
    // taken from https://snazzymaps.com/style/132/light-gray
    var gmapStyle = [{
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#d3d3d3' }]
    }, {
        featureType: 'transit',
        stylers: [{ color: '#808080' }, { visibility: 'off' }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'on' }, { color: '#b3b3b3' }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { weight: 1.8 }]
    }, {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#d7d7d7' }]
    }, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#ebebeb' }]
    }, {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#a7a7a7' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#efefef' }]
    }, {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#696969' }]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'on' }, { color: '#737373' }]
    }, { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#d6d6d6' }]
    }, { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, {}, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ color: '#dadada' }]
    }
    ];

    // default rewritable map options
    var mapDefaultOptions = {
        zoom: 14,
        // center:            { lat: 44.731607, lng: -72.997038 },
        disableDefaultUI: true,
        openFirstInfobox: true,
        draggable: true,
        styles: gmapStyle,
        mapTypeId: 'roadmap'
    };

    // init maps
    $mapBlocks.each(function () {
        var $map = $(this).find('.gmap-embed-inner'),
            $infoboxes = $(this).find('.gmap-infobox'),
            custom_options = $map.data('options'),
            parallax_speed = parseInt($(this).find('.gmap-embed').data('parallax-speed'));

        var currentMapOptions = $.extend(mapDefaultOptions, custom_options);
        var mapObj = new google.maps.Map($map.get(0), currentMapOptions);

        // mapObj.addListener('bounds_changed', function () {
        //     console.log(this.getCenter().toString());
        // });

        $($infoboxes.get().reverse()).each(function () {
            var $infobox = $(this),
                latLng = $infobox.data('latlng').split(' '),
                location = { lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) };

            if (typeof currentMapOptions.center === 'undefined') {
                mapObj.setCenter(location);
            }

            var infobox_is_open = false;
            var infobox = new GoogleMaps_InfoBox_Factory({
                content: $infobox.html(),
                maxWidth: 350,
                boxClass: 'gmap-infobox',
                pixelOffset: new google.maps.Size(57, $infobox.find('.gmap-infobox-header').outerHeight() / 2 * -1),
                closeBoxURL: '',
                zIndex: 1,
                infoBoxClearance: new google.maps.Size(32, 32),
                enableEventPropagation: false
            });

            var marker = new google.maps.Marker({
                position: location,
                map: mapObj,
                icon: {
                    url: 'assets/images/map-marker.png',
                    anchor: new google.maps.Point(31, 31),
                    scaledSize: new google.maps.Size(62, 62)
                }
            });

            marker.addListener('click', function () {
                if (infobox_is_open) {
                    infobox.close();
                } else {
                    infobox.open(mapObj, marker);
                }

                infobox_is_open = !infobox_is_open;
            });
        });

        // enable parallax for map
        if (parallax_speed !== 0) {
            $map.css({
                top: -1 * parallax_speed / 2,
                bottom: -1 * parallax_speed / 2
            });

            $map.jarallax({
                type: 'element',
                speed: parallax_speed.toString() + ' 0'
            });
        }
    });
});

//
// Load google maps dependency
//
;(function ($) {
    'use strict';

    // avoid loading google maps if there is no map on page
    if (!$('.gmap').length) {
        return;
    }

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        var g_api_url = 'https://maps.google.com/maps/api/js?key=' + WPHJS.GOOGLE_MAPS_API_KEY;

        $.getScript(g_api_url, function () {
            $(window).trigger('wph.google_maps_loaded');
        });
    } else {
        $(window).trigger('wph.google_maps_loaded');
    }

})(jQuery);
