// табы

$('.item-tab-content .tab-card').hide();
$('.item-tabs .item-tab').click(function () {
	$('.item-tabs .item-tab').removeClass("active");
	$(this).addClass("active");
	$('.item-tab-content .tab-card').hide();
	$($('.item-tab-content .tab-card')[$(this).index()]).show();
}).eq(1).trigger('click');

// табы внутри табов
$('.tab-view li').click(function () {
	$('.tab-view li').removeClass("active");
	$(this).addClass("active");
	$('.tab-view__content .tab-view__info').hide();
	$($('.item-tab-content .tab-view__info')[$(this).index()]).show();
}).eq(0).trigger('click');

// подсказка

$(".feature-col2 i").on({
	mouseenter: function () {
		$(this).parent().addClass("help-tip");
	},
	mouseleave: function () {
		$(this).parent().removeClass("help-tip");
	},
});

//

$(document).ready(function () {
	var circleInfo = document.getElementsByClassName("circle-info");
	var circle_active = document.getElementsByClassName('circle-active');
	for (i = 0; circleInfo.length > i; i++) {
		circleInfo[i].onclick = function () {
			var currentActive = circle_active[0];
			if (currentActive)
				currentActive.classList.remove("circle-active");

			if (currentActive !== this)
				this.classList.add("circle-active");
		};
	}
});

// Автоставка

$("#autobid").click(function () {
	$('.auction-card').addClass("autobid-off");
});
$("#autobid-off").click(function () {
	$('.auction-card').addClass("autobid-off");
	$('.auction-card').removeClass("autobid-on");
});
$("#showbtn1 .exit-ac").click(function () {
	$('.auction-card').removeClass("autobid-off");
});
$("#showbtn2 .exit-ac").click(function () {
	$('.auction-card').removeClass("autobid-change").removeClass('autobid-off');
	$('.auction-card').addClass('autobid-on');
});
$("#autobidon").click(function () {
	$('.auction-card').addClass("autobid-change");
});
$("#autobid-change").click(function () {
	$('.auction-card').addClass("autobid-change");
	$('.auction-card').addClass("autobid-off");
	$('.auction-card').removeClass("autobid-on");
});
$("#autobidsave").click(function () {
	$('.auction-card').addClass("autobid-on");
	$('.auction-card').removeClass("autobid-change");
	$('.auction-card').removeClass("autobid-off");
});

// прогресс бар
function setAuctionTimeProgress(value) {
	$("#auction-bar").progressbar({
		value: value
	});
	if (value >= 70) {
		$("#auction-bar").addClass('percent70u').removeClass('percent30u').removeClass('percent30d');
	} else if (value >= 30) {
		$("#auction-bar").addClass('percent30u').removeClass('percent70u').removeClass('percent30d');
	} else {
		$("#auction-bar").addClass('percent30d').removeClass('percent70u').removeClass('percent30u');
	}
}

// ставка аукцион

// $( "#price-spinner" ).spinner();

function setPriceValuesSpinner(val, valUAH) {
	$.widget("ui.spinner", $.ui.spinner, {
		_buttonHtml: function () {
			return '<span class="input-group-prepend"><a class="btn ui-spinner-button ui-spinner-down icon-minus icon-u_minus" type="button"></a></span><div class="spinner-card"><span class="spinner-show"><span class="price-value">' + val + '</span> $</span><span class="spinner-show2"><span class="sub-price-value">' + valUAH + '</span> грн.</span></div>'
				+ '<span class="input-group-append"><a class="btn ui-spinner-button ui-spinner-up icon-plus icon-fi_plus" type="button"></a></span>';
		},
		_uiSpinnerHtml: function () {
			return '<div class="ui-spinner input-group"></div>';
		}
	});

	$('#price-spinner').val(val);
	$('#price-spinner').spinner({
		create: function () {
			$(this).next().insertBefore(this)
		},
		value: val,
		culture: "en-US",
		min: val,
		step: 50,
		start: 0,
		numberFormat: "C",
	});
}

// Fancybox gallery галерея авто

Fancybox.bind('[data-fancybox="gallery"]', {
	animated: false,
	showClass: false,
	hideClass: false,

	click: false,

	dragToClose: false,

	Image: {
		zoom: false,
	},

	Toolbar: {
		display: [{
			id: "counter",
			position: "center"
		}, "close"],
	},
});

//popup btn-info

$(".auction-card .btn-info").click(function () {
	$('.popup-bg-body').addClass("open");
});
$(".close-popup").click(function () {
	$('.popup-bg-body').removeClass("open");
});
$(".popup-bg-body").click(function () {
	$(this).removeClass("open");
	$('.popup').removeClass("open");
	$('.lock').removeClass("lock");
});