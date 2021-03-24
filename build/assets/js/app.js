//
// JS Globals
//

;(function ($) {
    // test
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

//
// Calendar
//

;(function ($) {
    'use strict';

    /**
     * Calendar library by ramalho
     * @see https://www.npmjs.com/package/calendar
     */
    var Calendar = (function (exports) {
        /*!
         * calendar.js: inspired by the calendar module from Python
         * Copyright(c) 2011 Luciano Ramalho <luciano@ramalho.org>
         * MIT Licensed
         */
        
        exports.version = '0.1.0';
        
        var CalendarException = function CalendarException(message) {
           this.message = message;
           this.toString = function() {
              return this.constructor.name + ": " + this.message
           };
        }
        
        var Calendar = function Calendar(firstWeekDay) {
            //properties
            this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
        };
        
        Calendar.prototype = {
            constructor : Calendar,
            weekStartDate : function weekStartDate(date) {
                var startDate = new Date(date.getTime());
                while (startDate.getDay() !== this.firstWeekDay) {
                    startDate.setDate(startDate.getDate() - 1);
                }
                return startDate;
            },
            monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
                if ((typeof year !== "number") || (year < 1970)) {
                    throw new CalendarException('year must be a number >= 1970');
                };
                if ((typeof month !== "number") || (month < 0) || (month > 11)) {
                    throw new CalendarException('month must be a number (Jan is 0)');
                };
                var weeks = [],
                    week = [],
                    i = 0,
                    date = this.weekStartDate(new Date(year, month, 1));
                do {
                    for (i=0; i<7; i++) {
                        week.push(dayFormatter ? dayFormatter(date) : date);
                        date = new Date(date.getTime());
                        date.setDate(date.getDate() + 1);
                    }
                    weeks.push(weekFormatter ? weekFormatter(week) : week);
                    week = [];
                } while ((date.getMonth()<=month) && (date.getFullYear()===year));
                return weeks;
            },
            monthDays : function monthDays(year, month) {
                var getDayOrZero = function getDayOrZero(date) {
                    return date.getMonth() === month ? date.getDate() : 0;
                };
                return this.monthDates(year, month, getDayOrZero);
            },
            monthText : function monthText(year, month) {
                if (typeof year === "undefined") {
                    var now = new Date();
                    year = now.getFullYear();
                    month = now.getMonth();
                };
                var getDayOrBlank = function getDayOrBlank(date) {
                    var s = date.getMonth() === month ? date.getDate().toString() : "  ";
                    while (s.length < 2) s = " "+s;
                    return s;
                };
                var weeks = this.monthDates(year, month, getDayOrBlank,
                    function (week) { return week.join(" ") });
                return weeks.join("\n");
            }
        };
        var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
        for (var i=0; i<months.length; i++)
            Calendar[months[i]] = i;
        
        exports.Calendar = Calendar;
        
        return exports.Calendar;
    })({});

    /**
     * Compare two dates
     *
     * @param a
     * @param b
     * @returns {number} -1 if a < b; 0 if a = b; 1 if a > b
     */
    var compareDates = function (a, b) {
        a = new Date(a.getFullYear(), a.getMonth(), a.getDate()).valueOf();
        b = new Date(b.getFullYear(), b.getMonth(), b.getDate()).valueOf();
        return (a > b) - (a < b);
    };

    /**
     * Compare two months
     *
     * @param a
     * @param b
     * @returns {number} -1 if a < b; 0 if a = b; 1 if a > b
     */
    var compareMonths = function (a, b) {
        a = a.getFullYear() * 12 + a.getMonth();
        b = b.getFullYear() * 12 + b.getMonth();
        return (a > b) - (a < b);
    };

    /**
     * Convert js Date object to HTML notation
     *
     * @param date {Date}
     * @returns {string}
     */
    var toHTMLDate = function (date) {
        return [
            date.getFullYear(),
            ((date.getMonth() + 1) + '').padStart(2, '0'),
            (date.getDate() + '').padStart(2, '0')
        ].join('-');
    };

    var firstDayOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    var lastDayOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };

    var currentDate = new Date();

    var defaultOptions = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        firstWeekDay: 1,
        dayItemContents: ['month-full', 'day'],
        months: [
            {short: 'Jan', full: 'January'},
            {short: 'Feb', full: 'February'},
            {short: 'Mar', full: 'March'},
            {short: 'Apr', full: 'April'},
            {short: 'May', full: 'May'},
            {short: 'Jun', full: 'June'},
            {short: 'Jul', full: 'July'},
            {short: 'Aug', full: 'August'},
            {short: 'Sep', full: 'September'},
            {short: 'Oct', full: 'October'},
            {short: 'Nov', full: 'November'},
            {short: 'Dec', full: 'December'},
        ],
        weekdays: [
            {short: 'Sun', full: 'Sunday'},
            {short: 'Mon', full: 'Monday'},
            {short: 'Tue', full: 'Tuesday'},
            {short: 'Wed', full: 'Wednesday'},
            {short: 'Thu', full: 'Thursday'},
            {short: 'Fri', full: 'Friday'},
            {short: 'Sat', full: 'Saturday'},
        ]
    };

    /**
     * Main plugin instance
     *
     * @param options
     * @returns {jQuery}
     */
    $.fn.calendar = function (options) {
        options = $.extend(defaultOptions, options);

        var cal = new Calendar(options.firstWeekDay);
        var $container = $(this);
        var displayDate = new Date(options.year, options.month);

        var $monthSelector = $('<div class="calendar-month-selector"/>').appendTo($container);
        var $weekdaysContainer = $('<div class="calendar-weekdays-container"/>').appendTo($container);
        var $datesContainer = $('<div class="calendar-dates-container"/>').appendTo($container);
        var $nativeInput = $('<input type="date" class="calendar-native-input form-control"/>').appendTo($container);

        if (options.nativeInputName) {
            $nativeInput.attr('name', options.nativeInputName);
        }

        if (options.maxDate) {
            $nativeInput.attr('max', toHTMLDate(options.maxDate));
        }

        if (options.minDate) {
            $nativeInput.attr('min', toHTMLDate(options.minDate));
        }

        var drawMonthSelector = function (date) {
            $monthSelector.empty().append(
                $('<button class="btn btn-square btn-light btn-sm prev-month"/>')
                    .html('<i class="material-icons">keyboard_arrow_left</i>'),
                $('<div class="current-month"/>')
                    .text(options.months[date.getMonth()].full + ' ' + date.getFullYear()),
                $('<button class="btn btn-square btn-light btn-sm next-month"/>')
                    .html('<i class="material-icons">keyboard_arrow_right</i>')
            );

            var prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
            if (options.minDate && compareDates(options.minDate, lastDayOfMonth(prevMonth)) === 1) {
                $monthSelector.find('.prev-month').addClass('disabled');
            }

            var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
            if (options.maxDate && compareDates(options.maxDate, firstDayOfMonth(nextMonth)) === -1) {
                $monthSelector.find('.next-month').addClass('disabled');
            }
        };

        var drawWeekdays = function () {
            $weekdaysContainer.empty();
            for (var i = 0; i < options.weekdays.length; i++) {
                var index = (i + options.firstWeekDay) % options.weekdays.length;
                $weekdaysContainer.append($('<div class="weekday"/>').text(options.weekdays[index].short));
            }
        };

        var drawDates = function (date) {
            $datesContainer.empty();
            var weeks = cal.monthDates(date.getFullYear(), date.getMonth());
            for (var i = 0; i < weeks.length; i++) {
                var currentWeek = weeks[i];
                for (var j = 0; j < currentWeek.length; j++) {
                    var currentDate = currentWeek[j];
                    var classNames = ['calendar-date', 'weekday-' + (currentDate.getDay() + 1)];

                    switch (compareMonths(currentDate, displayDate)) {
                        case -1:
                            classNames.push('prev-month');
                            break;
                        case 0:
                            classNames.push('current-month');
                            break;
                        case 1:
                            classNames.push('next-month');
                            break;
                    }

                    if (compareDates(currentDate, lastDayOfMonth(currentDate)) === 0) {
                        classNames.push('last-date-of-month');
                    } else if (compareDates(currentDate, firstDayOfMonth(currentDate)) === 0) {
                        classNames.push('first-date-of-month');
                    }

                    if (options.selectedDay && compareDates(currentDate, options.selectedDay) === 0) {
                        classNames.push('selected');
                    }

                    if (
                        options.maxDate && compareDates(currentDate, options.maxDate) === 1 ||
                        options.minDate && compareDates(currentDate, options.minDate) === -1
                    ) {
                        classNames.push('disabled');
                    }

                    var $dayItem = $('<div/>', {class: classNames.join(' ')}).data('date', currentDate).appendTo($datesContainer);
                    var $dayItemContent = $('<div/>', {class: 'calendar-date-content'}).appendTo($dayItem);

                    $dayItemContent.append(
                        $.map(options.dayItemContents, function (val) {
                            if (val === 'month-full') {
                                return $('<div class="month-full"/>').text(
                                    options.months[currentDate.getMonth()].full
                                );
                            } else if (val === 'month-short') {
                                return $('<div class="month-short"/>').text(
                                    options.months[currentDate.getMonth()].short
                                );
                            } else if (val === 'day') {
                                return $('<div class="day"/>').text(
                                    currentDate.getDate()
                                );
                            } else if (val === 'weekday-full') {
                                return $('<div class="weekday-full"/>').text(
                                    options.weekdays[currentDate.getDay()].full
                                );
                            } else if (val === 'weekday-short') {
                                return $('<div class="weekday-short"/>').text(
                                    options.weekdays[currentDate.getDay()].short
                                );
                            }
                        })
                    );
                }
            }
        };

        drawMonthSelector(displayDate);
        drawWeekdays(displayDate);
        drawDates(displayDate);

        $container.on('click', '.calendar-date:not(.disabled)', function () {
            var $selectedDay = $(this).addClass('selected');
            $container.find('.calendar-date').not($selectedDay).removeClass('selected');
            $container.trigger('select-a-date', [$selectedDay.data('date')]);
            $nativeInput.val(toHTMLDate($selectedDay.data('date')));
        });

        $monthSelector.on('click', '.prev-month:not(.disabled), .next-month:not(.disabled)', function () {
            var $this = $(this);

            if ($this.hasClass('prev-month')) {
                displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1);
            } else {
                displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1);
            }

            drawMonthSelector(displayDate);
            drawDates(displayDate);
        });

        $nativeInput.on('change', function () {
            var parsedDate = new Date(this.value);
            options.selectedDay = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
            displayDate = new Date(options.selectedDay.getFullYear(), options.selectedDay.getMonth());
            drawMonthSelector(displayDate);
            drawDates(displayDate);
            $container.trigger('select-a-date', [options.selectedDay]);
        });

        $container.trigger('init');

        return this;
    };

    $('.calendar').calendar({
        minDate: currentDate,
        maxDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 90),
        selectedDay: new Date(),
        dayItemContents: ['month-short', 'day'],
    }).on('select-a-date', function (e, date) {
        console.log(date);
    });

})(jQuery, {});
//
// Card slider
//

