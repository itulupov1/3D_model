window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// Timer
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime();
			const	dateNow = new Date().getTime();
			const	timeRemaining = (dateStop - dateNow) / 1000;
			const	seconds = Math.floor(timeRemaining % 60);
			const	minutes = Math.floor((timeRemaining / 60) % 60);
			const	hours = Math.floor(timeRemaining / 60 / 60);
			return {timeRemaining, hours, minutes, seconds};
		};

		const addNullToTimer = times => {
			if (times.toString().length === 1) {
				times = `0${times}`;
			}
			return times;
		};

		const updateClock = () => {
			const timer = getTimeRemaining();

			timerHours.textContent = addNullToTimer(timer.hours);
			timerMinutes.textContent = addNullToTimer(timer.minutes);
			timerSeconds.textContent = addNullToTimer(timer.seconds);

			if (timer.timeRemaining < 0) {
				timerHours.textContent = `00`;
				timerMinutes.textContent = `00`;
				timerSeconds.textContent = `00`;
				clearInterval(interval);
			}
		};
		const interval = setInterval(updateClock, 1000);
		updateClock();
	};

	countTimer(`18 september 2020`);

	//menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		menu.addEventListener('click', event => {
			const target = event.target;

			if (target.tagName === 'A') {
				handlerMenu();
			}
		});
		btnMenu.addEventListener('click', handlerMenu);
	};
	toggleMenu();

	//popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');
		let count = 0;
		let animInterval;

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (document.documentElement.clientWidth > 768) {
					popupContent.style.left = `-40%`;
					animInterval = setInterval(animatePopUp, 17);
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				clearInterval(animInterval);
				count = 0;
				popupContent.style.left = '';
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
					clearInterval(animInterval);
					count = 0;
					popupContent.style.left = '';
				}
			}
		});

		// animate popup
		const animatePopUp = () => {
			count++;
			if (count < 39 / 1.5) {
				popupContent.style.left = `${count * 1.5}%`;
			} else {
				clearInterval(animInterval);
			}
		};
	};
	togglePopUp();

	//tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();

	//slider
	const slider = () => {

		const slide = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const addDotsToSlide = () => {
			const slide = document.querySelectorAll('.portfolio-item'),
				portfoliDotsList = document.querySelector('.portfolio-dots');

			for (let i = 0; i < slide.length; i++) {
				const newDot = document.createElement('li');
				newDot.classList.add('dot');
				if (i === 0) {
					newDot.classList.add('dot-active');
				}
				portfoliDotsList.append(newDot);
			}
		};
		addDotsToSlide();

		const dot = document.querySelectorAll('.dot');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2500) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return 0;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			} else if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);
	};
	slider();

	// swap image mouseOver
	const swapImage = () => {
		const imgContainer = document.querySelector('#command');

		imgContainer.addEventListener('mouseover', event => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				target.dataset.oldimg = target.src;
				target.src = target.dataset.img;

			}
		});
		imgContainer.addEventListener('mouseout', event => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				target.src = target.dataset.oldimg;
			}
		});

	};
	swapImage();

	// numbs only for calc
	const calcBlock = () => {
		const block = document.querySelector('.calc-block');

		block.addEventListener('input', event => {
			const target = event.target;

			if (target.tagName === 'INPUT') {
				target.value = target.value.replace(/\D/i, '');
			}
		});
	};
	calcBlock();

	// calculator
	const calc = (price = 100) => {
		const calckBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0;
			let countValue = 1;
			let dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value;
			const squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			totalValue.textContent = total;
		};

		calckBlock.addEventListener('change', event => {
			const target = event.target;
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};
	calc(100);

	//send ajax form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...';
		const loadMessage = 'Загрузка...';
		const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem';

		const submitBtn = event => {
			event.preventDefault();
			const form = document.getElementById(`${event.target.id}`);
			if (event.target.id === 'form3') {
				statusMessage.style.color = '#fff';
			}
			form.append(statusMessage);
			statusMessage.textContent = loadMessage;

			const formData = new FormData(form);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postData(body)
				.then(() => {
					statusMessage.textContent = successMessage;
					form.querySelectorAll('input').forEach(elem => {
						elem.value = '';
					});
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		};
		document.body.addEventListener('submit', submitBtn);

		document.body.addEventListener('input', event => {
			const target = event.target;

			if (target.type === 'tel') {
				target.value = target.value.replace(/[^\d+]/g, '');
				if (target.value.match(/[+]\d{11}|[\d]{11}/g) !== null) {
					target.value = target.value.match(/[+]\d{11}|[\d]{11}/g);
				}
			} else if (target.type === 'text' || target.name === 'user_message') {
				target.value = target.value.replace(/[^а-яё\s]/ig, '');
			}
		});

		const postData = body => new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					resolve();
				} else {
					reject(request.status);
				}
			});
			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(body));
		});
	};
	sendForm();

});
