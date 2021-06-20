'use strict';

const rgbToHex = (rgb) =>{
	if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255)
		throw "Invalid color component";
	return ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16);
};

const rgbToHsl = (rgb) => {
	// let sep = rgb.indexOf(",") > -1 ? "," : " ";
	// rgb = rgb.substr(4).split(")")[0].split(sep);
	//
	// for (let R in rgb) {
	// 	let r = rgb[R];
	// 	if (r.indexOf("%") > -1)
	// 		rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
	// }

	rgb.r = rgb.r/ 255;
	rgb.g = rgb.g/ 255;
	rgb.b = rgb.b/ 255;
	let max = Math.max(rgb.r, rgb.g, rgb.b),
		min = Math.min(rgb.r, rgb.g, rgb.b),
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
	else if (max === rgb.r)
		hsl.h = ((rgb.g - rgb.b) / delta) % 6;
	// Green is max
	else if (max === rgb.g)
		hsl.h = (rgb.b - rgb.r) / delta + 2;
	// Blue is max
	else
		hsl.h = (rgb.r - rgb.g) / delta + 4;

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

	hsl.s = Math.round(hsl.s);
	hsl.l = Math.round(hsl.l);

	return hsl
};

const hslToRgb = (hsl) =>{
	let rgb = {
		r: 0,
		g: 0,
		b: 0
	};

	hsl.s /= 100;
	hsl.l /= 100;

	let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
		x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1)),
		m = hsl.l - c/2;

	if (0 <= hsl.h && hsl.h < 60) {
		rgb.r = c; rgb.g = x; rgb.b = 0;
	} else if (60 <= hsl.h && hsl.h < 120) {
		rgb.r = x; rgb.g = c; rgb.b = 0;
	} else if (120 <= hsl.h && hsl.h < 180) {
		rgb.r = 0; rgb.g = c; rgb.b = x;
	} else if (180 <= hsl.h && hsl.h < 240) {
		rgb.r = 0; rgb.g = x; rgb.b = c;
	} else if (240 <= hsl.h && hsl.h < 300) {
		rgb.r = x; rgb.g = 0; rgb.b = c;
	} else if (300 <= hsl.h && hsl.h < 360) {
		rgb.r = c; rgb.g = 0; rgb.b = x;
	}
	rgb.r = Math.round((rgb.r + m) * 255);
	rgb.g = Math.round((rgb.g + m) * 255);
	rgb.b = Math.round((rgb.b + m) * 255);

	return rgb;
}