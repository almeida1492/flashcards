generateCountText = (item) => {
	switch (item.cards.length) {
		case 0:
			return 'empty';
		case 1:
			return '1 card';
		default:
			return `${item.cards.length} cards`;
	}
}

export default generateCountText;