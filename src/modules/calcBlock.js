const calcBlock = () => {
	const block = document.querySelector('.calc-block');

	block.addEventListener('input', event => {
		const target = event.target;

		if (target.tagName === 'INPUT') {
			target.value = target.value.replace(/\D/i, '');
		}
	});
};

export default calcBlock;