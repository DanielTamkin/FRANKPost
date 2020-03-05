(function($) {

	$.fn.ifVisible = function(options) {
		return this.each(function(key, element) {
			let settings = $.extend({
                offset: 0,
                callback: function(element){}
            }, options);
			let dfd = $.Deferred();

			let that = '';
            element = $(element);

            function isVisible(){
                let elementTop          = element.offset().top;
                let elementBottom       = elementTop + element.outerHeight();
                let viewportTop         = $(window).scrollTop();
                let viewportBottom      = viewportTop + $(window).height();
                let attr                = element.attr('visible-called');
                if(elementBottom > viewportTop && elementTop < viewportBottom){
                    if(attr !== "true"){                        
                        element.attr('visible-called', 'true');
                        settings.callback(element);
                    }
                }  
            }
            isVisible()
        });

    }
})(jQuery);