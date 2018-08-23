jQuery(function($) {
    'use strict';

    // -------------------------------------------------------------
    //   One Item Per Frame
    // -------------------------------------------------------------
    (function() {
        var $frame = $('#oneperframe');
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 0,
            touchDragging: 0,
            releaseSwing: 0,
            scrollSource: null,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 0,
            dynamicHandle: 0,
            clickBar: 1,
            cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 5000, // Delay between cycles in milliseconds.
            pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
            activatePageOn: "click", // Event used to activate page. Can be: click, mouseenter, ...
            // Buttons
            prev: $wrap.find('.prev'),
            next: $wrap.find('.next')
        });
    }());
    (function() {
        var $frame = $('.coffe_machines');
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollSource: null,
            startAt: 0,
            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 15000, // Delay between cycles in milliseconds.
            pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
            pagesBar: ".pages", // Selector or DOM element for pages bar container.
            activatePageOn: "click", // Event used to activate page. Can be: click, mouseenter, ...
            // Buttons
            prev: $wrap.find('.machines_prev'),
            next: $wrap.find('.machines_next')
        });
    }());
    (function() {
        var $frame = $('.di_maestri');
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollSource: null,
            startAt: 0,
            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 15000, // Delay between cycles in milliseconds.
            pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
            pagesBar: $wrap.find(".pages"), // Selector or DOM element for pages bar container.
            activatePageOn: "click", // Event used to activate page. Can be: click, mouseenter, ...
            // Buttons
            prevPage: $wrap.find('.prev'),
            nextPage: $wrap.find('.next')
        });
    }());
    (function() {
        var $frame = $('.calendar_slides');
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateMiddle: 1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollSource: null,
            startAt: 0,
            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
            cycleInterval: 155000, // Delay between cycles in milliseconds.
            pauseOnHover: 0, // Pause cycling when mouse hovers over the FRAME.
            pagesBar: $wrap.find(".pages"), // Selector or DOM element for pages bar container.
            activatePageOn: "click", // Event used to activate page. Can be: click, mouseenter, ...
            // Buttons
            prevPage: $wrap.find('.prev'),
            nextPage: $wrap.find('.next')
        });
    }());

});