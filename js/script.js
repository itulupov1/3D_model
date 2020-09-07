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

		const addNullToTimer = (times) => {
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

	countTimer(`06 september 2020`);

	//menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
	};
	toggleMenu();
	//popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popUpClose = document.querySelector('.popup-close'),
			popupContent = document.querySelector('.popup-content');
		let count = 0;
		let animInterval;

		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (document.documentElement.clientWidth > 768) {
					popupContent.style.left = `-40%`;
					animInterval = setInterval(animatePopUp, 17);
				}
			});
		});
		
		popUpClose.addEventListener('click', () => {
			popup.style.display = 'none';
			clearInterval(animInterval);
			count = 0;
			popupContent.style.left = '';
		});

		// animate popup
		const animatePopUp = () => {
			count++;
			if (count < 39 / 1.5) {
				popupContent.style.left = `${count*1.5}%`;
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

		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++){
				if (index === i){
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
			while (target !== tabHeader) {
				if (target.classList.contains('service-header-tab')) {
					tab.forEach((item, i) => {
						if (item === target) {
							toggleTabContent(i);
						}
					});
					return;
				}
				target = target.parentNode;
			}
		});
	};
	tabs();
});

