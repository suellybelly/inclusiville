//
// Card slider
//

;(function ($) {
    'use strict';

    var $sliders = $('.card-slider');

    // helper function to set viewport padding
    var processSliderViewportMode = function (e) {
        var containerInnerWidth = WPHJS.getContainerInnerWidth(),
            windowWidth = $(window).outerWidth(),
            isFlickityReady = e.type === 'ready' && e.namespace === 'flickity',
            gapValue = windowWidth < 576 ? 0 : (windowWidth - containerInnerWidth) / 2;

        $(this).find('.card-slider-item:first').css('padding-left', gapValue);
        $(this).find('.card-slider-item:last').css('padding-right', gapValue);
        $(this).css({
            marginLeft: -1 * gapValue,
            marginRight: -1 * gapValue
        });

        if ($(this).data('flickity')) {
            $(this).flickity('resize');
        } else if (isFlickityReady) {
            var that = this;
            setTimeout(function () {
                $(that).flickity('resize');
            }, 0);
        }
    };

    // set proper initial values for viewport sliders
    $sliders.filter('.card-slider-viewport').on('ready.flickity', processSliderViewportMode);

    // set proper processing for viewport sliders
    $(window).on('resize', function () {
        $sliders.filter('.card-slider-viewport').each(processSliderViewportMode);
    });

    // support for external controls
    $('[data-target][data-action][data-toggle="card-slider"]').each(function () {
        var $control = $(this),
            $slider = $($control.data('target')),
            action = $control.data('action');

        // attach event listeners for proper actions
        if (action === 'prevSlide') {
            $control.on('click', function (e) {
                e.preventDefault();
                $slider.flickity('previous');
            });
        } else if (action === 'nextSlide') {
            $control.on('click', function (e) {
                e.preventDefault();
                $slider.flickity('next');
            });
        }

        // maintain proper disabled/enabled state for controls
        $slider.on('ready.flickity change.flickity', function () {
            var that = this;
            setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
                var flky = $(that).data('flickity');
                var lastIndex = flky.slides.length ? flky.slides.length - 1 : 0;
                var boundIndex = (action === 'prevSlide') ? 0 : lastIndex;
                $control.toggleClass('disabled', !flky.options.wrapAround && flky.selectedIndex === boundIndex);
                $control.prop('disabled', !flky.options.wrapAround && flky.selectedIndex === boundIndex);
            }, 0);
        });
    });

    // link all external controls
    $('[data-target][data-control="card-slider-dots"]').each(function () {
        var $control = $(this),
            $slider = $($control.data('target'));

        $slider.on('ready.flickity change.flickity', function () {
            var that = this;
            setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
                var flky = $(that).data('flickity');
                $control.html('<ul class="card-slider-dots"></ul>'); // reset element state
                var $dotsContainer = $control.find('.card-slider-dots');
                for (var i = 0; i < flky.slides.length; i++) {
                    var $dot = $('<li class="card-slider-dot"/>');
                    $dot.append($('<a href="#"/>').data('index', i).text(i + 1));
                    if (i === flky.selectedIndex) {
                        $dot.addClass('card-slider-dot-active');
                    }
                    $dotsContainer.append($dot);
                }
                $control.find('a').on('click', function (e) {
                    e.preventDefault();
                    flky.select($(this).data('index'));
                });
            }, 0);
        });
    });

    // instantiate plugin
    $sliders.each(function() {
        $(this).flickity($.extend({
            imagesLoaded: true,
            watchCSS: true,
            groupCells: true,
            percentPosition: false,
            cellAlign: 'left',
            sellSelector: '.card-slider-item',
            prevNextButtons: false,
            pageDots: false,
            contain: true
        }, $(this).data('options')));
    });
})(jQuery);
