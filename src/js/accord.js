let acc = $(".interact_accord_btn");
let i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");

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
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.padding = '0';
			panel.style.marginBottom = '0';
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
			panel.style.padding = '0.5rem';
			panel.style.marginBottom = '0.5rem';
		}
		setColor(rgb, light);
	});
}