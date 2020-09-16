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

export default togglePopUp;