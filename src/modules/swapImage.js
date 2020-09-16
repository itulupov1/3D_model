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

export default swapImage;