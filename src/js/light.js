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