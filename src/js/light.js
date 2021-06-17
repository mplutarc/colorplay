'use strict';

let elem = document.querySelector('input[type="range"]');

let rangeValue = () =>{
	let val = elem.value;
	let target = document.querySelector('.lightValue');
	target.innerHTML = val;
	console.log(val);

	changeLight(val);
}

const changeLight = (val) =>{
	let rgb = $('header').css('background-color');
	const hsl = {
		h: rgbToHsl(rgb).h,
		s: rgbToHsl(rgb).s,
		l: val
	}
	$('header').css('background-color', `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`)
	console.log(hsl)
}

elem.addEventListener("input", rangeValue);