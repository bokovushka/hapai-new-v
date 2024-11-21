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
        let price = $('#leasing-car-price').val();
        let selfMoneyPercent = $('#leasing-self-money').val() / price;
        leasingAnnual(price, selfMoneyPercent, ui.value);
    }
});

$('#leasing-car-price').change(function () {
    let price = $(this).val();
    let min = 4000;
    let max = 40000;
    if (price < min) {
        $(this).val(min);
        price = min;
        $('#leasing-self-money').val(price * 0.15);
    }
    if (price > max) {
        $(this).val(max);
        price = max;
        $('#leasing-self-money').val(price * 0.15);
    }
    let monthsCount = $('#leasing-month-count').val();
    let selfMoneyPercent = $('#leasing-self-money').val() / price;
    leasingAnnual(price, selfMoneyPercent, monthsCount);
});

$('#leasing-self-money').change(function () {
    let selfMoney = $(this).val();
    let price = $('#leasing-car-price').val();
    let min = price * 0.15;
    let max = price * 0.8;
    if (selfMoney < min) {
        $(this).val(min);
        selfMoney = min;
    }
    if (selfMoney > max) {
        $(this).val(max);
        selfMoney = max;
    }
    let monthsCount = $('#leasing-month-count').val();
    let selfMoneyPercent = selfMoney / price;
    leasingAnnual(price, selfMoneyPercent, monthsCount);
});

function leasingAnnual(price, selfMoneyPercent, monthsCount) {
    let annual = getAnnual(price, selfMoneyPercent, monthsCount);
    $('#leasing-total').text(priceFormat(annual));
    $('#leasing-total-uah').text(priceFormat(annual * usdRate, 'грн'));
    $('#form-leasing input[name=price]').val(priceFormat(annual) + '/мес');
}

$(document).ready(function () {
    if ($('*').is('.leasing-calc')) {
        leasingAnnual(10000, 0.15, 60);
    }
});