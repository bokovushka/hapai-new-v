function getAnnual (carPrice, prepaymentPercentage, monthsCount) {
    carPrice = carPrice * usdRate;
    const monthsInYear = 12;
    const prepaymentAmount = Math.round(carPrice * prepaymentPercentage);
    const dealAmount = carPrice - prepaymentAmount;
    const years = Math.floor(monthsCount / monthsInYear);
    const kaskoMultiplier = monthsCount >= monthsInYear * 3 && false ? 3 : years;
    const kaskoTotalPrice = prepaymentPercentage < 0.35 || true ? kaskoMultiplier * carPrice * productCalc.KaskoPercentage : 0;
    const kaskoPaymentAmount = kaskoTotalPrice / (kaskoMultiplier * 4);
    //Настройки. Значения можно корректировать
    const osagoPaymentAmount = productCalc.OsagoPaymentAmount;//Размер платежа по ОСАГО
    const tax = productCalc.Tax;//Налог НДС (0.20 = 20%)
    const registrationPrice = productCalc.RegistrationPrice * (1 + tax);//Стоимость регистрации + налог
    const deregistrationPrice = productCalc.DeregistrationPrice;//Стоимость снятия с регистрации
    const managerBonusAmount = dealAmount * productCalc.ManagerBonusPercentage;//Бонус менеджера (сумма сделки * процент менеджера)
    const trackerPrice = productCalc.TrackerPrice;//Стоимость установки маячка
    const otherExpences = productCalc.OtherExpences;//Другие разовые расходы
    const dealerBonusAmount = carPrice * productCalc.DealerBonusPercentage;//Бонус дилера (сумма сделки * процент дилера)
    const otherAnnualAmount = productCalc.OtherAnnualAmount;//Другие ежемесячные расходы
    const officialJobAnnualAdditionalAmount = productCalc.OfficialJobAnnualAdditionalAmount;//Доп ежемесячный платеж для официально устроенных
    const irr = productCalc.Irr;
    //Конец настроек
    const osagoTotalPrice = osagoPaymentAmount * years;
    const monthsIrr = irr / monthsInYear;
    const otherTotalPrice = otherAnnualAmount * years;

    const singlePaymentAmount = dealAmount + trackerPrice + registrationPrice - managerBonusAmount + dealerBonusAmount + otherExpences + kaskoPaymentAmount + osagoPaymentAmount + deregistrationPrice;
    var _single = Math.pow(1 + monthsIrr, monthsCount);
    var _months = 1;
    var _quarters = 0;
    var _years = 0;
    for (var i = 1; i < monthsCount; i++) {
        var isQuarterMonth = i % 3 == 1;
        var isYear = i % 12 == 1;
        var _irr = Math.pow(1 + monthsIrr, i);
        if (isQuarterMonth)
            _quarters += _irr;
        if (isYear)
            _years += _irr;
        _months += _irr;
    }
    let annual = Math.round((singlePaymentAmount * _single + officialJobAnnualAdditionalAmount * _months + kaskoPaymentAmount * _quarters + (osagoPaymentAmount + otherAnnualAmount) * _years) / _months);
    return annual / usdRate;
}

function priceFormat(price, code = '$') {
    if (isNaN(price) || price === '') return '';
    return parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + code;
}