;(function ($) {
    'use strict';

    var $sliders = $('.card-slider');

    // helper function to set viewport padding
    var processSliderViewportMode = function (e) {
        var containerInnerWidth = WPHJS.getContainerInnerWidth(),
            windowWidth = $(window).outerWidth(),
            isFlickityReady = e.type === 'ready' && e.namespace === 'flickity',
            gapValue = windowWidth < 576 ? 0 : (windowWidth - containerInnerWidth) / 2;

        $(this).find('.card-slider-item:first').css('padding-left', gapValue);
        $(this).find('.card-slider-item:last').css('padding-right', gapValue);
        $(this).css({
            marginLeft: -1 * gapValue,
            marginRight: -1 * gapValue
        });

        if ($(this).data('flickity')) {
            $(this).flickity('resize');
        } else if (isFlickityReady) {
            var that = this;
            setTimeout(function () {
                $(that).flickity('resize');
            }, 0);
        }
    };

    // set proper initial values for viewport sliders
    $sliders.filter('.card-slider-viewport').on('ready.flickity', processSliderViewportMode);

    // set proper processing for viewport sliders
    $(window).on('resize', function () {
        $sliders.filter('.card-slider-viewport').each(processSliderViewportMode);
    });

    // support for external controls
    $('[data-target][data-action][data-toggle="card-slider"]').each(function () {
        var $control = $(this),
            $slider = $($control.data('target')),
            action = $control.data('action');

        // attach event listeners for proper actions
        if (action === 'prevSlide') {
            $control.on('click', function (e) {
                e.preventDefault();
                $slider.flickity('previous');
            });
        } else if (action === 'nextSlide') {
            $control.on('click', function (e) {
                e.preventDefault();
                $slider.flickity('next');
            });
        }

        // maintain proper disabled/enabled state for controls
        $slider.on('ready.flickity change.flickity', function () {
            var that = this;
            setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
                var flky = $(that).data('flickity');
                var lastIndex = flky.slides.length ? flky.slides.length - 1 : 0;
                var boundIndex = (action === 'prevSlide') ? 0 : lastIndex;
                $control.toggleClass('disabled', !flky.options.wrapAround && flky.selectedIndex === boundIndex);
                $control.prop('disabled', !flky.options.wrapAround && flky.selectedIndex === boundIndex);
            }, 0);
        });
    });

    // link all external controls
    $('[data-target][data-control="card-slider-dots"]').each(function () {
        var $control = $(this),
            $slider = $($control.data('target'));

        $slider.on('ready.flickity change.flickity', function () {
            var that = this;
            setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
                var flky = $(that).data('flickity');
                $control.html('<ul class="card-slider-dots"></ul>'); // reset element state
                var $dotsContainer = $control.find('.card-slider-dots');
                for (var i = 0; i < flky.slides.length; i++) {
                    var $dot = $('<li class="card-slider-dot"/>');
                    $dot.append($('<a href="#"/>').data('index', i).text(i + 1));
                    if (i === flky.selectedIndex) {
                        $dot.addClass('card-slider-dot-active');
                    }
                    $dotsContainer.append($dot);
                }
                $control.find('a').on('click', function (e) {
                    e.preventDefault();
                    flky.select($(this).data('index'));
                });
            }, 0);
        });
    });

    // instantiate plugin
    $sliders.each(function() {
        $(this).flickity($.extend({
            imagesLoaded: true,
            watchCSS: true,
            groupCells: true,
            percentPosition: false,
            cellAlign: 'left',
            sellSelector: '.card-slider-item',
            prevNextButtons: false,
            pageDots: false,
            contain: true
        }, $(this).data('options')));
    });
})(jQuery);

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

