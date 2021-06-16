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
