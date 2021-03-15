//
// JS Globals
//

;(function ($) {
    window.WPHJS = {
        /**
         * Replace this with your own API key. To create one please go to
         * @link https://developers.google.com/maps/documentation/javascript/get-api-key
         */
        GOOGLE_MAPS_API_KEY: 'AIzaSyBVrrJLTmmDoRk5nCE3xglH496gj1Ff-gE',

        /**
         * Calculates the height of specified element's children
         *
         * @param elem HTMLElement
         * @returns {number}
         */
        childrenTotalHeight: function (elem) {
            var result = 0;

            $(elem).find('> *').each(function () {
                result += $(this).outerHeight();
            });

            return result;
        },

        /**
         * Retrieves current outer width of container
         *
         * @return {number}
         */
        getContainerOuterWidth: function () {
            var $container = $('<div class="container"/>').appendTo($('body'));
            var containerWidth = $container.outerWidth();
            $container.remove();
            return containerWidth;
        },

        /**
         * Retrieves current inner width of container
         *
         * @return {number}
         */
        getContainerInnerWidth: function () {
            var $container = $('<div class="container"><div></div></div>').appendTo($('body'));
            var containerWidth = $container.find('> div').outerWidth();
            $container.remove();
            return containerWidth;
        }
    };
})(jQuery);
