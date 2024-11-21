$("#selection-car__slider-month").slider({
	range: "min",
	step: 12,
	value: 60,
	min: 12,
	max: 60,
	slide: function (event, ui) {
		$('.v-p').remove();
		$('#selection-car__slider-result .heading').append('<span class="v-p">' + ui.value + '</span>');
		$('#leasing-month-count').val(ui.value);
		let monthPay = $('#leasing-month-pay').val();
		let selfMoney = $('#leasing-self-money').val();
		leasingAnnual(monthPay, selfMoney, ui.value);
	}
});

$('#leasing-month-pay').change(function () {
	let monthPay = Number($(this).val());
	if (monthPay < 0) {
		$(this).val(0);
		monthPay = 0;
	}
	let monthsCount = $('#leasing-month-count').val();
	let selfMoney = $('#leasing-self-money').val();
	leasingAnnual(monthPay, selfMoney, monthsCount);
});

$('#leasing-self-money').change(function () {
	let selfMoney = Number($(this).val());
	if (selfMoney < 0) {
		$(this).val(0);
		selfMoney = 0;
	}
	let monthsCount = $('#leasing-month-count').val();
	let monthPay = $('#leasing-month-pay').val();
	leasingAnnual(monthPay, selfMoney, monthsCount);
});

function leasingAnnual(monthPay, selfMoney, monthsCount) {
	let price = Number(selfMoney) + Number(monthPay * monthsCount);
	$('#leasing-total').text(priceFormat(price));
	$('#leasing-total-uah').text(priceFormat(price * usdRate, 'грн'));
	$('#catalog-filter-link').attr('href', '/catalog?price_to=' + price);
}

$(document).ready(function () {
	if ($('*').is('.home-leasing')) {
		leasingAnnual(1500, 1500, 60);
	}

	$("#car-type, #car-mark, #car-model, #car-year, #city-select").selectmenu({
		change: function (event, ui) {
			const field = $(this).attr('id');
			const nextField = $(this).data('next-field');
			const value = $(this).val();
			if (nextField !== undefined) {
				setValuesByType(field, value, nextField)
			}
		}
	});
});

function setValuesByType(field, id, nextField) {
	$.ajax({
		type: "POST",
		url: '/ajax/get-home-filters',
		data: {
			'nextField': nextField,
			'id': id
		},
		success: function (data) {
			if (data.success) {
				$('#' + nextField).html(data.html);
				$("#car-type, #car-mark, #car-model, #car-year, #city-select").selectmenu('refresh');
			}
		},
	});
}

//new js update
$("#selection-leasing__month").slider({
	range: "min",
	step: 1,
	value: 24,
	min: 1,
	max: 60,
	slide: function (event, ui) {
		$('#selection-leasing__month-result .v-p').remove();
		$('#selection-leasing__month-result').append('<div class="v-p">' + ui.value + ' місяців' + '</div>');
	}
});
