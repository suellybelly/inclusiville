//
// ShuffleJS grid integration
//

;(function ($) {
    'use strict';

    $('.shuffle-grid')
        .each(function () {
            $(this).data('shufflejs-instance', new Shuffle(this, {
                itemSelector: '.shuffle-grid-item',
                delimiter: ','
            }));
        })
        .on('set-filter.shufflejs', function (e, filterValue) {
            var shuffle = $(this)
                .closest('.shuffle-grid')
                .data('shufflejs-instance');

            shuffle.filter(['all', '*'].indexOf(filterValue) !== -1 ? Shuffle.ALL_ITEMS : filterValue);
        });

    // integration with radio buttons
    $('.radio-buttons-group[data-toggle="shuffle-grid"][data-target]')
        .on('change', function (e, filterValue) {
            var $control = $(this),
                $shuffleGrid = $($control.data('target'));

            $shuffleGrid.trigger('set-filter.shufflejs', filterValue);
        });
})(jQuery);
