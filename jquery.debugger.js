(function($){
    // Breakpoint for bind() (or .click(), etc...)
    $.fn.bp = function(event) {
        var objects = $(this);

        objects.each(function() {
            var events = $(this).data('events');

            if(!events) {
                return;
            }

            var listOfEventData = events[event];

            if(!listOfEventData) {
                return;
            }

            $.each(listOfEventData, function() {
                var eventData = this;

                // Skip this, it's probably a delegate.
                if(eventData['selector']) {
                    return;
                }

                var debuggableFunction = eventData['handler'];

                eventData['handler'] = function() {
                    debugger;
                    debuggableFunction.apply(this, arguments);
                };
            });
        });
    };

    // Breakpoint for delegate() (or .live())
    $.fn.bpd = function(selector, event) {
        var objects = $(this);

        objects.each(function() {
            var events = $(this).data('events');

            if(!events) {
                return;
            }

            var listOfEventData = events['live'];

            if(!listOfEventData) {
                return;
            }

            $.each(listOfEventData, function() {
                var eventData = this;

                // Skip, it isn't a matching delegate.
                if(eventData['selector'] != selector || eventData['origType'] != event) {
                    return;
                }

                var debuggableFunction = eventData['origHandler'];

                eventData['origHandler'] = function() {
                    debugger;
                    debuggableFunction.apply(this, arguments);
                };

                console.log(eventData);
            });
        });
    };
})(jQuery);