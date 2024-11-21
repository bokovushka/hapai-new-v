function ajaxReload(url, method = 'reload', more, reload = '') {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	var state = {};
	var title = $('head').find('title').text();

	//console.log('Старт анимации...');
	$('body').css('opacity', '0.5');

	if (typeof url == 'undefined') {
		url = window.location.href;
	}
	if (!method) {
		method = 'reload';
	}
	var selector = [];

	if (!reload) {
		selector.push('*[data-' + method + '^=ajax-' + method + '-]');
	} else {
		$.each(reload, function (key, el) {
			selector.push('*[data-' + method + '=ajax-' + method + '-' + el + ']');
		});
	}

	$.get(url, function (data) {
		let dataQuery = $(data);
		let parser = new DOMParser();
		let documentParse = parser.parseFromString(data, 'text/html');

		if (documentParse.getElementsByTagName('title')) {
			$('head title').text(documentParse.getElementsByTagName('title')[0].innerText);
		}
		if (documentParse.querySelector("link[rel='canonical']")) {
			$('head link[rel=canonical]').attr('href', documentParse.querySelector("link[rel='canonical']").getAttribute('href'));
		}
		if (documentParse.querySelector("meta[name='description']")) {
			let descriptionParse = documentParse.querySelector("meta[name='description']");
			if ($('head meta[name=description]').length > 0) {
				$('head meta[name=description]').attr('content', descriptionParse.getAttribute('content'));
			} else {
				let metaDescription;
				metaDescription = document.createElement('meta');
				metaDescription.setAttribute('name', 'description');
				metaDescription.setAttribute('content', descriptionParse.getAttribute('content'));
				document.head.appendChild(metaDescription);
			}
		}
		if (dataQuery.find('#seo-text-section')) {
			$('#seo-text-section').html(dataQuery.find('#seo-text-section').html());
		}
		if (dataQuery.find('h1.title')) {
			$('h1.title').text(dataQuery.find('h1.title').text());
		}
		if (dataQuery.find('#filter-result > .filter-result-txt')) {
			$('.filter-result-txt').text(dataQuery.find('#filter-result > .filter-result-txt').text());
		}
		if (dataQuery.find('#calendar-main-count')) {
			$('#calendar-main-count').text(dataQuery.find('#calendar-main-count').text());
		}
		if (dataQuery.find('.language-m')) {
			$('.language-m').html(dataQuery.find('.language-m').html());
		}
		if (dataQuery.find('.language-d')) {
			$('.language-d').html(dataQuery.find('.language-d').html());
		}
		if (dataQuery.find('.filter-sort-box')) {
			$('.filter-sort-box').html(dataQuery.find('.filter-sort-box').html());
		}

		$.each(selector, function (i, selector_val) {
			$.each(dataQuery.find(selector_val), function (key, el) {
				if (method == 'reload') {
					$('*[data-' + method + '=' + $(el).attr('data-' + method + '') + ']').html($(el).find('>*').ready(function () {

					}));
				} else {
					$('*[data-' + method + '=' + $(el).attr('data-' + method + '') + ']').append($(el).find('>*').ready(function () {

					}));
					$('*[data-reload=ajax-reload-navigation]').html($(data).find('*[data-reload=ajax-reload-navigation]>*').ready(function () {

					}));
				}
			});
		})
	}, "html").done(function () {
		history.pushState(state, title, url);

		selectStyler();
		initSliders();
		initButtonsFilter();
		sortFiltersStyler();
		initPopupTriggers();
		swiperItemGallery();
		miniProductCartPrice();

		if (method == 'more' && more) {
			$("html, body").animate({ scrollTop: scrollTop }, 0);
		}

		$('body').css('opacity', '1');
		//console.log('Заканчиваем анимацию...');
	});
}

function makeRangeUrl(name, min, max) {
	let search = location.search.substring(1);
	let obj = search.length > 0 ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
		return key === "" ? value : decodeURIComponent(value)
	}) : {};
	obj[name + '_from'] = min;
	obj[name + '_to'] = max;
	let query = $.param(obj);
	let url = window.location.href.split('?')[0];
	url += '?' + query;
	ajaxReload(url);
}

function makeUrl(name, value) {
	let search = location.search.substring(1);
	let obj = search.length > 0 ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
		return key === "" ? value : decodeURIComponent(value)
	}) : {};
	obj[name] = value;
	let query = $.param(obj);
	let url = window.location.href.split('?')[0];
	url += '?' + query;
	ajaxReload(url);
}

