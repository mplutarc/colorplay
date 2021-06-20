'use strict';

let light
let lightRange = document.querySelector('.slider')

const rangeValue = () =>{
	light = lightRange.value
	let target = document.querySelector('.lightValue')
	target.innerHTML = light

	let rgb = {
		r: 0,
		g: 0,
		b: 0
	}
	if(pxData){
		rgb = {
			r: pxData[0],
			g: pxData[1],
			b: pxData[2]
		}
	}

	setColor(rgb, light)
}

lightRange.addEventListener("input", rangeValue)