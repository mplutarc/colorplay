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