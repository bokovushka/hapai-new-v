//popup btn-info
$(".ic-top__rb .btn-info").click(function () {
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

$('.trigger-auto-bid').click(function () {
	$('#autobidon').click();
	$("html, body").stop().animate({scrollTop: $('.auction-card').offset().top}, 800);
});

$('#pre-sale-price-uah').text(priceFormat(Number($('#pre-sale-price').data('price')) * usdRate, ' грн'));

function productInstallment(price, prepaymentPercentage, monthsCount) {
	let annual = getAnnual(price, prepaymentPercentage, monthsCount);
	let annualUAH = annual * usdRate;
	$('.product-installment-usd').text(priceFormat(annual));
	$('.product-installment-uah').text(priceFormat(annualUAH, ' грн.'));
	$('#form-installment input[name=price]').val(priceFormat(annual) + '/мес');
}

$('#installment-self-money').change(function () {
	let selfMoney = $(this).val();
	let min = priceSell * 0.15;
	let max = priceSell * 0.8;
	if (selfMoney < min) {
		$(this).val(min);
		selfMoney = min;
	}
	if (selfMoney > max) {
		$(this).val(max);
		selfMoney = max;
	}
	let monthsCount = $('#installment-month-count').val();
	let selfMoneyPercent = selfMoney / priceSell;
	productInstallment(priceSell, selfMoneyPercent, monthsCount);
});

$("#selection-car__slider-month").slider({
	range: "min",
	step: 12,
	value: 60,
	min: 12,
	max: 60,
	slide: function (event, ui) {
		$('.v-p').remove();
		$('#selection-car__slider-result .heading').append('<span class="v-p">' + ui.value + '</span>');
		$('#installment-month-count').val(ui.value);
		let selfMoneyPercent = $('#installment-self-money').val() / priceSell;
		productInstallment(priceSell, selfMoneyPercent, ui.value);
	}
});

$(document).ready(function () {
	if ($('*').is('.installment-payment')) {
		$('#installment-self-money').val(priceSell * 0.15);
		productInstallment(priceSell, 0.15, 60);
	}
});