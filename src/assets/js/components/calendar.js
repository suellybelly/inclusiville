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
        //=include calendar/lib/calendar.js
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