$(function() {
	$('img').mousemove(function(e) {

		if(!this.canvas) {
			this.canvas = $('<canvas />')[0];
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
		}
		let pxData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
		let hexOutput = `#${rgbToHex(pxData)}`;
		$('#RGBoutput').html(`R: ${pxData[0]} G: ${pxData[1]} B: ${pxData[2]}`);
		$('#HEXoutput').html(hexOutput);
		$('body').css({'background-color': hexOutput})
	});
});
const rgbToHex = (px) =>{
	if (px[0] > 255 || px[1] > 255 || px[2] > 255)
		throw "Invalid color component";
	return ((px[0] << 16) | (px[1] << 8) | px[2]).toString(16);
}