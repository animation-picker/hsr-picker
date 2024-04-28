export const removeDash = (name) => {
	if (!name) return name;
	const removedDelimiter = name.replace(/-/g, ' ').replace(new RegExp('_'), "'");
	return removedDelimiter
		.split(' ')
		.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
		.join(' ');
};

export const getSlug = (name) => name.replace(/ /g, '-').replace(new RegExp("'"), '_');

export const copy = (text) => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
		return;
	}
	const textArea = document.createElement('textarea');
	textArea.setAttribute('style', 'position: fixed; top: -200%');
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	return new Promise((res, rej) => {
		document.execCommand('copy') ? res() : rej();
		textArea.remove();
	});
};
