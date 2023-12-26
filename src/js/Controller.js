
import Card from '../js/Card'

export default class Controller {
	constructor() {
		// Card
		this.draggingElement = null;
		// Card.proection
		this.draggingProection = null;
	}

	init() {
		const addButtons = document.querySelectorAll('.add-button')
		addButtons.forEach(button => {
			button.addEventListener('click', (evt) => {
				const primaryButton = evt.target
				const addWindow = document.createElement('div')
				addWindow.classList.add('add-window')

				const addField = document.createElement('textarea')
				addField.classList.add('add-field')

				const finishAddButton = document.createElement('button')
				finishAddButton.classList.add('finish-add-button')
				finishAddButton.innerHTML = "Add"
				finishAddButton.addEventListener('click', (evt) => {
				evt.target.parentElement.insertAdjacentElement("beforebegin",Card.create(addField.value).element)
				evt.target.parentElement.insertAdjacentElement('afterend',primaryButton)
				addWindow.remove()
				})

				const cancelButton = document.createElement('button')
				cancelButton.classList.add('add-cancel-button')
				cancelButton.innerHTML = "&times"
				cancelButton.addEventListener('click',  (evt) => {
					evt.target.parentElement.parentElement.append(primaryButton)
					addWindow.remove()
				})

				primaryButton.insertAdjacentElement('beforebegin', addWindow)
				primaryButton.remove()

				addWindow.append(addField,finishAddButton  , cancelButton)
				addField.focus()

			})			
		});
	}

	setDraggingElement(node) {
		this.draggingElement = new Card(node);
	}

	replaceDragging() {
		this.draggingProection.replaceWith(this.draggingElement.element);
		this.draggingElement.element.style = this.draggingElement.styles;
	}

	clear() {
		this.draggingElement = null;
		this.draggingProection = null;
	}

	onMouseDown = (evt) => {
		const target = evt.target;

		if (target.classList.contains('draggable')) {
			this.shiftX = evt.offsetX;
			this.shiftY = evt.offsetY;
			this.setDraggingElement(target);
			this.draggingElement.styles = `
		 		left: ${evt.pageX - this.shiftX}px;
		 		top: ${evt.pageY - this.shiftY}px;
			`
			document.body.style.cursor = 'grabbing'
			this.proectionAct(evt)
			
			
		}
	}

	onMouseUp = () => {
		if (this.draggingElement) {
			this.replaceDragging();
			this.clear()
			document.body.style.cursor = 'default'
		}
	}

	// Рассчёт позиции вставки проекции и вставка или удаление
	proectionAct(evt) {
		const target = evt.target;
		const element = this.draggingElement;
		const proection = this.draggingProection;
		if (
			target.classList.contains("draggable") &&
			!target.classList.contains("proection") 
		) {
			const { y, height } = target.getBoundingClientRect();
			const appendPosition = y + height / 2 > evt.clientY
				? "beforebegin"
				: "afterend";

			if (!proection) {
				this.draggingProection = element.proection;
			} else {
				proection.remove();
				target.insertAdjacentElement(appendPosition, proection);
			}
		}
		else if (
			target.classList.contains("card-container") 
			&&
			!target.childNode
			
		) {
			proection.remove();
			target.prepend(proection);
		}
	}

	onMouseMove = (evt) => {
		if (this.draggingElement) {
			const { pageX, pageY } = evt;
			const element = this.draggingElement;
			const { width, height } = this.draggingElement.styles;
			element.styles = `
				position: absolute;
		 		left: ${pageX - this.shiftX}px;
		 		top: ${pageY - this.shiftY}px;
		 		pointer-events: none;
				width: ${width};
				height: ${height};
			`
			document.body.style.cursor = 'grabbing'
			this.proectionAct(evt)
		}
	}
}
