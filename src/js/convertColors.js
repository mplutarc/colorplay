export const rgbToHex = (px) =>{
	if (px[0] > 255 || px[1] > 255 || px[2] > 255)
		throw "Invalid color component";
	return ((px[0] << 16) | (px[1] << 8) | px[2]).toString(16);
};

export const rgbToHsl = (rgb) => {
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	rgb = rgb.substr(4).split(")")[0].split(sep);

	for (let R in rgb) {
		let r = rgb[R];
		if (r.indexOf("%") > -1)
			rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
	}

	let r = rgb[0]/ 255,
		g = rgb[1]/ 255,
		b = rgb[2]/ 255,
		max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		delta = max - min
	;
	const hsl = {
			h: 0,
			s: 0,
			l: 0
		}

	if (delta === 0)
		hsl.h = 0;
	// Red is max
	else if (max === r)
		hsl.h = ((g - b) / delta) % 6;
	// Green is max
	else if (max === g)
		hsl.h = (b - r) / delta + 2;
	// Blue is max
	else
		hsl.h = (r - g) / delta + 4;

	hsl.h = Math.round(hsl.h * 60);

	// Make negative hues positive behind 360°
	if (hsl.h < 0)
		hsl.h += 360;

	// Calculate lightness
	hsl.l = (max + min) / 2;

	// Calculate saturation
	hsl.s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));

	// Multiply l and s by 100
	hsl.s = +(hsl.s * 100).toFixed(1);
	hsl.l = +(hsl.l * 100).toFixed(1);

	hsl.l = Math.round(hsl.l);

	return hsl
};
