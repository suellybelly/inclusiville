//
// Hero block
//

;(function ($) {
    'use strict';

    // calculates height of specified element with respect of its position from the top
    var calc_hero_height = function (hero) {
        return Math.max(
            $(window).outerHeight() - $(hero).position().top,
            WPHJS.childrenTotalHeight($(hero).find('.hero-foreground'))
        );
    };

    // sets correct 'min-height' property for all fullscreen heros on the page
    var set_hero_height = function (hero) {
        if ($(hero).hasClass('hero-fullscreen')) {
            return function () {
                hero.each(function () {
                    $(this).css('min-height', calc_hero_height(this) + 'px');
                });
            };
        } else {
            return function () {};
        }
    };

    // integrate all this code with jarallax and imagesLoaded
    $('.hero').each(function () {
        var $hero = $(this);

        $hero.imagesLoaded(function () {
            if ($hero.hasClass('jarallax')) {
                jarallax($hero.get(0), {
                    videoSrc: $hero.attr('data-video'),
                    automaticResize: true,
                    onInit: function () {
                        $(set_hero_height($hero)); // document.ready
                        $(window).on('resize orientationchange', set_hero_height($hero));
                        $hero.addClass('hero-bg-ready');
                    }
                });
            } else {
                $(set_hero_height($hero)); // document.ready
                $(window).on('resize orientationchange', set_hero_height($hero));
                $hero.addClass('hero-bg-ready');
            }
        });
    });
})(jQuery);
