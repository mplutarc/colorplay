'use strict';

const rgbToHex = (rgb) =>{
	if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255)
		throw "Invalid color component";
	return ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16);
};

const rgbToHsl = (rgb) => {
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
'use strict';

let pxData;

$(".color_scheme").click(function (event) {
	$(".color_getter").offset({
		left: event.pageX - 4,
		top: event.pageY - 4
	});

	if (!this.canvas) {
		this.canvas = $('<canvas />')[0];
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
	}
	pxData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
	setColor(pxData, light);
});

'use strict';

let light
let lightRange = document.querySelector('.slider')

const rangeValue = () =>{
	light = lightRange.value
	let target = document.querySelector('.lightValue')
	target.innerHTML = light

	setColor(pxData, light)
}

lightRange.addEventListener("input", rangeValue)
'use strict';

const setColor = (pxData, light = 100) => {
	let rgb = `rgb(${pxData[0]}, ${pxData[1]}, ${pxData[2]})`;
	const hsl = {
		h: rgbToHsl(rgb).h,
		s: rgbToHsl(rgb).s,
		l: light
	}
	console.log(hsl)
	rgb = hslToRgb(hsl)
	let hexOutput = `#${rgbToHex(rgb)}`;
	console.log(hexOutput)

	$('#RGBoutput').html(`R: ${rgb.r} G: ${rgb.g} B: ${rgb.b}`);
	$('#HEXoutput').html(hexOutput);
	$('.lightValue').html(light);
	$('.slider').val(light);

	$('header').css('background-color', `rgb(${rgb.r},${rgb.g},${rgb.b})`)
	$('header img').css({'border-color': `rgb(${rgb.r},${rgb.g},${rgb.b})`});
}