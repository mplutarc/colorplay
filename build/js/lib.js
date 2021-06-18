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

	hsl.s = Math.round(hsl.s);
	hsl.l = Math.round(hsl.l);

	return hsl
};

'use strict';

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
	let pxData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
	setColor(pxData);
});

'use strict';

let elem = document.querySelector('input[type="range"]');

let rangeValue = () =>{
	let val = elem.value;
	let target = document.querySelector('.lightValue');
	target.innerHTML = val;

	return val;
}

// const changeLight = (val) =>{
// 	let rgb = $('header').css('background-color');
// }

elem.addEventListener("input", rangeValue);
export const setColor = (pxData) => {
	let hexOutput = `#${rgbToHex(pxData)}`;
	let rgb = `rgb(${pxData[0]}, ${pxData[1]}, ${pxData[2]})`;
	let light = rangeValue()
	console.log(light)

	$('#RGBoutput').html(`R: ${pxData[0]} G: ${pxData[1]} B: ${pxData[2]}`);
	$('#HEXoutput').html(hexOutput);
	$('.lightValue').html(rgbToHsl(rgb).l);
	$('.slider').val(rgbToHsl(rgb).l);

	const hsl = {
		h: rgbToHsl(rgb).h,
		s: rgbToHsl(rgb).s,
		l: light
	}
	$('header').css('background-color', `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`)
	console.log(hsl)

	// $('header').css({'background-color': hexOutput});
	$('header img').css({'border-color': hexOutput});
}