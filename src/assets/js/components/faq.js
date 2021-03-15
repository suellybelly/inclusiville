//
// FAQ block
//

;(function ($) {
    'use strict';

    $('.faq')
        .on('hide.bs.collapse', function () {
            $(this).removeClass('faq-open');
        })
        .on('show.bs.collapse', function () {
            $(this).addClass('faq-open');
        });

})(jQuery);