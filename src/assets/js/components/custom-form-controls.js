//
// Styled checkboxes and radios
//

;(function ($) {
    'use strict';

    var $allControls = $('.custom-checkbox, .custom-radio');

    $allControls.each(function () {
        var $nativeControl = $(this),
            classPrefix = 'custom-' + $nativeControl.attr('type'),
            $wrap = $('<div/>', {class: classPrefix + '-wrap'}),
            $fakeInput = $('<div/>', {class: classPrefix + '-presenter'});

        $nativeControl.wrap($wrap);
        $wrap = $nativeControl.parent();
        $wrap.append($fakeInput);

        $nativeControl.on('refresh', function (e) {
            e.stopPropagation();

            if ($nativeControl.prop('checked')) {
                $wrap.addClass('checked');
            } else {
                $wrap.removeClass('checked');
            }
        });

        $nativeControl.on('change', function () {
            $allControls.trigger('refresh');
        });

        $fakeInput.on('click', function (e) {
            e.stopPropagation();

            if ($nativeControl.attr('type') === 'radio') {
                $nativeControl.prop('checked', true);
            } else {
                $nativeControl.prop('checked', !$nativeControl.prop('checked'));
            }

            $nativeControl.trigger('change');
        });

        $nativeControl.trigger('change');
    });

})(jQuery);