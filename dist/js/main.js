// меню

$(document).ready(function () {
	let body_lock = document.querySelector('body');
	let menuBtn = document.querySelector('.menu-btn');
	let menu = document.querySelector('.menu');
	let language = document.querySelector('.language');
	let header_active = document.querySelector('.header-menu');

	menuBtn.addEventListener('click', function () {
		menuBtn.classList.toggle('active');
		menu.classList.toggle('active');
		language.classList.toggle('active');
		header_active.classList.toggle('active');
		body_lock.classList.toggle('lock-menu-m');
	})
});

// height = max height
// Оголошення функції setEqualHeight
function setEqualHeight(columns) {
	var tallestcolumn = 0;
	columns.each(function () {
		$(this).css('height', 'auto'); // Спочатку встановлюємо автоматичну висоту
		var currentHeight = $(this).height();
		if (currentHeight > tallestcolumn) {
			tallestcolumn = currentHeight;
		}
	});
	columns.height(tallestcolumn);
}

window.addEventListener('resize', (e) => {
	cardResize();
});

window.addEventListener('load', function () {
	setTimeout(() => {
		cardResize();
	}, 500);
}, false);

function cardResize() {
	$('.a-main-tile .loop-cover.xa .item-loop')
		.height($('.a-main-tile .loop-cover.xa')
			.prev().find('.item-loop').height());
}

function cardResizeList() {
	$('.a-main.active .loop-cover.xa .item-loop').css('height', 'auto');
}

$(document).ready(function () {
	setEqualHeight($(".illustration-descrp__item .img-wrap__title"));
	setEqualHeight($(".item-loop__txtblock .heading"));
	setEqualHeight($(".favorite__main .item-loop"));
	setEqualHeight($(".hapai-friday .collection-results .collection-results__wrap .collection-results__item .img-wrap__title"));


	setInterval(function () {
		$('.a-main-tile .loop-cover.xa .item-loop').height($('.a-main-tile .loop-cover.xa').prev().find('.item-loop').height());
	}, 300);

	$(window).resize(function () {
		setEqualHeight($(".illustration-descrp__item .img-wrap__title"));
		setEqualHeight($(".item-loop__txtblock .heading"));
		setEqualHeight($(".favorite__main .item-loop"));
	});

	$(".filter-sort-box .type-list-buttons .type-tile").click(function () {
		$(".item-loop__txtblock .heading").removeAttr("style");
		setInterval(function () {
			setEqualHeight($(".item-loop__txtblock .heading"));
		}, 100);
	});

});

//favorite

$(document).on('click', '.btn-favor', function () {
	if ($(this).attr('data-status') === 'favorite') {
		$(this).removeAttr('data-status', 'favorite')
	} else {
		$(this).attr('data-status', 'favorite')
	}
});

// $(document).on('click', 'a[href^="#"]', function (e) {
// 	var anchor = $(this);
// 	$("html, body")
// 		.stop()>>
// 		.animate(
// 			{
// 				scrollTop: $(anchor.attr("href")).offset().top - 20,
// 			},
// 			800
// 		);
// 	e.preventDefault();
// });

//popup-authorization

$(function () {
	$(".checkbox input").checkboxradio();
});
$("#popup-authorization .login .txt-link").click(function () {
	$(".login").addClass("hide");
	$(".register").removeClass("hide");

});
$("#popup-authorization .register .txt-link").click(function () {
	$(".register").addClass("hide");
	$(".login").removeClass("hide");
});

//faq-item
$(function () {
	$("#accordion").accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});
});

// MAIN SEARCH

// $(function () {
// 	$.widget("custom.catcomplete", $.ui.autocomplete, {
// 		_create: function () {
// 			this._super();
// 			this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
// 		},
// 		_renderMenu: function (ul, items) {
// 			var that = this,
// 				currentCategory = "";
// 			$.each(items, function (index, item) {
// 				var li;
// 				if (item.category != currentCategory) {
// 					ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
// 					currentCategory = item.category;
// 				}
// 				li = that._renderItemData(ul, item);
// 				if (item.category) {
// 					li.attr("aria-label", item.category + " : " + item.label);
// 				}
// 			});
// 		}
// 	});
// 	var data = [
// 		{ label: "Audi A3", category: "" },
// 		{ label: "Audi A4", category: "" },
// 		{ label: "Audi A5", category: "" },
// 		{ label: "Audi A7", category: "" },
// 		{ label: "Продати Audi", category: "Послуги" },
// 		{ label: "Купити Audi", category: "Послуги" },
// 		{ label: "Audi захоплює дух часу цим автомобілем: перший Audi 80 був представлений 50 років тому", category: "Блог" },
// 		{ label: "Audi додає Apple Music до широкого спектру своїх моделей", category: "Блог" }
// 	];
//
// 	$("#search").catcomplete({
// 		delay: 0,
// 		source: data
// 	});
// });


