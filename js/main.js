$(document).ready(function () {
	initFaq();
	initUp();
	initHeader();
	initInputs();
	showCheck();
	closeMenuLink();
	academySteps();
	//initChart();
	$('a.go_to').click(function () {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, {
			queue: false,
			duration: 1500
		});
		return false;
	});

	$('a.go_to2').click(function () {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		}, {
			queue: false,
			duration: 1500
		});
		return false;
	});

	jcf.setOptions('Select', {
		wrapNative: true,
		wrapNativeOnMobile: true,
		maxVisibleItems: 10
	});

	jcf.replaceAll();

	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('.link-modal').magnificPopup({
		type: 'inline',
		removalDelay: 160,
		closeBtnInside: true,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	$('.link-leave').magnificPopup({
		type: 'inline',
		removalDelay: 160,
		closeBtnInside: true,
		fixedContentPos: false,
		mainClass: 'mfp-fade mfp-leave'
	});

	$('.quotes-slider').slick({
		infinite: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true
	});
	scrollToBlock();
});

$(window).on('load', function () {
	initWave();
});

function closeMenuLink() {
	$('.menu_mob').find('a.go_to').click(function () {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, {
			queue: false,
			duration: 1500
		});
		$('#show_menu').prop("checked", false);
		return false;
	});

}

function academySteps() {
	$('.academy_steps').each(function () {
		var hold = $(this);
		var link = hold.find('.main_toggle');
		var linkGo = hold.find('a.go_to2');
		var fader = hold.find('.fader');
		var lvl1 = hold.find('.main > li').has('> .toggle');
		var lvl1Text = lvl1.find('> ul');

		lvl1.each(function () {
			var thisLvl1 = $(this);
			var thisText = thisLvl1.find('> ul');
			var thisLink = thisLvl1.find('> .toggle');

			thisLink.on('click', function () {
				if (thisLvl1.hasClass('open')) {
					thisText.slideUp(200, function () {
						thisLvl1.removeClass('open');
					});
				} else {
					lvl1Text.slideUp(200, function () {
						lvl1.removeClass('open');
					});
					thisText.slideDown(200, function () {
						thisLvl1.addClass('open');
					});
				}
			});
		});

		var _resize = function () {
			if (link.is(':visible')) {
				lvl1Text.slideUp(200, function () {
					lvl1.removeClass('open');
				});
			} else {
				hold.removeClass('open');
				$('body').removeClass('hide-header');
			}
		};

		link.on('click', function () {
			hold.toggleClass('open');
			$('body').toggleClass('hide-header');
		});

		linkGo.on('click', function () {
			hold.toggleClass('open');
			$('body').toggleClass('hide-header');
		});

		fader.on('click', function () {
			hold.removeClass('open');
			$('body').removeClass('hide-header');
		});

		_resize();
		$(window).on('resize', function () {
			_resize();
		});
	});
}

function initInputs() {
	$('.input input, .input textarea').each(function () {
		var _el = $(this);
		var _val = _el.val();

		if (_val == '') {
			$(this).parent().addClass('placeholder');
		}

		_el.bind('focus', function () {
			if (this.value == _val) {
				$(this).parent().removeClass('placeholder');
			}
			$(this).parent().addClass('input-focus');
		}).bind('blur', function () {
			if (this.value == '') {
				$(this).parent().addClass('placeholder');
			} else {
				$(this).parent().removeClass('placeholder');
			}
			$(this).parent().removeClass('input-focus');
		});
	});
	$('.input-pass').each(function () {
		var hold = $(this);
		var text = hold.find('input');
		var eye = hold.find('.eye-closed');
		var eyeClosed = hold.find('.eye-open');

		eye.click(function () {
			text.prop('type', 'text');
			hold.addClass('pass-visible');
			text.focus();
		});

		eyeClosed.click(function () {
			text.prop('type', 'password');
			hold.removeClass('pass-visible');
			text.focus();
		});
	});
}

function showCheck() {
	$('.main-form2').find('.show-check').each(function () {
		var hold = $(this);
		var link = hold.find('> .check').find('input:checkbox');
		var text = hold.find('.in');

		var _check = function () {
			if (link.is(':checked')) {
				text.slideDown(200, function () {
					hold.addClass('checked');
				});
			} else {
				text.slideUp(200, function () {
					hold.removeClass('checked');
				});
			}
		};

		_check();
		link.on('change', function () {
			_check();
		});
	});
}

function initChart() {
	$('.chart').each(function () {
		var hold = $(this);
		var t = hold.offset().top;

		var _scroll = function () {
			if (t < ($(window).scrollTop() + ($(window).height() / 2))) {
				hold.addClass('visible');
			} else {
				//hold.removeClass('visible')
			}
		};

		_scroll();
		$(window).scroll(function () {
			_scroll();
		});
	});
}

