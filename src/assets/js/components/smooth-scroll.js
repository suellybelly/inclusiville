//
// Smooth Scroll to anchor
//

;(function ($) {
    'use strict';

    var $header = $('.header');
    var headerHeight = 0;

    $('[data-toggle="smooth-scroll"]').on('click', function (e) {
        e.preventDefault();
        var targetSelector = $(this).data('target') || $(this).attr('href');
        var target = document.querySelector(targetSelector);

        if ($header.css('position') === 'fixed') {
            headerHeight = $header.outerHeight();
        }

        if (target) {
            var scrollTop = Math.max(0, $(target).offset().top - headerHeight);

            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({top: scrollTop, behavior: 'smooth'});
            } else {
                $('html, body').animate({scrollTop: scrollTop}, 1000);
            }
        }
    });

})(jQuery);
