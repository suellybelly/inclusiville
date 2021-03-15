//
// Form section
//

;(function ($) {
    'use strict';

    $('.form-collapsible-section')
        .each(function () {
            var $section = $(this),
                $sectionHead = $section.find('.form-collapsible-section-head'),
                $sectionBody = $section.find('.form-collapsible-section-body');

            $sectionHead.on('click', function () {
                $sectionBody.collapse('toggle');
            });

            $sectionBody.addClass('collapse');

            if ($section.attr('aria-expanded') === 'true') {
                $sectionBody.addClass('show');
            }
        })
        .on('hide.bs.collapse', function () {
            $(this).attr('aria-expanded', false);
        })
        .on('show.bs.collapse', function () {
            $(this).attr('aria-expanded', true);
        });

})(jQuery);