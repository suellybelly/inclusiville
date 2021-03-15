//
// Radio buttons control
//

;(function ($) {
    'use strict';

    $('.radio-buttons-group-disabled .btn').addClass('disabled');

    $('.radio-buttons-group:not(.radio-buttons-group-disabled)').each(function () {
        var $buttonsGroup = $(this),
            $buttons = $buttonsGroup.find('.btn');

        $buttons.on('click', function (e) {
            e.preventDefault();
            var $button = $(this);

            $buttons.removeClass('selected');
            $button.addClass('selected');

            $buttonsGroup.trigger('change', $button.data('value'));
        });
    });

})(jQuery);
