'use strict';

const setColor = (rgb = {r: 0, g: 0, b: 0}, light = 100) => {
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