//
// Image slider
//

;(function ($) {
    'use strict';

    var $sliders = $('.image-slider');

    // make prev and next buttons clickable
    $sliders.find('.image-slider-prev, .image-slider-next').on('click', function (e) {
        var $control = $(this),
            $slider = $control.closest('.image-slider').find('.image-slider-contents');

        if (typeof $slider.flickity === 'function') {
            e.preventDefault();

            if ($control.hasClass('image-slider-prev')) {
                $slider.flickity('previous');
            }

            if ($control.hasClass('image-slider-next')) {
                $slider.flickity('next');
            }
        }
    });

    // maintain proper disabled/enabled state for controls
    $sliders.find('.image-slider-contents').on('ready.flickity change.flickity', function () {
        var that = this,
            $slider = $(that).closest('.image-slider'),
            $prevControl = $slider.find('.image-slider-prev'),
            $nextControl = $slider.find('.image-slider-next');

        setTimeout(function () { // schedule code for next tick when `data('flickity')` will be available
            var flky = $(that).data('flickity'),
                lastIndex = flky.slides.length ? flky.slides.length - 1 : 0;

            $prevControl
                .toggleClass('disabled', (flky.selectedIndex === 0))
                .prop('disabled', (flky.selectedIndex === 0));

            $nextControl
                .toggleClass('disabled', (flky.selectedIndex === lastIndex))
                .prop('disabled', (flky.selectedIndex === lastIndex));
        }, 0);
    });

    // instantiate plugin
    $sliders.find('.image-slider-contents').flickity({
        draggable: true,
        imagesLoaded: true,
        watchCSS: false,
        groupCells: false,
        percentPosition: false,
        adaptiveHeight: true,
        sellSelector: '.image-slider-item',
        prevNextButtons: false,
        pageDots: false,
    });
})(jQuery);

