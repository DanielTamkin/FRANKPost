(function($) {
	'use strict';

	// ——————————————————————————————————————————————————
	// Smooth Scroll / Menu Controller
	// ——————————————————————————————————————————————————

	jQuery(document).on('ready', function() {
		/*START MENU JS*/
		$('a.page-scroll').on('click', function(e) {
			var anchor = $(this);
			$('html, body').stop().animate(
				{
					scrollTop: $(anchor.attr('href')).offset().top - 130
				},
				1000
			);
			e.preventDefault();
		});

		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$('.menu-top').addClass('menu-shrink');
			} else {
				$('.menu-top').removeClass('menu-shrink');
			}
		});

		$(document).on('click', '.navbar-collapse.in', function(e) {
			if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
				$(this).collapse('hide');
			}
		});
		/*END MENU JS*/
	});

	// ——————————————————————————————————————————————————
	// Random Hero Image (inspired by jadnco)
	// ——————————————————————————————————————————————————

	var heroBG = [
		'assets/img/heroBG/1.jpg',
		'assets/img/heroBG/2.jpg',
		'assets/img/heroBG/3.jpg',
		'assets/img/heroBG/4.jpg',
		'assets/img/heroBG/5.jpg',
		'assets/img/heroBG/6.jpg',
		'assets/img/heroBG/7.jpg'
	];

	var rand = heroBG[Math.floor(Math.random() * heroBG.length)];
	var aboutBGelement = document.getElementById('about');
	aboutBGelement.style.backgroundImage = 'url("' + rand + '")';

})(jQuery);
