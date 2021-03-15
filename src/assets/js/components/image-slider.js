//
// Image slider
//

;(function ($) {
    'use strict';

    var $sliders = $('.image-slider');

    // make prev and next buttons clickable
    $sliders.find('.image-slider-prev, .image-slider-next').on('click', function (e) {
        var $control = $(this),
            $slider = $control.closest('.image-slider').find('.image-slider-contents');

        if (typeof $slider.flickity === 'function') {
            e.preventDefault();

            if ($control.hasClass('image-slider-prev')) {
                $slider.flickity('previous');
            }

            if ($control.hasClass('image-slider-next')) {
                $slider.flickity('next');
            }
        }
    });

    // maintain proper disabled/enabled state for controls
    $sliders.find('.image-slider-contents').on('ready.flickity change.flickity', function () {
        var that = this,
            $slider = $(that).closest('.image-slider'),
            $prevControl = $slider.find('.image-slider-prev'),
            $nextControl = $slider.find('.image-slider-next');

        setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
            var flky = $(that).data('flickity'),
                lastIndex = flky.slides.length ? flky.slides.length - 1 : 0;

            $prevControl
                .toggleClass('disabled', (flky.selectedIndex === 0))
                .prop('disabled', (flky.selectedIndex === 0));

            $nextControl
                .toggleClass('disabled', (flky.selectedIndex === lastIndex))
                .prop('disabled', (flky.selectedIndex === lastIndex));
        }, 0);
    });

    // instantiate plugin
    $sliders.find('.image-slider-contents').flickity({
        draggable: true,
        imagesLoaded: true,
        watchCSS: false,
        groupCells: false,
        percentPosition: false,
        adaptiveHeight: true,
        sellSelector: '.image-slider-item',
        prevNextButtons: false,
        pageDots: false,
    });
})(jQuery);
