'use strict';

let pxData;

$(".color_scheme").click(function (event) {
	$(".color_getter").offset({
		left: event.pageX - 4,
		top: event.pageY - 4
	});

	if (!this.canvas) {
		this.canvas = $('<canvas />')[0];
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
	}
	pxData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
	let rgb = {
		r: pxData[0],
		g: pxData[1],
		b: pxData[2]
	}
	setColor(rgb, light);
});
