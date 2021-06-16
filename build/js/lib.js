export const rgbToHex = (px) =>{
	if (px[0] > 255 || px[1] > 255 || px[2] > 255)
		throw "Invalid color component";
	return ((px[0] << 16) | (px[1] << 8) | px[2]).toString(16);
};

export const rgbToHsl = (rgb) => {
	console.log(rgb);
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
		delta = max - min,
		h,s,l;

	if (delta === 0)
		h = 0;
	// Red is max
	else if (max === r)
		h = ((g - b) / delta) % 6;
	// Green is max
	else if (max === g)
		h = (b - r) / delta + 2;
	// Blue is max
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0)
		h += 360;

	// Calculate lightness
	l = (max + min) / 2;

	// Calculate saturation
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
	$('.slider').val(l);

	return `hsl(${h}, ${s}%, ${l}%)`
};
'use strict';

// const {rgbToHex, rgbToHsl} =  require('./convertColors');

// import {rgbToHex, rgbToHsl} from "../../build/js/lib";

$(function() {
	$(".color_scheme").click(function (event) {
		$(".color_getter").offset ( {
			left: event.pageX - 4,
			top: event.pageY - 4
		});

		if(!this.canvas) {
			this.canvas = $('<canvas />')[0];
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
		}
		let pxData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
		let hexOutput = `#${rgbToHex(pxData)}`;
		let rgb = `rgb(${pxData[0]}, ${pxData[1]}, ${pxData[2]})`;
		$('#RGBoutput').html(`R: ${pxData[0]} G: ${pxData[1]} B: ${pxData[2]}`);
		$('#HEXoutput').html(hexOutput);
		$('header').css({'background-color': hexOutput});
		$('header img').css({'border-color': hexOutput});
		console.log(rgbToHsl(rgb));
	});
});

'use strict';

// import {rgbToHsl} from "../../build/js/lib";

let elem = document.querySelector('input[type="range"]');

let rangeValue = function(){
	let newValue = elem.value;
	let target = document.querySelector('.lightValue');
	target.innerHTML = newValue;
	// let hsl = rgbToHsl($('header').css('background-color'));
}

elem.addEventListener("input", rangeValue);