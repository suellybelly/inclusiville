//
// Header
//

;(function ($) {
    'use strict';

    var $header = $('.header');
    var $spacingHelper = $header.next('.header-spacing-helper');

    if (!$spacingHelper.length) {
        $spacingHelper = $('<div class="header-spacing-helper"/>').insertAfter($header);
    }

    $spacingHelper.css('height', $header.outerHeight());

    var $body = $('body');
    var fn = function () {
        if (window.scrollY > 150) {
            $body.addClass('page-scrolled');
        } else {
            $body.removeClass('page-scrolled');
        }
    };

    $(window).on('scroll', fn);
    $(fn); // document.ready

})(jQuery);