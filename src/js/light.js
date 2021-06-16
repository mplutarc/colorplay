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