$(document).ready(function () {
	$("#datepicker").datepicker({
		// changeMonth: true,
		// changeYear: true,
		showOn: "button",
		showOtherMonths: true,
		selectOtherMonths: true
	});

	$(".date-link").click(function () {
		$("#datepicker").datepicker("show");
	});
});

//Back to Top Button
$(document).ready(function () {
	var btn = $("#button_top");

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			btn.addClass("show");
		} else {
			btn.removeClass("show");
		}
	});

	btn.on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({
			scrollTop: 0
		}, "300");
	});
});

//choose-reality btn show content
$(document).ready(function () {
	var btn = $(".choose-reality .btn-style-2");
	btn.on("click", function (e) {
		e.preventDefault();
		$(this).next(".choose-reality__info").addClass("show");
		$(this).addClass('hide');
	});
});

//checkHeight partners page
// $(function checkHeight() {

// 	if (window.innerWidth > 991) {
// 		var height = $('.become-partner__form').height();
// 		$('.become-partner .img-wrap').height(height);
// 	}
// 	setTimeout(checkHeight, 500);
// });

//tabs / offices page / purchase-goods page
$(document).ready(function () {
	const tabs = document.querySelectorAll('.offices .tab');
	const tabContents = document.querySelectorAll('.offices .tab-content-item');

	tabs.forEach(tab => {
		tab.addEventListener('click', function () {
			tabs.forEach(tab => tab.classList.remove('active'));
			tabContents.forEach(content => content.classList.remove('active'));
			this.classList.add('active');
			document.getElementById(this.dataset.tabContent).classList.add('active');
		});
	});
});

//callback form
$("#form-popup-callback .btn-style-4").click(function () {
	$('.form-popup-callback__result').addClass("show");
	$('.form-popup-callback__content').addClass("hide");
});

//cookies popup
$(document).ready(function () {
	setTimeout(function () {
		$('#btn-cookies').click();
	}, 1000);
});

//text lenght
$(function () {
	$('#txt-feedback').keyup(function () {
		var txtlen = $(this).val().length;
		$('#txt-feedback-count').text(txtlen);

	});
});

//add form field 
$(document).ready(function () {
	var counter = 0;
	$("#form-become-partner .field-plus").click(function (e) {
		counter++;
		if (counter > 3) {
			return false;
		} else {
			$(".more-user-link").append('<div class="user-txt f-user-link"><div class="input-wrap"><input type="text" name="client_link" placeholder="Посилання з авто.ріа"></div><p class="help-block help-block-error">Обов&#39;язкове поле.</p ></div >');
		}
	});
});

//popup-automatic-selection
$("#automatic-car-brand").selectmenu();
$("#automatic-car-model").selectmenu();