function initHeader() {
	$('.headline').each(function () {
		var hold = $(this);
		var place = $('.headline-place');
		var h = hold.outerHeight();
		place.css({
			'height': h
		});
	});

	var _scroll = function () {
		if ($(window).scrollTop() > 0) {
			$('body').addClass('fixed-header');
		} else {
			$('body').removeClass('fixed-header');
		}
	}
	_scroll();
	$(window).bind('scroll', _scroll);


}

function initWave() {
	$('.shade.t, .shade.b').each(function () {
		var hold = jQuery(this);
		var win = $(window);
		var canvas = hold.get(0);
		var context = canvas.getContext("2d");
		var resolution = window.devicePixelRatio || 1;

		var waves = [];
		var resized = false;

		var vw, vh;
		resizeCanvas();

		var wave1 = createWave(context, {
			amplitude: vh / 2,
			duration: 4,
			fillStyle: hold.data('rgb') ? "rgba(" + hold.data('rgb') + ",1)" : "rgba(255,0,0,1)",
			frequency: 2.5,
			width: vw,
			height: vh,
			segments: 50,
			waveHeight: vh * 0.25
		});

		var wave2 = createWave(context, {
			amplitude: vh / 2,
			duration: 2,
			fillStyle: hold.data('rgb') ? "rgba(" + hold.data('rgb') + ",0.6)" : "rgba(255,0,0,0.6)",
			frequency: 1.5,
			width: vw,
			height: vh,
			segments: 50,
			waveHeight: vh * 0.25
		});

		var wave3 = createWave(context, {
			amplitude: vh / 2,
			duration: 3,
			fillStyle: hold.data('rgb') ? "rgba(" + hold.data('rgb') + ",0.4)" : "rgba(255,0,0,0.6)",
			frequency: 4,
			width: vw,
			height: vh,
			segments: 50,
			waveHeight: vh * 0.25
		});

		var wave4 = createWave(context, {
			amplitude: vh / 2,
			duration: 5,
			fillStyle: hold.data('rgb') ? "rgba(" + hold.data('rgb') + ",0.4)" : "rgba(255,0,0,0.6)",
			frequency: 3,
			width: vw,
			height: vh,
			segments: 50,
			waveHeight: vh * 0.25
		});

		waves.push(wave1, wave2, wave3, wave4);

		// TweenMax.to(waves, 10, {
		//    waveHeight: vh / 2,
		//    ease: Sine.easeInOut,
		//    repeat: -1,
		//    repeatDelay: 1,
		//    yoyo: true,
		//    paused: true
		// });
		//
		// TweenMax.to(wave1, 6, {
		//    amplitude: 10,
		//    ease: Sine.easeInOut,
		//    repeat: -1,
		//    yoyo: true
		// });
		//
		// TweenMax.to(wave2, 7, {
		//    amplitude: 25,
		//    ease: Sine.easeInOut,
		//    repeat: -1,
		//    yoyo: true
		// });
		// TweenMax.to(wave3, 2, {
		// 	amplitude: 50,
		// 	ease: Sine.easeInOut,
		// 	repeat: -1,
		// 	yoyo: true
		// });
		window.addEventListener("resize", function () {
			resized = true;
		});

		TweenLite.ticker.addEventListener("tick", update);

		function update() {

			var len = waves.length;

			if (resized) {

				resizeCanvas();

				for (var i = 0; i < len; i++) {
					waves[i].resize(vw, vh);
				}

				resized = false;
			}

			context.clearRect(0, 0, vw, vh);
			context.globalCompositeOperation = "source-over";

			for (var i = 0; i < len; i++) {
				waves[i].draw();
			}
		}

		function createWave(context, options) {

			options = options || {};

			// API
			var wave = {

				// Properties
				amplitude: options.amplitude || 200,
				context: context,
				curviness: options.curviness || 0.75,
				duration: options.duration || 2,
				fillStyle: options.fillStyle || "rgba(33,150,243,1)",
				frequency: options.frequency || 4,
				height: options.height || 600,
				points: [],
				segments: options.segments || 100,
				tweens: [],
				waveHeight: options.waveHeight || 300,
				width: options.width || 800,
				x: options.x || 0,
				y: options.y || 0,

				// Methods
				init: init,
				resize: resize,
				draw: draw,
				kill: kill
			};
			var test = [];

			init();


			function kill() {

				var tweens = wave.tweens;
				var len = tweens.length;

				for (var i = 0; i < len; i++) {
					tweens[i].kill();
				}

				tweens.length = 0;
				wave.points.length = 0;
			}

			function pause() {

				var tweens = wave.tweens;
				var len = tweens.length;


				test[0] = setTimeout(function () {
					for (var i = 0; i < len; i++) {
						tweens[i].timeScale(0.75);
					}
				}, 500);
				test[1] = setTimeout(function () {
					for (var i = 0; i < len; i++) {
						tweens[i].timeScale(0.5);
					}
				}, 1000);
				test[2] = setTimeout(function () {
					for (var i = 0; i < len; i++) {
						tweens[i].timeScale(0.25);
					}
				}, 1500);
				test[3] = setTimeout(function () {
					for (var i = 0; i < len; i++) {
						tweens[i].paused(true);
					}
				}, 2000);
			}

			function init() {

				kill();

				var segments = wave.segments;
				var interval = wave.width / segments;
				var time, busy = false;

				for (var i = 0; i <= segments; i++) {

					var norm = i / segments;
					var point = {
						x: wave.x + i * interval,
						y: 1
					};

					var tween = TweenMax.to(point, wave.duration, {
						y: -1,
						repeat: -1,
						yoyo: true,
						ease: Sine.easeInOut
					}).progress(norm * wave.frequency)

					wave.tweens.push(tween);
					wave.points.push(point);
				}
				for (var i = 0; i < wave.tweens.length; i++) {
					wave.tweens[i].paused(true);
				}
				if (time) clearTimeout(time);
				time = setTimeout(function () {
					busy = false;
					pause();
				}, 10000);

				var _scroll = function () {
					if (!busy && (hold.offset().top > win.scrollTop() && hold.offset().top < win.scrollTop() + win.height())) {
						busy = true;
						for (var i = 0; i < test.length; i++) {
							if (test[i]) clearTimeout(test[i]);
						}
						for (var i = 0; i < wave.tweens.length; i++) {
							wave.tweens[i].timeScale(0.2);
						}
						for (var i = 0; i < wave.tweens.length; i++) {
							wave.tweens[i].resume();
						}
						setTimeout(function () {
							for (var i = 0; i < wave.tweens.length; i++) {
								wave.tweens[i].timeScale(0.5);
							}
						}, 500);
						setTimeout(function () {
							for (var i = 0; i < wave.tweens.length; i++) {
								wave.tweens[i].timeScale(0.75);
							}
						}, 1000);
						setTimeout(function () {
							for (var i = 0; i < wave.tweens.length; i++) {
								wave.tweens[i].timeScale(1);
							}
						}, 1500);
					}
					if (time) clearTimeout(time);
					time = setTimeout(function () {
						busy = false;
						pause();
					}, 10000);
				}
				_scroll();

				$(window).bind('scroll', _scroll);
			}

			function draw() {

				var points = wave.points;
				var len = points.length;

				var startY = wave.waveHeight;
				var height = wave.amplitude / 2;

				context.beginPath();
				context.moveTo(points[0].x, startY + points[0].y * height);

				for (var i = 1; i < len; i++) {

					var point = points[i];
					context.lineTo(point.x, startY + point.y * height);
				}

				context.lineTo(wave.x + wave.width, wave.y + wave.height);
				context.lineTo(wave.x, wave.y + wave.height);
				context.closePath();
				context.fillStyle = wave.fillStyle;
				context.fill();
			}

			function resize(width, height) {

				wave.width = width;
				wave.height = height;

				var points = wave.points;
				var len = points.length;
				var interval = wave.width / wave.segments;

				for (var i = 0; i < len; i++) {

					var point = points[i];
					point.x = wave.x + i * interval;
				}
			}

			return wave;
		}

		function resizeCanvas() {

			vw = window.innerWidth;
			vh = $(canvas).outerHeight();

			canvas.width = vw * resolution;
			canvas.height = vh * resolution;

			canvas.style.width = vw + "px";
			canvas.style.height = vh + "px";

			context.scale(resolution, resolution);
		}

	});
}

