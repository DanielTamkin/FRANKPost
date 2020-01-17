(function ($) {
    'use strict';

    jQuery(document).on('ready', function () {

        /*PRELOADER JS*/
        $(window).on('load', function () {
            $('.status').fadeOut();
            $('.preloader').delay(350).fadeOut('slow');
        });
        /*END PRELOADER JS*/



        /*START SLIDER JS*/

        $(document).ready(function () {

            var sync1 = $("#sync1");
            var sync2 = $("#sync2");

            sync1.owlCarousel({
                autoPlay: 12000,
                singleItem: true,
                slideSpeed: 1000,
                navigation: true,
                pagination: false,
                afterAction: syncPosition,
                responsiveRefreshRate: 200,
            });

            sync2.owlCarousel({
                singleItem: true,
                slideSpeed: 800,
                navigation: true,
                pagination: false,
                afterAction: syncPosition,
                responsiveRefreshRate: 200,
                mouseDrag: false,
                touchDrag: false,
                afterInit: function (el) {
                    el.find(".owl-item").eq(0).addClass("synced");
                }
            });


            function syncPosition(el) {
                var current = this.currentItem;
                $("#sync2")
                    .find(".owl-item")
                    .removeClass("synced")
                    .eq(current)
                    .addClass("synced")
                if ($("#sync2").data("owlCarousel") !== undefined) {
                    center(current)
                }
            }

            $("#sync2").on("click", ".owl-item", function (e) {
                e.preventDefault();
                var number = $(this).data("owlItem");
                sync1.trigger("owl.goTo", number);
            });

            function center(number) {
                var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
                var num = number;
                var found = false;
                for (var i in sync2visible) {
                    if (num === sync2visible[i]) {
                        var found = true;
                    }
                }

                if (found === false) {
                    if (num > sync2visible[sync2visible.length - 1]) {
                        sync2.trigger("owl.goTo", num - sync2visible.length + 1)
                    } else {
                        if (num - 1 === -1) {
                            num = 0;
                        }
                        sync2.trigger("owl.goTo", num);
                    }
                } else if (num === sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", sync2visible[1])
                } else if (num === sync2visible[0]) {
                    sync2.trigger("owl.goTo", num - 1)
                }

            }
        });

        var owl = $('.owl.carousel');
        owl.owlCarousel();
        // Go to the next item
        $('.owl-next').click(function () {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.owl-prev').click(function () {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger('prev.owl.carousel', [300]);
        })

        /*END SLIDER JS*/

        /*START CLIENT LOGO*/
        $('.partner').owlCarousel({
            autoPlay: 3000,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
        });
        /*END PARTNER LOGO*/

        /*START LIGHTBOX JS*/

        $(document).ready(function () {
            $('.venobox').venobox();
        });

        $('.lightbox').venobox({
            infinigall: true
        });
        /*END LIGHTBOX JS*/

    });

    /*START WOW ANIMATION JS*/
    new WOW().init();
    /*END WOW ANIMATION JS*/

})(jQuery);
