$.ajaxSetup({
    headers: {
        'x-csrf-token': yii.getCsrfToken()
    }
});

$(document).on('click', '.btn-favor', function () {
    let triggerButton = $(this);
    let carId = triggerButton.data('id');
    $.ajax({
        type: "POST",
        url: '/ajax/change-wishlist',
        data: {'car_id': carId},
        success: function (data) {
            if (data.success) {
                if (data.in_wishlist) {
                    triggerButton.addClass('active');
                } else {
                    if ($('*').is('.favorite')) {
                        triggerButton.parent().parent().parent().remove();
                    } else {
                        triggerButton.removeClass('active');
                    }
                }
            }
        },
    });
});

$('#form-home-catalog-filter').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: '/ajax/get-catalog-filter-link',
        data: $(this).serialize(),
        success: function (data) {
            if (data.success && data.url) {
                window.location = data.url;
            }
        },
    });
});

$('#form-help, #form-pre-sale, #form-test-drive, #form-installment, #form-leasing, #form-sell-car').submit(function (e) {
    e.preventDefault();
    let form = $(this);
    let hasError = formValidation(form);
    if (!hasError) {
        form.find('button[type=submit]').prop('disabled', true);
        $.ajax({
            type: 'post',
            url: '/ajax/send-order',
            data: form.serialize() + '&link=' + window.location.href,
            success: function (data) {
                if (data.success) {
                    form.find('button[type=submit]').prop('disabled', false);
                    form[0].reset();
                    $('.popup').removeClass('open');
                    $('#popup-success').addClass('open');

                    dataLayer.push({
                        'event': 'submit_' + form.attr('id').replaceAll('-', '_'),
                        'name': form.find('input[name=client_name]').val(),
                        'phone': form.find('input[name=client_phone]').val(),
                    });
                }
            }
        });
    }
    return false;
});

$('#form-register').on('beforeSubmit', function (e) {
    return !formValidation($(this));
});

if ($('*').is('.choice-help__seacrh-number-car')) {
    $(".choice-help__seacrh-number-car .btn-style-3").click(function () {
        let btn = $(this);
        let field = $('.choice-help__seacrh-number-car input[name=number]');
        btn.prop('disabled', true);
        field.removeClass('has-error');
        let number = field.val();
        if (!number) {
            btn.prop('disabled', false);
            field.addClass('has-error');
            return;
        }
        $.ajax({
            type: "POST",
            url: '/ajax/get-car-by-number',
            data: {'number': number},
            success: function (data) {
                if (data.success) {
                    let lang = 'ua';
                    if ($('html').attr('lang') === 'ru') {
                        lang = 'ru';
                    }
                    if (data.data.manufacturer != null) {
                        $('#car-name').text(data.data.manufacturer + ' ' + data.data.model + ' ' + data.data.year);
                        $('#car-engine').text(data.data.engineVolume);
                        $('#car-color').text(data.data.color[lang]);
                        $('#form-sell-car input[name=car_mark]').val(data.data.manufacturer);
                        $('#form-sell-car input[name=car_model]').val(data.data.model);
                        $('#form-sell-car input[name=car_year]').val(data.data.year);
                    } else {
                        $('#car-name').text('-');
                        $('#car-engine').text('-');
                        $('#car-color').text('-');
                    }
                    if (data.data.priceText !== undefined) {
                        $('#car-prices').text(data.data.priceText);
                        $('#form-sell-car input[name=price]').val('0$');
                    } else {
                        $('#car-prices').text(data.data.priceRange.min + ' - ' + data.data.priceRange.max + '$');
                        $('#form-sell-car input[name=price]').val(data.data.priceRange.min + ' - ' + data.data.priceRange.max + '$');
                    }
                    if (data.data.year > 0 && data.data.year < 2008) {
                        $('#btn-sell-car').addClass("hide");
                    }
                    $('.choice-help__sell-car-info').addClass("active-search");
                    $('.choice-help__seacrh-number-car').addClass("hide");
                } else {
                    field.addClass('has-error');
                }
                btn.prop('disabled', false);
            }
        });
    });
}

$(function () {
    $('input[name=client_phone], .phone-mask').mask("+38 (099) 999-99-99");
});

function miniProductCartPrice() {
    if ($('*').is('.installment-catalog')) {
        $('.installment-catalog').each(function () {
            let priceSell = $(this).data('price');
            let annual = getAnnual(priceSell, 0.15, 60) * usdRate;
            $(this).text(priceFormat(annual, 'грн'));
        });
    }
}
miniProductCartPrice();

const operatorCodes = [
    67, 96, 97, 98,
    50, 66, 95, 99, 95,
    63, 73, 93,
    68,
    91
];

const regNumbers = /\d/gi;
const regNotNumbers = /\D/gi;
const regLatin = /[a-zA-Z]/gi;
const regСyrillic = /[а-яА-Я]/gi;
const regNotCyrText = /[^$а-яіїєґ0-9_\s]/gi;

function formValidation(form) {
    form.find('.has-error').removeClass('has-error');
    let hasError = false;
    form.find("input:not(.no-required)").each(function () {
        let inputName = $(this).attr('name');
        if ((inputName == 'client_name' || inputName == 'client_lastname')) {
            // if length < 2
            if ($(this).val().trim().length < 2) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
            // if numbers
            if (/\d/gi.test($(this).val().replace(regNotNumbers, ''))) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
            // not kirillic
            if (regLatin.test($(this).val())) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
            // if latin
            if (regNotCyrText.test($(this).val())) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
        }
        if (inputName == 'client_phone') {
            if ($(this).val().length < 1) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
            // have "_"
            if ($(this).val().indexOf('_') !== -1) {
                $(this).parent().addClass('has-error');
                hasError = true;
            };
            // operator code
            let code = parseInt($(this).val().slice(5, 8));
            if (!operatorCodes.includes(code)) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
        }
        if (inputName == 'client_email' && $(this).prop('required')  || inputName == "client_email" && $(this).val().length) {
            if ($(this).val().length < 5) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
            let emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            if(!emailPattern.test($(this).val())) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
        }
        if (inputName == 'date' || inputName == 'time') {
            if ($(this).val().trim().length < 1) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
        }
        if (inputName == 'agreement') {
            if (!$(this).prop('checked')) {
                $(this).parent().addClass('has-error');
                hasError = true;
            }
        }
        if ($(this).attr('id') == 'checkbox-agree') {
            if (!$(this).prop('checked')) {
                $(this).parent().parent().addClass('has-error');
                hasError = true;
            }
        }
    });
    return hasError;
}

function changeLanguage(language, url) {
    $.ajax({
        type: "POST",
        url: '/ajax/change-language',
        data: {'language': language, 'url': url},
        success: function (data) {
            if (data.success) {
                window.location.href = data.url
            } else {
                window.location.reload();
            }
        },
    });
}