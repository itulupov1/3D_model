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
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		menu.addEventListener('click', () => {
			let target = event.target;

			if (target.tagName === 'A'){
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

		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (document.documentElement.clientWidth > 768) {
					popupContent.style.left = `-40%`;
					animInterval = setInterval(animatePopUp, 17);
				}
			});
		});
		
		popup.addEventListener('click', (event) => {
			let target = event.target;

			if (target.classList.contains('popup-close')){
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
			btn = document.querySelectorAll('.portfolio-btn'),
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
			if (currentSlide >= slide.length){
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
		
		slider.addEventListener('click', (event) => {
			event.preventDefault();

			let target = event.target;

			if (!target.matches('.portfolio-btn, .dot')){
				return 0;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')){
				currentSlide++;
			} else if (target.matches('#arrow-left')){
				currentSlide--;
			} else if (target.matches('.dot')){
				dot.forEach((elem, index) => {
					if (elem === target){
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

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn') || 
			event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
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

		imgContainer.addEventListener('mouseover', () => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				target.dataset.oldimg = target.src;
				target.src = target.dataset.img;

			}
		});
		imgContainer.addEventListener('mouseout', () => {
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

		block.addEventListener('input', () => {
			const target = event.target;

			if (target.tagName === 'INPUT'){
				target.value = target.value.replace(/\D/i, '');
			}
		});
	};
	calcBlock();
});

