//
// Form control selectable
//

;(function ($) {
    'use strict';

    var inputs = [];

    $('.form-selectable-label[data-input]')
        .each(function () {
            var selector = $(this).attr('data-input'),
                input = document.querySelector(selector);

            input && inputs.push(input);
        })
        .on('click', function (e) {
            var inputSelector = $(this).attr('data-input'),
                $input = $(inputSelector);

            if ($input) {
                if ($input.is('[type="radio"]')) {
                    $input.prop('checked', true);
                } else {
                    $input.prop('checked', !$input.prop('checked'));
                }

                $input.trigger('change');
            }
        });

    var processInput = function () {
        var $input = $(this),
            $container = $input.closest('.form-selectable-label');

        if ($input.prop('checked')) {
            $container.addClass('selected');
        } else {
            $container.removeClass('selected');
        }
    };

    $(inputs)
        .each(processInput)
        .on('change', function () {
            $(inputs).trigger('refresh');
        })
        .on('refresh', function (e) {
            e.stopPropagation();
            processInput.apply(this);
        });

})(jQuery);