$(function () {
	$("#slider-range").slider({
		range: true,
		min: 10000,
		max: 45000,
		values: [10000, 30000],
		slide: function (event, ui) {
			$("#amount").val(ui.values[0] + " - " + ui.values[1]);
		}
	});
	$("#amount").val($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
});

$(function () {
	$("#slider-range2").slider({
		range: true,
		min: 80000,
		max: 150000,
		values: [80000, 100000],
		slide: function (event, ui) {
			$("#amount2").val(ui.values[0] + " - " + ui.values[1]);
		}
	});
	$("#amount2").val($("#slider-range2").slider("values", 0) + " - " + $("#slider-range2").slider("values", 1));
});

$("#popup-automatic-selection .btn-style-4").click(function () {
	$('#popup-automatic-selection .form-popup-callback__result').addClass("show");
	$('#popup-automatic-selection .user-info').addClass("hide");
});

//purchase goods page / select
$("#car-year-production").selectmenu();
$("#car-basket").selectmenu();
$("#car-gearbox").selectmenu();
$("#car-fuel").selectmenu();
$("#car-engine-capacity").selectmenu();

//purchase goods page / button click
$("#form-request-purchase-goods .btn-style-3").click(function () {
	$('.request-purchase-goods .choice-car__content').addClass("hide");
	$('.request-purchase-goods .request-purchase-goods__thank').addClass("show");
	$('.about-car').addClass("hide");
	$('.choice-car__main').addClass("choice-car__thank");
});

//purchase goods page / button click
$(".request-purchase-goods-result .btn-style-2").click(function () {
	$('.request-purchase-goods-result .result-item-field').toggle("show");
	if ($(this).text() == "Редагувати дані")
		$(this).text("Готово")
	else
		$(this).text("Редагувати дані");
});

$(function () {
	$("#slider-range-rpgr1").addClass("line-slider").slider({
		range: "min",
		step: 1,
		value: 10000,
		min: 10000,
		max: 45000,
		slide: function (event, ui) {
			$("#rpgr1").val(ui.value);
		}
	});
	$("#rpgr1").val($("#slider-range-rpgr1").slider("values", 0));
});

$(function () {
	$("#slider-range-rpgr2").addClass("line-slider").slider({
		range: "min",
		step: 1,
		value: 80000,
		min: 80000,
		max: 150000,
		slide: function (event, ui) {
			$("#rpgr2").val(ui.value);
		}
	});
	$("#rpgr2").val($("#slider-range-rpgr2").slider("values", 0));
});
$(function () {
	$("#slider-range-rpgr3").addClass("line-slider").slider({
		range: "min",
		step: 12,
		value: 12,
		min: 12,
		max: 80,
		slide: function (event, ui) {
			$("#rpgr3").val(ui.value);
		}
	});
	$("#rpgr3").val($("#slider-range-rpgr3").slider("values", 0));
});


//home page / click more brand
$(function () {
	let max = 12;

	$('.ch-car-brand').each(function () {
		let items = $(this).find('ch-car-brand__item'),
			len = items.length;
		if (len > max) {
			items = items.slice(max, len);
			items.wrapAll('<div class="hide"></div>');
		}
	}).on('click', '.btn-style-2', function () {
		$(this).closest('.ch-car-brand').find('.hide > .ch-car-brand__item').unwrap();
		$(this).remove();
	});
});

//see more
$(document).ready(function () {
	var showChar = 50;
	var showCharProduct = 600;
	var ellipsestext = "...";
	var moretext = "Читати далі";
	var lesstext = "Згорнути";
	$(".expandable").each(function () {
		var content = $(this).html();
		if (content.length > showChar) {
			var show_content = content.substr(0, showChar);
			var hide_content = content.substr(showChar, content.length - showChar);
			var html =
				show_content +
				'<span class="moreelipses">' +
				ellipsestext +
				'</span><span class="remaining-content"><span class="continued-content">' +
				hide_content +
				'<span>&nbsp;</span></span><div class="morelink">' +
				moretext +
				"</div></span>";
			$(this).html(html);
		}
	});

	$(".ic-excerpt .expandable-product").each(function () {
		var content = $(this).html();
		if (content.length > showCharProduct) {
			var show_content = content.substr(0, showCharProduct);
			var hide_content = content.substr(showCharProduct, content.length - showCharProduct);
			var html =
				show_content +
				'<span class="moreelipses">' +
				ellipsestext +
				'</span><span class="remaining-content"><span class="continued-content">' +
				hide_content +
				'<span>&nbsp;</span></span><div class="morelink">' +
				moretext +
				"</div></span>";
			$(this).html(html);
		}
	});


	$(".morelink").click(function () {
		if ($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html(moretext);
		} else {
			$(this).addClass("less");
			$(this).html(lesstext);
		}
		$(this).parent().prev().toggle(300);
		$(this).prev().toggle(300);
		return false;
	});
});

// height product
// $(function checkHeight() {
// 	if (window.innerWidth > 992 && window.innerWidth < 1440) {
// 		var height = $('.ic-info__left__wrap').height();
// 		$('.ic-info__left').height(height - 395);
// 	}
// 	else {
// 		$('.ic-info__left').height("100%");
// 	}
// 	setTimeout(checkHeight, 500);
// });


//filter
$(document).ready(function () {
	$(".filter-item .filter-title").on("click", function () {
		$(this).next(".filter-list").toggleClass("show");
		$(this).toggleClass("active");
	});
});

//table scroll
$("table").wrapAll($("<div style='overflow: scroll;'></div>"));

//show more //product page //more button
$(function () {
	$('.tab-equ').each(function () {
		let max = 6;
		let items = $(this).find('.equ-col'),
			len = items.length;
		if (len > max) {
			items = items.slice(max, len);
			items.wrapAll('<div class="hide"></div>');
			$(this).append('<div class="show-more-button"><button type="button" class="btn">Показати ще</button></div>');
		}

	})
}).on('click', '.tab-equ .btn', function () {
	$(this).closest('.tab-equ').toggleClass("show-more").find('.hide > .equ-col').unwrap();
	if ($(".tab-equ").hasClass("show-more")) {
		$(this).text("Сховати");
	} else {
		$(this).text("Показати ще");
		let max = 6;
		$('.tab-equ').each(function () {
			let items = $(this).find('.equ-col'),
				len = items.length;
			if (len > max) {
				items = items.slice(max, len);
				items.wrapAll('<div class="hide"></div>');
			}
		})
	}
});

//tabs / all-information page
$(document).ready(function () {
	const tabs = document.querySelectorAll('.all-information .tab');
	const tabContents = document.querySelectorAll('.all-information .tab-content-item');

	tabs.forEach(tab => {
		tab.addEventListener('click', function () {
			tabs.forEach(tab => tab.classList.remove('active'));
			tabContents.forEach(content => content.classList.remove('active'));
			this.classList.add('active');
			document.getElementById(this.dataset.tabContent).classList.add('active');
		});
	});
});

//menu phone modal click
$(".header-menu .nav-menu__item.phone").click(function () {
	$("body").removeClass("lock-menu-m");
	$(".menu-btn").removeClass("active");
	$(".menu").removeClass("active");
	$(".language").removeClass("active");
	$(".header-menu").removeClass("active");
});

//? catalog btn-type // active class
setInterval(function () {
	if (window.innerWidth >= 1280) {
		$(".filter-sort-box .type-list-buttons .btn-type").click(function () {
			$('.filter-sort-box .type-list-buttons .btn-type').removeClass('active');
			$(this).addClass('active');
			if ($(this).hasClass("type-tile active")) {
				$('.auction-wrapper .a-main').removeClass('active').addClass('a-main-tile');
			} else {
				$('.auction-wrapper .a-main').removeClass('a-main-tile').addClass('active');
			}
			setTimeout(() => {
				cardResizeList();
			}, 500);
		});
	}
}, 100);


$(".form-buyout-car-select").chosen({
	no_results_text: "Не знайдено",
	allow_single_deselect: true
});

$("#form-buyout-car-year").on('input', function () {
	$("#form-buyout-car").addClass('activated')
	$("#form-buyout-car .tip").fadeIn();
});


//? sell-car (avtovikup) input block 
$(document).ready(function () {
	const searchInput = document.getElementById("choice-help__seacrh-number-car");
	const searchContainer = document.querySelector(".choice-help__seacrh-number-car--wrap");

	// searchInput.addEventListener('input', function (e) {
	// 	let val = e.target.value.trim();
	// 	if (val.length) {
	// 		searchContainer.classList.add("active");
	// 	} else {
	// 		searchContainer.classList.remove("active");
	// 	}
	// });
});

//block active-search sell-car page
$(".choice-help__seacrh-number-car .btn-style-3").click(function () {
	$('.choice-help__sell-car-info').addClass("active-search");
	$('.choice-help__seacrh-number-car').addClass("hide");
	$('.choice-car .choice-help__seacrh-number-car--wrap .tip').addClass("hide");
});

//video auto-ria.html
const players = Plyr.setup('.js-player',
	{
		iconUrl: 'img/svg/plyr.svg',
	}
);


// radio button form field
$(document).ready(function () {
	// Для кожної форми
	$('.form-check-auto-ria').each(function () {
		var $form = $(this);

		// При зміні стану checkbox в межах форми
		$form.find('input[type=radio]').change(function () {
			// Якщо checkbox з класом "ui-checkboxradio-checked" вибраний в межах цієї форми
			if ($(this).closest('.checkbox-check-autoria').find('label').hasClass('ui-checkboxradio-checked')) {
				// Додати клас "active" до відповідного елементу з класом "field-check-autoria" в межах цієї форми
				$form.find('.field-check-autoria').addClass('active');
			} else {
				// В іншому випадку, видалити клас "active" з відповідного елементу в межах цієї форми
				$form.find('.field-check-autoria').removeClass('active');
			}
		});
	});
});

if (document.querySelector('.sales-methods--item') && document.querySelector('.btn-more')) {
	document.addEventListener("DOMContentLoaded", function () {
		const buttons = document.querySelectorAll(".sales-methods .btn-more");

		buttons.forEach(button => {
			button.addEventListener("click", function () {
				const parentItem = this.closest(".sales-methods--item");
				const isActive = parentItem.classList.contains("active");

				// Toggle active class for the parent item
				if (isActive) {
					parentItem.classList.remove("active");
					this.innerText = "Розгорнути";
				} else {
					// Remove active class from other items
					const activeItem = document.querySelector(".sales-methods--item.active");
					if (activeItem) {
						activeItem.classList.remove("active");
						activeItem.querySelector(".btn-more").innerText = "Розгорнути";
					}

					parentItem.classList.add("active");
					this.innerText = "Згорнути";
				}
			});
		});
	});
}