//
// Google maps integration
//

jQuery(window).one('wph.google_maps_loaded', function () {
    'use strict';

    // bail early if google maps is not loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        return;
    }

    // cache variable shortcut
    var $ = jQuery;

    // select map placements
    var $mapBlocks = $('.gmap');

    // map colour theme
    // taken from https://snazzymaps.com/style/132/light-gray
    var gmapStyle = [{
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#d3d3d3' }]
    }, {
        featureType: 'transit',
        stylers: [{ color: '#808080' }, { visibility: 'off' }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'on' }, { color: '#b3b3b3' }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { weight: 1.8 }]
    }, {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#d7d7d7' }]
    }, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#ebebeb' }]
    }, {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#a7a7a7' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ffffff' }]
    }, {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'on' }, { color: '#efefef' }]
    }, {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#696969' }]
    }, {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'on' }, { color: '#737373' }]
    }, { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#d6d6d6' }]
    }, { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, {}, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ color: '#dadada' }]
    }
    ];

    // default rewritable map options
    var mapDefaultOptions = {
        zoom: 14,
        // center:            { lat: 44.731607, lng: -72.997038 },
        disableDefaultUI: true,
        openFirstInfobox: true,
        draggable: true,
        styles: gmapStyle,
        mapTypeId: 'roadmap'
    };

    // init maps
    $mapBlocks.each(function () {
        var $map = $(this).find('.gmap-embed-inner'),
            $infoboxes = $(this).find('.gmap-infobox'),
            custom_options = $map.data('options'),
            parallax_speed = parseInt($(this).find('.gmap-embed').data('parallax-speed'));

        var currentMapOptions = $.extend(mapDefaultOptions, custom_options);
        var mapObj = new google.maps.Map($map.get(0), currentMapOptions);

        // mapObj.addListener('bounds_changed', function () {
        //     console.log(this.getCenter().toString());
        // });

        $($infoboxes.get().reverse()).each(function () {
            var $infobox = $(this),
                latLng = $infobox.data('latlng').split(' '),
                location = { lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) };

            if (typeof currentMapOptions.center === 'undefined') {
                mapObj.setCenter(location);
            }

            var infobox_is_open = false;
            var infobox = new GoogleMaps_InfoBox_Factory({
                content: $infobox.html(),
                maxWidth: 350,
                boxClass: 'gmap-infobox',
                pixelOffset: new google.maps.Size(57, $infobox.find('.gmap-infobox-header').outerHeight() / 2 * -1),
                closeBoxURL: '',
                zIndex: 1,
                infoBoxClearance: new google.maps.Size(32, 32),
                enableEventPropagation: false
            });

            var marker = new google.maps.Marker({
                position: location,
                map: mapObj,
                icon: {
                    url: 'assets/images/map-marker.png',
                    anchor: new google.maps.Point(31, 31),
                    scaledSize: new google.maps.Size(62, 62)
                }
            });

            marker.addListener('click', function () {
                if (infobox_is_open) {
                    infobox.close();
                } else {
                    infobox.open(mapObj, marker);
                }

                infobox_is_open = !infobox_is_open;
            });
        });

        // enable parallax for map
        if (parallax_speed !== 0) {
            $map.css({
                top: -1 * parallax_speed / 2,
                bottom: -1 * parallax_speed / 2
            });

            $map.jarallax({
                type: 'element',
                speed: parallax_speed.toString() + ' 0'
            });
        }
    });
});

