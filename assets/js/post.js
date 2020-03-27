(function ($) {

	// ——————————————————————————————————————————————————
	// Smooth Scroll / Menu Controller
	// ——————————————————————————————————————————————————

	$(document).on('ready', function () {

		/*START MENU JS*/
		$('a.page-scroll').on('click', function (e) {
			if ($(window).width() >= 991) { var buffer = 130 } else { var buffer = 62 }
			var anchor = $(this);
			$('html, body').stop().animate(
				{
					scrollTop: $(anchor.attr('href')).offset().top - buffer
				},
				1000
			);
			e.preventDefault();
		});

		$(document).on('click', '.navbar-collapse.in', function (e) {
			if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
				$(this).collapse('hide');
			}
		});
		/*END MENU JS*/
	});

	/**
	 *  @danieltamkin peer programming
	 */
	$(document).ready(function(){

		$(".modal-trigger").click(function(){
			let element = $(this.className + " .modal-glitch");
			let attr = $(this).attr('data-src');
			$(attr + " .modal-glitch").glitch();

		})

		$(".glitch").ifVisible({
			offset: 40,
			callback: function(element){
				$(element).glitch();
			}
		})
	});
	$(window).scroll(function(){
		$(".glitch").ifVisible({
			offset: 40,
			callback: function(element){
				$(element).glitch();
			}
		})
	});

})(jQuery);