function inputSliderRange(inputRangeSliderRef) {
	if (inputRangeSliderRef) {
		let step = inputRangeSliderRef.data('slider-step');
		let min = inputRangeSliderRef.data('slider-min');
		let max = inputRangeSliderRef.data('slider-max');
		let value = inputRangeSliderRef.data('slider-value');
		inputRangeSliderRef.slider({
			range: true,
			min: min,
			max: max,
			step: step,
			values: value,
			slide: function (event, ui) {
				changeSlider(inputRangeSliderRef, ui);
			}
		})
	}
}

function initSliders() {
	$('.slider-range').each(function () {
		inputSliderRange($(this));
	});
}

function selectStyler() {
	$(".group-f").controlgroup();
	$(".f-checkbox input").checkboxradio();
}

function sortFiltersStyler() {
	$("#sortmode, #sortitems").selectmenu()
		.on('selectmenuchange', function () {
			window.location = $(this).find(':selected').data('href');
		});
	$("#filter-city").selectmenu()
		.on('selectmenuchange', function () {
			ajaxReload($(this).find(':selected').data('href'));
		});
}

function initButtonsFilter() {
	let filterClose = document.querySelector('.filter-close');
	let filterBtn = document.querySelector('.btn-filter');
	let sidebar = document.querySelector('.a-sidebar');
	let body_lock = document.querySelector('body');
	let popup_bg_body = document.querySelector('.popup-bg-body');
	if (window.innerWidth < 993) {
		filterBtn.addEventListener('click', function () {
			this.classList.add('active');
			sidebar.classList.add("active");
			body_lock.classList.add("lock");
			popup_bg_body.classList.add("open");
		})
	} else {
		filterBtn.classList.remove("active");
		sidebar.classList.remove("active");
		body_lock.classList.remove("lock");
		popup_bg_body.classList.remove("open");
	}
	filterClose.addEventListener('click', function () {
		filterBtn.classList.remove("active");
		sidebar.classList.remove("active");
		body_lock.classList.remove("lock");
		popup_bg_body.classList.remove("open");
	})
}
setInterval(initButtonsFilter, 500);

//закрытые фильтра вне области
$(document).ready(function () {
	$(".btn-filter").on("click", function () {
		$(".catalog-page").mouseup(function (e) {// обрабатываем клик в любой точке
			if (jQuery(e.target).closest(".a-sidebar.active").length > 0) { // проверка , произошел ли клик вне элемента, который надо по этому клику скрыть
				return false; // клик по элементу игнорируем
			} else {
				$('.popup-bg-body').removeClass("open");
				$('.btn-filter').removeClass("active");
			}
			$('.lock').removeClass("lock");
			$('.a-sidebar.active').removeClass("active");
		});
	});
});

selectStyler();
initSliders();
initButtonsFilter();
sortFiltersStyler();

$(document).ready(function () {
	$(".fmoreButton").on("click", function () {
		$(this).next().css("display", "block");
		$(this).css("display", "none");
	});
});

var reloadTimeout;
function changeSlider(ref, slider) {
	if (reloadTimeout) {
		clearTimeout(reloadTimeout);
	}
	const name = ref.parent().data('optionname');
	const min = slider.values[0];
	const max = slider.values[1];
	ref.parent().find('.input-min').val(min);
	ref.parent().find('.input-max').val(max);
	reloadTimeout = setTimeout(function () {
		makeRangeUrl(name, min, max)
	}, 500);
}
$(document).on('change', '.input-min, .input-max', function () {
	if (reloadTimeout) {
		clearTimeout(reloadTimeout);
	}
	const name = $(this).parent().data('optionname');
	let min = $(this).data('min');
	let max = $(this).data('max');

	if ($(this).val()) {
		if (parseInt($(this).val()) < parseInt(min)) {
			$(this).val(min)
		}
		if (parseInt($(this).val()) > parseInt(max)) {
			$(this).val(max)
		}
	} else {
		$(this).val(0);
	}

	if ($(this).hasClass('input-min')) {
		min = $(this).val();
	} else {
		max = $(this).val();
	}

	reloadTimeout = setTimeout(function () {
		makeRangeUrl(name, min, max)
	}, 500);
});


//filter fastselect
// $('.singleSelect').fastselect();

//filter choosen
$(".chosen-select-deselect").chosen({
	no_results_text: "Не знайдено",
	allow_single_deselect: true
}); 