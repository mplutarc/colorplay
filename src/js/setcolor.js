'use strict';

const setColor = (rgb = {r: 255, g: 255, b: 255}, light = 100) => {
	const hsl = {
		h: rgbToHsl(rgb).h,
		s: rgbToHsl(rgb).s,
		l: light
	}
	console.log(hsl)
	rgb = hslToRgb(hsl)
	let hexOutput = `#${rgbToHex(rgb)}`;
	console.log(hexOutput)
	let darkRGB = Object.assign({}, rgb);
	darkRGB.r -= 20;
	darkRGB.g -= 20;
	darkRGB.b -= 20;
	let lightRGB = Object.assign({}, rgb);
	lightRGB.r += (255 - lightRGB.r) / 5;
	lightRGB.g += (255 - lightRGB.g) / 5;
	lightRGB.b += (255 - lightRGB.b) / 5;
	let ultraLightRGB = Object.assign({}, rgb);
	ultraLightRGB.r += (255 - ultraLightRGB.r) / 1.5;
	ultraLightRGB.g += (255 - ultraLightRGB.g) / 1.5;
	ultraLightRGB.b += (255 - ultraLightRGB.b) / 1.5;
	let color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
	let darkColor = `rgb(${darkRGB.r},${darkRGB.g},${darkRGB.b})`;
	let lightColor = `rgb(${lightRGB.r},${lightRGB.g},${lightRGB.b})`;
	let ultraLightColor = `rgb(${ultraLightRGB.r},${ultraLightRGB.g},${ultraLightRGB.b})`;

	$('#RGBoutput').html(`R: ${rgb.r} G: ${rgb.g} B: ${rgb.b}`);
	$('#HEXoutput').html(hexOutput);
	$('.lightValue').html(light);
	$('.slider').val(light);

	$('header').css('background-color', `${color}`);
	$('header img').css('border-color', `${darkColor}`);
	$('header p').css({'text-shadow': `5px 5px 0 ${darkColor}`});

	$('.close').mouseover(function (){
		$('.close').css('color', `${darkColor}`);
	})
	$('.close').mouseleave(function (){
		$('.close').css('color', `black`);
	})

	$('.interact_btn').css('background-color', `${lightColor}`);
	$('.interact_btn').mouseover(function (){
		$('.interact_btn').css('background-color', `${color}`);
	})
	$('.interact_btn').mouseleave(function (){
		$('.interact_btn').css('background-color', `${lightColor}`);
	})

	$('.interact_accord_btn').css('background-color', `${lightColor}`);
	$('.interact_accord_btn.active').css('background-color', `${color}`);
	$('.interact_accord_btn').mouseover(function (){
		$(this).css('background-color', `${color}`);
	})
	$('.interact_accord_btn').mouseleave(function (){
		$(this).css('background-color', `${lightColor}`);
	})
	$('.interact_accord_btn.active').mouseleave(function (){
		$(this).css('background-color', `${color}`);
	})
	$('.panel').css('background-color', `${ultraLightColor}`)

	if(rgbToHsl(darkRGB).l < 20){
		$('header p').css({'color': `${ultraLightColor}`});
		$('.interact_accord_btn').css('color', `${ultraLightColor}`);
		$('.interact_btn').css('color', `${ultraLightColor}`);
	}
	else {
		$('header p').css({'color': `black`});
		$('.interact_accord_btn').css('color', `black`);
		$('.interact_btn').css('color', `black`);
	}
}