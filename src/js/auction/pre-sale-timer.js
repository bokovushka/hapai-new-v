document.addEventListener('DOMContentLoaded', function () {
	const lang = $('html').attr('lang');
	// конечная дата
	const deadline = new Date(Date.parse(window.dateFrom));
	// id таймера
	let timerId = null;
	// склонение числительных
	function declensionNum(num, words) {
		return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
	}
	// вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
	function countdownTimer() {
		const diff = deadline - new Date();
		if (diff <= 0) {
			clearInterval(timerId);
			$('#active-auction').click();
			window.location.reload();
		}
		const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
		const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
		$days.textContent = days < 10 ? '0' + days : days;
		$hours.textContent = hours < 10 ? '0' + hours : hours;
		$minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
		$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
		$days.dataset.title = declensionNum(days, lang === 'ru' ? ['день', 'дня', 'дней'] : ['день', 'дні', 'днів']);
		$hours.dataset.title = declensionNum(hours, lang === 'ru' ? ['час', 'часа', 'часов'] : ['годин', 'годин', 'годин']);
		$minutes.dataset.title = declensionNum(minutes, lang === 'ru' ? ['минута', 'минуты', 'минут'] : ['хвилина', 'хвилини', 'хвилин']);
		$seconds.dataset.title = declensionNum(seconds, lang === 'ru' ? ['секунда', 'секунды', 'секунд'] : ['секунда', 'секунди', 'секунд']);
	}
	// получаем элементы, содержащие компоненты даты
	const $days = document.querySelector('.timer__days');
	const $hours = document.querySelector('.timer__hours');
	const $minutes = document.querySelector('.timer__minutes');
	const $seconds = document.querySelector('.timer__seconds');
	// вызываем функцию countdownTimer
	countdownTimer();
	// вызываем функцию countdownTimer каждую секунду
	timerId = setInterval(countdownTimer, 1000);
});