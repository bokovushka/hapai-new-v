// Замість введення через input значення задається напряму у коді
const element = document.querySelector(".cool-element");

// Наприклад, ми хочемо почати з числа 12345
const numberValue = "0103750";

const ROOT_CLASS_NAME = "digit-flipper";

class DigitFlipper {
	constructor(element, options = {
		number: 9,
		iterationCount: 9
	}) {
		if (options.number > 9 || options.number < 0) return;
		this.options = Object.assign({}, options);
		if (!this.options.number) this.options.number = 9;
		if (!this.options.iterationCount) this.options.iterationCount = 9;
		if (this.options.number - this.options.iterationCount < 0) {
			this.options.iterationCount = this.options.number;
		}
		this.element = element;
		this.digitClassName = `${ROOT_CLASS_NAME}__digit`;
		this.topClassName = `${this.digitClassName}-top`;
		this.bottomClassName = `${this.digitClassName}-bottom`;
		this.flipTopClass = `${this.digitClassName}--flip-top`;
		this.flipBottomClass = `${this.digitClassName}--flip-bottom`;
		this.flipDoneClass = `${this.digitClassName}--flip-done`;
		this.DOMNodes = [];
		this.flipDuration = parseFloat(
			(window.getComputedStyle(document.documentElement).
				getPropertyValue("--flip-duration") || "1s").
				replace("s", ""));
		this._init();
		return this;
	}
	_init() {
		this._populateDOM();
	}
	_populateDOM() {
		let i = this.options.number - this.options.iterationCount;
		for (i; i <= this.options.number; i++) {
			const digit = document.createElement("span"),
				digitTop = document.createElement("span"),
				digitBottom = document.createElement("span"),
				digitText = document.createTextNode(i);
			digit.className = this.digitClassName;
			digitTop.className = this.topClassName;
			digitBottom.className = this.bottomClassName;
			digitTop.appendChild(digitText);
			digitBottom.appendChild(digitText.cloneNode());
			digit.appendChild(digitTop);
			digit.appendChild(digitBottom);
			this.DOMNodes.push(digit);
			this.element.insertAdjacentElement("afterbegin", digit);
		}
	}
	flip() {
		this.DOMNodes.forEach((node, index) => {
			const nextNode = this.DOMNodes[index + 1];
			let delay = this.flipDuration * index * 1000;
			const t1 = setTimeout(() => {
				node.classList.add(this.flipBottomClass);
				clearTimeout(t1);
				const t2 = setTimeout(() => {
					if (nextNode) node.classList.add(this.flipTopClass);
					clearTimeout(t2);
					const t3 = setTimeout(() => {
						node.style.zIndex = index + 1;
						clearTimeout(t3);
					}, this.flipDuration);
				}, this.flipDuration);
			}, delay);
		});
	}
}

class FlipCounter {
	constructor(element, value) {
		this.element = element;
		this.targetNumber = value;
		this.targetDigits = value.split(''); // Розділяємо кожен символ
		this.numDigits = this.targetDigits.length;
		this.DOMNodes = [];
		this.flipperInstances = [];
		this.populateDOM();
		this.populateInstanceArray();
	}

	populateDOM() {
		this.element.innerHTML = "";

		// Створення елементів для цифр
		for (let i = 0; i < this.numDigits; i++) {
			const container = document.createElement("span");
			container.className = ROOT_CLASS_NAME;
			this.element.appendChild(container);
			this.DOMNodes.push(container);
		}

		// Створення елементів для валюти (₴)
		const currencyContainer = document.createElement("span");
		currencyContainer.className = ROOT_CLASS_NAME;
		const currencyTop = document.createElement("span");
		currencyTop.className = "digit-flipper__digit-top";
		currencyTop.innerText = "₴";
		const currencyBottom = document.createElement("span");
		currencyBottom.className = "digit-flipper__digit-bottom";
		currencyBottom.innerText = "₴";

		const currencyDigit = document.createElement("span");
		currencyDigit.className = "digit-flipper__digit digit-flipper__digit--flip-bottom";
		currencyDigit.appendChild(currencyTop);
		currencyDigit.appendChild(currencyBottom);

		currencyContainer.appendChild(currencyDigit);
		this.element.appendChild(currencyContainer);
	}

	populateInstanceArray() {
		this.DOMNodes.forEach((digit, index) => {
			this.flipperInstances.push(
				new DigitFlipper(digit, {
					number: this.targetDigits[index],
					iterationCount: 4
				})
			);
		});

		// Створюємо окремий об'єкт для валюти
		this.flipperInstances.push(
			new DigitFlipper(this.element.querySelector('.digit-flipper'), {
				number: '₴',
				iterationCount: 4
			})
		);
	}

	play() {
		this.flipperInstances.forEach((instance, index) => {
			let delay = index * 200;
			setTimeout(() => instance.flip(), delay);
		});
	}
}

const counter = new FlipCounter(element, numberValue);
counter.play();

