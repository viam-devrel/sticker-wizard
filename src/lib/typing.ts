const typeInternal = (
	element: HTMLElement,
	text: string,
	delay: number,
	idx: number
): Promise<number> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			idx += 1;
			element.textContent = text.substring(0, idx);
			resolve(idx);
		}, delay);
	});
};

export const type = async (element: HTMLElement, text: string, delay = 50) => {
	let idx = 0;
	while (idx <= text.length) {
		idx = await typeInternal(element, text, delay, idx);
	}
};
