document.addEventListener("DOMContentLoaded", function () {
	const sliders = document.querySelectorAll('.before-after-slider');

	sliders.forEach((slider) => {
		const before = slider.querySelector('.before-image');
		const beforeImage = before.querySelector('img');
		const resizer = slider.querySelector('.resizer');
		let active = false;

		// Налаштування ширини для перекриття зображення
		function adjustWidth() {
			let width = slider.offsetWidth;
			beforeImage.style.width = width + 'px';
		}

		adjustWidth(); // Початкове налаштування
		window.addEventListener('resize', adjustWidth); // Налаштування ширини при зміні розміру вікна

		resizer.addEventListener('mousedown', () => {
			active = true;
			resizer.classList.add('resize');
		});

		document.body.addEventListener('mouseup', () => {
			active = false;
			resizer.classList.remove('resize');
		});

		document.body.addEventListener('mouseleave', () => {
			active = false;
			resizer.classList.remove('resize');
		});

		document.body.addEventListener('mousemove', (e) => {
			if (!active) return;
			let x = e.pageX;
			x -= slider.getBoundingClientRect().left;
			slideIt(x);
			pauseEvent(e);
		});

		resizer.addEventListener('touchstart', () => {
			active = true;
			resizer.classList.add('resize');
		});

		document.body.addEventListener('touchend', () => {
			active = false;
			resizer.classList.remove('resize');
		});

		document.body.addEventListener('touchcancel', () => {
			active = false;
			resizer.classList.remove('resize');
		});

		// Обчислення для перетягування на сенсорних пристроях
		document.body.addEventListener('touchmove', (e) => {
			if (!active) return;
			let x;
			for (let i = 0; i < e.changedTouches.length; i++) {
				x = e.changedTouches[i].pageX;
			}

			x -= slider.getBoundingClientRect().left;
			slideIt(x);
			pauseEvent(e);
		});

		function slideIt(x) {
			let transform = Math.max(0, Math.min(x, slider.offsetWidth));
			before.style.width = transform + "px";
			resizer.style.left = transform + "px";
		}

		// Запобігання виділенню елементів.
		function pauseEvent(e) {
			if (e.stopPropagation) e.stopPropagation();
			if (e.preventDefault) e.preventDefault();
			e.cancelBubble = true;
			e.returnValue = false;
			return false;
		}
	});
});
