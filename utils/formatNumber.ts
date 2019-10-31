const formatNumber = (num: number): string => {
	if (num > 999999999999999) return num.toString();

	const chars = String(num)
		.split('')
		.reverse();
	const withCommas = chars.map((char, idx): string => {
		if (idx !== 0 && idx % 3 === 0) {
			return `${char},`;
		}

		return char;
	});

	return withCommas.reverse().join('');
};

export default formatNumber;
