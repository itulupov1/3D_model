const togglePopUp = () => {
	const popup = document.querySelector('.popup'),
		popupContent = document.querySelector('.popup-content');
	let count = 0;
	let animInterval;

	document.body.addEventListener('click', event => {
		const target = event.target;

		if (target.classList.contains('popup-btn')) {
			popup.style.display = 'block';
			if (document.documentElement.clientWidth > 768) {
				popupContent.style.left = `-40%`;
				animInterval = setInterval(animatePopUp, 17);
			}
		}

		if (target.classList.contains('popup-close')) {
			popup.style.display = 'none';
			clearInterval(animInterval);
			count = 0;
			popupContent.style.left = '';
		} else if (!target.closest('.popup-content') && popup.style.display === 'block' &&
		!target.classList.contains('popup-btn')) {
			popup.style.display = 'none';
			clearInterval(animInterval);
			count = 0;
			popupContent.style.left = '';
			console.log('kek');
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