function initUp() {
	var _scroll = function () {
		var h = $(window).height();
		if ($(window).scrollTop() > h) {
			$('body').addClass('scroll_top');
		} else {
			$('body').removeClass('scroll_top');
		}
	};

	_scroll();
	$(window).on('scroll resize', function () {
		_scroll();
	});
}

function initFaq() {
	$('.faq').each(function () {
		var hold = $(this);
		var el = hold.find('.el');
		var elAll = hold.find('.more_in');
		var linkAll = hold.find('div.show_more > span');
		var options = {
			queue: true,
			duration: 200,
			easing: 'linear'
		};

		el.each(function () {
			var elin = $(this);
			var link = elin.find('h3');
			var text = elin.find('.in');

			link.click(function () {
				if (elin.hasClass('open')) {
					text.slideUp(200, function () {
						elin.removeClass('open');
					});
				} else {
					text.slideDown(200, function () {
						elin.addClass('open');
					});
				}
			});

		});

		linkAll.click(function () {
			if (hold.hasClass('open')) {
				elAll.slideUp(options);
				$('html,body').animate({
					scrollTop: hold.offset().top
				}, 200);
				hold.removeClass('open');
			} else {
				elAll.slideDown(options);
				hold.addClass('open');
			}
		});
	});

}

function scrollToBlock() {
	var currHash = window.location.hash;
	var testString = "blockId=";
	var blockId = currHash.slice(currHash.indexOf(testString) + testString.length);
	var hold = $("html, body").find('#' + blockId);
	$("html, body").animate({
		scrollTop: hold.offset().top
	}, 4000);
}
