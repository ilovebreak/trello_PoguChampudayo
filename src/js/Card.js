// Класс представляющий карточку. Имеет всё, чтобы появится и удалится
export default class Card {
	#el;
	#styles;

	constructor(element) {
		this.#el = element;
		this.#styles = window.getComputedStyle(element);
	}

	clear() {
		this.#el.remove()
	}

	set styles(text) {
		this.#el.style.cssText = text;
	}

	get styles() {
		return this.#styles;
	}

	get proection() {
		return (() => {
			const d = document.createElement('div');
			d.classList.add('proection');
			const { width, height } = this.styles;
			d.style.cssText = `
	 			width: ${width};
		 		height: ${height};
		 		margin: 10px 0;
				cursor: grabbing;
			`
			return d;
		})();
	}

	static create(content) {
		const node = document.createElement('div');
		node.classList.add('draggable');

		const cardText = document.createElement('div')
		cardText.classList.add('cardText')
		cardText.textContent = content
		node.appendChild(cardText)

		const button = document.createElement('button')
		button.classList.add('closeButton')
		button.innerHTML = '&#10006'
		button.addEventListener('click', (evt) => {evt.target.parentElement.remove()})
		node.appendChild(button)
		

		return new Card(node);
	}

	get element() {
		return this.#el;
	}
}