window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// Timer
	function countTimer(deadline){
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining(){
			const dateStop = new Date(deadline).getTime();
			const	dateNow = new Date().getTime();
			const	timeRemaining = (dateStop - dateNow) / 1000;
			const	seconds = Math.floor(timeRemaining % 60);
			const	minutes = Math.floor((timeRemaining / 60) % 60);
			const	hours = Math.floor(timeRemaining / 60 / 60);
			return {timeRemaining, hours, minutes, seconds};
		} 
		function updateClock(){
			const timer = getTimeRemaining();

			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;
			

			if (timerSeconds.textContent.length === 1){
				timerSeconds.textContent = `0${timer.seconds}`;
			} else if (timerMinutes.textContent.length === 1) {
				timerMinutes.textContent = `0${timer.minutes}`;
			} else if (timerHours.textContent.length === 1) {
				timerHours.textContent = `0${timer.hours}`;
			}

			if (timer.timeRemaining < 0) {
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				clearInterval(interval);
			}
		}
		const interval = setInterval(updateClock, 1000);
	}

	countTimer('05 september 2020');
});
