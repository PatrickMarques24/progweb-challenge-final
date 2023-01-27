import convert from "color-convert";

export const generatePalette = (hex) => {
	const palette = [];
	let [h, s] = convert.hex.hsl(hex);
	for (let i = 0; i <= 100; i += 10) {
		palette.push([h, s, i]);
	}
	return palette;
};

export const hexToCSSHSL = (hex) => {
	const hsl = convert.hex.hsl(hex);
	return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`;
};

export const isHex = (hex) => /^#[0-9A-F]{6}$/i.test(hex);
