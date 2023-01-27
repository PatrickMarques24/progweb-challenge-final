import convert from "color-convert";
import { generatePalette, hexToCSSHSL, isHex } from "./modules/utils.js";
import { Color } from "./modules/Color.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const formElement = document.querySelector("form");
const mainElement = document.querySelector("main");
const headerElement = document.querySelector("header");

const notyf = new Notyf();

const handleForm = (e) => {
	e.preventDefault(); // Evite le raffraichissement de la page au moment d'appuyer sur Enter (submit)
	const value = e.target.firstElementChild.value;
	if (isHex(value)) {
		const palette = generatePalette(value);
		displayColors(value, palette);
	} else {
		notyf.error("This is not a valid hex color");
	}
};

const displayColors = (value, palette) => {
	mainElement.innerHTML = ""; // Réinitialise les blocs existants et réaffiche les nouveaux;

	palette.forEach((c) => {
		new Color(c).display(mainElement);
	});

	// [0,5,10]
	// [#000000, #666666, #ffffff]
	const gradientColors = [
		0,
		Math.floor(palette.length / 2),
		palette.length - 1,
	].map((index) => {
		return `#${convert.hsl.hex(palette[index])}`;
	});

	document.body.background = `linear-gradient(-45deg, ${gradientColors.join(
		", "
	)})`;

	document.body.style.backgroundSize = "400% 400%";

	headerElement.classList.add("minimized");
	document.documentElement.style.setProperty(
		"--shadow-color",
		hexToCSSHSL(value)
	);
};

formElement.addEventListener("submit", handleForm);
mainElement.addEventListener("click", async (e) => {
	const color = e.target.closest(".color").dataset.color;
	await navigator.clipboard.writeText(color);
	notyf.success(`${color} copied to clipboard`);
});