//
// Load google maps dependency
//
;(function ($) {
    'use strict';

    // avoid loading google maps if there is no map on page
    if (!$('.gmap').length) {
        return;
    }

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        var g_api_url = 'https://maps.google.com/maps/api/js?key=' + WPHJS.GOOGLE_MAPS_API_KEY;

        $.getScript(g_api_url, function () {
            $(window).trigger('wph.google_maps_loaded');
        });
    } else {
        $(window).trigger('wph.google_maps_loaded');
    }

})(jQuery);

//
// Info popovers
//

;(function ($) {
    'use strict';

    $('[data-toggle="popover"]').popover();
})(jQuery);
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

//
// Sticky sidebar
//

;(function ($) {
    'use strict';

    $('.sticky-sidebar').stickySidebar({
        topSpacing:    30,
        bottomSpacing: 30,
        // resizeSensor:  true
    });
})(jQuery);
var MenubarItem = function (domNode, menuObj) {
  this.menu = menuObj;
  this.domNode = domNode;
  this.hasFocus = false;
  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

MenubarItem.prototype.init = function () {
  this.domNode.tabIndex = -1;
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
};

MenubarItem.prototype.handleKeydown = function (event) {
  switch (event.keyCode) {
    //case this.keyCode.SPACE:
    //case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      this.menu.setFocusToNextItem(this);
      console.log("keyCode.DOWN");
      break;
    case this.keyCode.LEFT:
      this.menu.setFocusToPreviousItem(this);
      console.log("keyCode.LEFT");
      break;
    case this.keyCode.RIGHT:
      this.menu.setFocusToNextItem(this);
      console.log("keyCode.RIGHT");
      break;
    case this.keyCode.UP:
      this.menu.setFocusToPreviousItem(this);
      console.log("keyCode.UP");
      break;
    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      break;
    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      break;
    // case this.keyCode.TAB:
    // case this.keyCode.ESC:
    default:
      break;
  }
};

MenubarItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenubarItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
};

