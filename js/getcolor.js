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
		let darkerRGB = `rgb(${pxData[0]-20}, ${pxData[1]-20}, ${pxData[2]-20})`;
		$('#RGBoutput').html(`R: ${pxData[0]} G: ${pxData[1]} B: ${pxData[2]}`);
		$('#HEXoutput').html(hexOutput);
		$('body').css({'background-color': hexOutput});
		$('header').css({'background-color': darkerRGB});
		$('header img').css({'border-color': darkerRGB});
	});
});
const rgbToHex = (px) =>{
	if (px[0] > 255 || px[1] > 255 || px[2] > 255)
		throw "Invalid color component";
	return ((px[0] << 16) | (px[1] << 8) | px[2]).toString(16);
}