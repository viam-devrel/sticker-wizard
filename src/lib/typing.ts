const typeInternal = (element: HTMLElement, text: string, idx: number): Promise<number> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			idx += 1;
			element.textContent = text.substring(0, idx);
			resolve(idx);
		}, 50);
	});
};

export const type = async (element: HTMLElement, text: string) => {
	let idx = 0;
	while (idx <= text.length) {
		idx = await typeInternal(element, text, idx);
	}
};