var Menubar = function (domNode) {
  e = domNode.firstElementChild;
  while (e) {
    e = e.nextElementSibling; 
  }
  this.domNode = domNode;
  this.menubarItems = []; // See Menubar init method
  this.firstItem = null; // See Menubar init method
  this.lastItem = null; // See Menubar init method
  this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
};

Menubar.prototype.init = function () {
  var menubarItem, menuElement, numItems;
  elem = this.domNode.firstElementChild;
  while (elem) {
    var menuElement = elem.firstElementChild;
    if (elem && menuElement) {
      menubarItem = new MenubarItem(menuElement, this);
      menubarItem.init();
      this.menubarItems.push(menubarItem);
    }
    elem = elem.nextElementSibling;
  }
  console.log("this.menubarItems: ", this.menubarItems);
  // Use populated menuitems array to initialize firstItem and lastItem.
  numItems = this.menubarItems.length;
  if (numItems > 0) {
    this.firstItem = this.menubarItems[ 0 ];
    this.lastItem = this.menubarItems[ numItems - 1 ];
    console.log("firstItem: ", this.firstItem);
    console.log("lastItem: ", this.lastItem);
  }
  this.firstItem.domNode.tabIndex = 0;
};

/* FOCUS MANAGEMENT METHODS */

Menubar.prototype.setFocusToItem = function (newItem) {
  for (var i = 0; i < this.menubarItems.length; i++) {
    var mbi = this.menubarItems[i];
    mbi.domNode.tabIndex = -1;
  }
  newItem.domNode.focus();
  newItem.domNode.tabIndex = 0;
};

Menubar.prototype.setFocusToFirstItem = function () {
  this.setFocusToItem(this.firstItem);
};

Menubar.prototype.setFocusToLastItem = function () {
  this.setFocusToItem(this.lastItem);
};

Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;
  if (currentItem === this.firstItem) {
    newItem = this.lastItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[ index - 1 ];
  }
  this.setFocusToItem(newItem);
};

