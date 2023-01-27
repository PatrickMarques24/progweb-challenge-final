import convert from "color-convert";
export class Color {
	#hsl;
	#hex;
	#element;

	constructor(hsl) {
		this.#hsl = hsl;
		this.#hex = `#${convert.hsl.hex(this.#hsl)}`;
		this.#element = this.#generateElement();
	}

	#generateElement() {
		// Crée un élément <div>
		const colorElement = document.createElement("div");
		// Lui ajoute une class "color"
		colorElement.classList.add("color");
		// Ajoute l'attribut de donnée "data-color"
		colorElement.dataset.color = this.#hex;
		// Change la couleur de fond de l'élément
		colorElement.style.backgroundColor = this.#hex;

		//Crée un élément <p>
		const textElement = document.createElement("p");
		// Lui ajoute comme texte la valeur hexadécimale
		textElement.textContent = this.#hex;
		// Change la couleur du texte selon la luminosité de la couleur de fond
		textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
		// Ajoute l'élément <p> comme enfant du <div>
		colorElement.appendChild(textElement);

		// Retourne le <div>
		return colorElement;
	}

	display(parentElement) {
		parentElement.appendChild(this.#element);
	}
}
