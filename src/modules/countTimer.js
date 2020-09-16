const countTimer = deadline => {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds');

	const getTimeRemaining = () => {
		const dateStop = new Date(deadline).getTime();
		const dateNow = new Date().getTime();
		const timeRemaining = (dateStop - dateNow) / 1000;
		const seconds = Math.floor(timeRemaining % 60);
		const minutes = Math.floor((timeRemaining / 60) % 60);
		const hours = Math.floor(timeRemaining / 60 / 60);
		return {
			timeRemaining,
			hours,
			minutes,
			seconds
		};
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

export default countTimer;