Menubar.prototype.setFocusToNextItem = function (currentItem) {
  var index;
  if (currentItem === this.lastItem) {
    newItem = this.firstItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[ index + 1 ];
  }
  this.setFocusToItem(newItem);
};

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
var MenuItem = function (domNode, menuObj) {

  if (typeof popupObj !== 'object') {
    popupObj = false;
  }

  this.domNode = domNode;
  this.menu = menuObj;
  this.popupMenu = false;
  this.isMenubarItem = false;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

MenuItem.prototype.init = function () {
  this.domNode.tabIndex = -1;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Initialize flyout menu

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new PopupMenu(nextElement, this);
    this.popupMenu.init();
  }

};

MenuItem.prototype.isExpanded = function () {
  return this.domNode.getAttribute('aria-expanded') === 'true';
};

/* EVENT HANDLERS */

MenuItem.prototype.handleKeydown = function (event) {
  var tgt  = event.currentTarget,
    char = event.key,
    flag = false,
    clickEvent;

  function isPrintableCharacter (str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      else {

        // Create simulated mouse event to mimic the behavior of ATs
        // and let the event handler handleClick do the housekeeping.
        try {
          clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
        }
        catch (err) {
          if (document.createEvent) {
            // DOM Level 3 for IE 9+
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }
        tgt.dispatchEvent(clickEvent);
      }

      flag = true;
      break;

    case this.keyCode.UP:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case this.keyCode.DOWN:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case this.keyCode.LEFT:
      this.menu.setFocusToController('previous', true);
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      else {
        this.menu.setFocusToController('next', true);
        this.menu.close(true);
      }
      flag = true;
      break;

    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      flag = true;
      break;

    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      flag = true;
      break;

    case this.keyCode.ESC:
      this.menu.setFocusToController();
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.TAB:
      this.menu.setFocusToController();
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenuItem.prototype.setExpanded = function (value) {
  if (value) {
    this.domNode.setAttribute('aria-expanded', 'true');
  }
  else {
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

MenuItem.prototype.handleClick = function (event) {
  this.menu.setFocusToController();
  this.menu.close(true);
};

MenuItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenuItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};

MenuItem.prototype.handleMouseover = function (event) {
  this.menu.hasHover = true;
  this.menu.open();
  if (this.popupMenu) {
    this.popupMenu.hasHover = true;
    this.popupMenu.open();
  }
};

MenuItem.prototype.handleMouseout = function (event) {
  if (this.popupMenu) {
    this.popupMenu.hasHover = false;
    this.popupMenu.close(true);
  }

  this.menu.hasHover = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
var PopupMenu = function (domNode, controllerObj) {
  var elementChildren,
    msgPrefix = 'PopupMenu constructor argument domNode ';

  // Check whether domNode is a DOM element
  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  }
  // Check whether domNode has child elements
  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  }
  // Check whether domNode descendant elements have A elements
  var childElement = domNode.firstElementChild;
  while (childElement) {
    var menuitem = childElement.firstElementChild;
    if (menuitem && menuitem === 'A') {
      throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
    }
    childElement = childElement.nextElementSibling;
  }

  this.isMenubar = false;

  this.domNode    = domNode;
  this.controller = controllerObj;

  this.menuitems = []; // See PopupMenu init method
  this.firstChars = []; // See PopupMenu init method

  this.firstItem = null; // See PopupMenu init method
  this.lastItem = null; // See PopupMenu init method

  this.hasFocus = false; // See MenuItem handleFocus, handleBlur
  this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
};

/*
*   @method PopupMenu.prototype.init
*
*   @desc
*       Add domNode event listeners for mouseover and mouseout. Traverse
*       domNode children to configure each menuitem and populate menuitems
*       array. Initialize firstItem and lastItem properties.
*/
PopupMenu.prototype.init = function () {
  var childElement, menuElement, menuItem, textContent, numItems, label;

  // Configure the domNode itself

  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Traverse the element children of domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  childElement = this.domNode.firstElementChild;

  while (childElement) {
    menuElement = childElement.firstElementChild;

    if (menuElement && menuElement.tagName === 'A') {
      menuItem = new MenuItem(menuElement, this);
      menuItem.init();
      this.menuitems.push(menuItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }
    childElement = childElement.nextElementSibling;
  }

  // Use populated menuitems array to initialize firstItem and lastItem.
  numItems = this.menuitems.length;
  if (numItems > 0) {
    this.firstItem = this.menuitems[ 0 ];
    this.lastItem = this.menuitems[ numItems - 1 ];
  }
};

/* EVENT HANDLERS */

PopupMenu.prototype.handleMouseover = function (event) {
  this.hasHover = true;
};

PopupMenu.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.close.bind(this, false), 1);
};

/* FOCUS MANAGEMENT METHODS */

PopupMenu.prototype.setFocusToController = function (command, flag) {

  if (typeof command !== 'string') {
    command = '';
  }

  function setFocusToMenubarItem (controller, close) {
    while (controller) {
      if (controller.isMenubarItem) {
        controller.domNode.focus();
        return controller;
      }
      else {
        if (close) {
          controller.menu.close(true);
        }
        controller.hasFocus = false;
      }
      controller = controller.menu.controller;
    }
    return false;
  }

  if (command === '') {
    if (this.controller && this.controller.domNode) {
      this.controller.domNode.focus();
    }
    return;
  }

  if (!this.controller.isMenubarItem) {
    this.controller.domNode.focus();
    this.close();

    if (command === 'next') {
      var menubarItem = setFocusToMenubarItem(this.controller, false);
      if (menubarItem) {
        menubarItem.menu.setFocusToNextItem(menubarItem, flag);
      }
    }
  }
  else {
    if (command === 'previous') {
      this.controller.menu.setFocusToPreviousItem(this.controller, flag);
    }
    else if (command === 'next') {
      this.controller.menu.setFocusToNextItem(this.controller, flag);
    }
  }

};

PopupMenu.prototype.setFocusToFirstItem = function () {
  this.firstItem.domNode.focus();
};

PopupMenu.prototype.setFocusToLastItem = function () {
  this.lastItem.domNode.focus();
};

PopupMenu.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;

  if (currentItem === this.firstItem) {
    this.lastItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[ index - 1 ].domNode.focus();
  }
};

PopupMenu.prototype.setFocusToNextItem = function (currentItem) {
  var index;

  if (currentItem === this.lastItem) {
    this.firstItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[ index + 1 ].domNode.focus();
  }
};

PopupMenu.prototype.setFocusByFirstCharacter = function (currentItem, char) {
  var start, index, char = char.toLowerCase();

  // Get start index for search based on position of currentItem
  start = this.menuitems.indexOf(currentItem) + 1;
  if (start === this.menuitems.length) {
    start = 0;
  }

  // Check remaining slots in the menu
  index = this.getIndexFirstChars(start, char);

  // If not found in remaining slots, check from beginning
  if (index === -1) {
    index = this.getIndexFirstChars(0, char);
  }

  // If match was found...
  if (index > -1) {
    this.menuitems[ index ].domNode.focus();
  }
};

PopupMenu.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[ i ]) {
      return i;
    }
  }
  return -1;
};

/* MENU DISPLAY METHODS */

PopupMenu.prototype.open = function () {
  // Get position and bounding rectangle of controller object's DOM node
  var rect = this.controller.domNode.getBoundingClientRect();

  // Set CSS properties
  if (!this.controller.isMenubarItem) {
    this.domNode.parentNode.style.position = 'relative';
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.left = rect.width + 'px';
    this.domNode.style.zIndex = 100;
  }
  else {
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.top = (rect.height - 1) + 'px';
    this.domNode.style.zIndex = 100;
  }

  this.controller.setExpanded(true);

};

PopupMenu.prototype.close = function (force) {

  var controllerHasHover = this.controller.hasHover;

  var hasFocus = this.hasFocus;

  for (var i = 0; i < this.menuitems.length; i++) {
    var mi = this.menuitems[i];
    if (mi.popupMenu) {
      hasFocus = hasFocus | mi.popupMenu.hasFocus;
    }
  }

  if (!this.controller.isMenubarItem) {
    controllerHasHover = false;
  }

  if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
    this.domNode.style.display = 'none';
    this.domNode.style.zIndex = 0;
    this.controller.setExpanded(false);
  }
};

//# sourceMappingURL=app.js.map
