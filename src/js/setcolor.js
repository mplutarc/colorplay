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