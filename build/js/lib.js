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
'use strict';

const rgbToHex = (rgb) =>{
	if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255)
		throw "Invalid color component";
	return ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16);
};

const rgbToHsl = (rgb) => {
	rgb.r = rgb.r/ 255;
	rgb.g = rgb.g/ 255;
	rgb.b = rgb.b/ 255;
	let max = Math.max(rgb.r, rgb.g, rgb.b),
		min = Math.min(rgb.r, rgb.g, rgb.b),
		delta = max - min
	;
	const hsl = {
			h: 0,
			s: 0,
			l: 0
		}

	if (delta === 0)
		hsl.h = 0;
	// Red is max
	else if (max === rgb.r)
		hsl.h = ((rgb.g - rgb.b) / delta) % 6;
	// Green is max
	else if (max === rgb.g)
		hsl.h = (rgb.b - rgb.r) / delta + 2;
	// Blue is max
	else
		hsl.h = (rgb.r - rgb.g) / delta + 4;

	hsl.h = Math.round(hsl.h * 60);

	// Make negative hues positive behind 360°
	if (hsl.h < 0)
		hsl.h += 360;

	// Calculate lightness
	hsl.l = (max + min) / 2;

	// Calculate saturation
	hsl.s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));

	// Multiply l and s by 100
	hsl.s = +(hsl.s * 100).toFixed(1);
	hsl.l = +(hsl.l * 100).toFixed(1);

	hsl.s = Math.round(hsl.s);
	hsl.l = Math.round(hsl.l);

	return hsl
};

const hslToRgb = (hsl) =>{
	let rgb = {
		r: 0,
		g: 0,
		b: 0
	};

	hsl.s /= 100;
	hsl.l /= 100;

	let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
		x = c * (1 - Math.abs((hsl.h / 60) % 2 - 1)),
		m = hsl.l - c/2;

	if (0 <= hsl.h && hsl.h < 60) {
		rgb.r = c; rgb.g = x; rgb.b = 0;
	} else if (60 <= hsl.h && hsl.h < 120) {
		rgb.r = x; rgb.g = c; rgb.b = 0;
	} else if (120 <= hsl.h && hsl.h < 180) {
		rgb.r = 0; rgb.g = c; rgb.b = x;
	} else if (180 <= hsl.h && hsl.h < 240) {
		rgb.r = 0; rgb.g = x; rgb.b = c;
	} else if (240 <= hsl.h && hsl.h < 300) {
		rgb.r = x; rgb.g = 0; rgb.b = c;
	} else if (300 <= hsl.h && hsl.h < 360) {
		rgb.r = c; rgb.g = 0; rgb.b = x;
	}
	rgb.r = Math.round((rgb.r + m) * 255);
	rgb.g = Math.round((rgb.g + m) * 255);
	rgb.b = Math.round((rgb.b + m) * 255);

	return rgb;
}
'use strict';

let pxData;

$(".color_scheme").click(function (event) {
	$(".color_getter").offset({
		left: event.pageX - 4,
		top: event.pageY - 4
	});

	if($(".instruments").hasClass('opened')) {
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
		light = rgbToHsl(rgb).l
		setColor(rgb, light);
	}
	else {
		openInstruments();
	}
});

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
const openInstruments = () =>{
	$('.instruments').addClass('opened');
}
$('.close').click(function (){
	$('.instruments').removeClass('opened');
})
'use strict';

const setColor = (rgb = {r: 255, g: 255, b: 255}, light = 100) => {
	const hsl = {
		h: rgbToHsl(rgb).h,
		s: rgbToHsl(rgb).s,
		l: light
	}
	console.log(hsl)
	rgb = hslToRgb(hsl)
	let hexOutput = `#${rgbToHex(rgb)}`;
	console.log(hexOutput)
	let darkRGB = Object.assign({}, rgb);
	darkRGB.r -= 20;
	darkRGB.g -= 20;
	darkRGB.b -= 20;
	let lightRGB = Object.assign({}, rgb);
	lightRGB.r += (255 - lightRGB.r) / 5;
	lightRGB.g += (255 - lightRGB.g) / 5;
	lightRGB.b += (255 - lightRGB.b) / 5;
	let ultraLightRGB = Object.assign({}, rgb);
	ultraLightRGB.r += (255 - ultraLightRGB.r) / 1.5;
	ultraLightRGB.g += (255 - ultraLightRGB.g) / 1.5;
	ultraLightRGB.b += (255 - ultraLightRGB.b) / 1.5;
	let color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
	let darkColor = `rgb(${darkRGB.r},${darkRGB.g},${darkRGB.b})`;
	let lightColor = `rgb(${lightRGB.r},${lightRGB.g},${lightRGB.b})`;
	let ultraLightColor = `rgb(${ultraLightRGB.r},${ultraLightRGB.g},${ultraLightRGB.b})`;

	$('#RGBoutput').html(`R: ${rgb.r} G: ${rgb.g} B: ${rgb.b}`);
	$('#HEXoutput').html(hexOutput);
	$('.lightValue').html(light);
	$('.slider').val(light);

	$('header').css('background-color', `${color}`);
	$('header img').css('border-color', `${darkColor}`);
	$('header p').css({'text-shadow': `5px 5px 0 ${darkColor}`});

	$('.close').mouseover(function (){
		$('.close').css('color', `${darkColor}`);
	})
	$('.close').mouseleave(function (){
		$('.close').css('color', `black`);
	})

	$('.interact_btn').css('background-color', `${lightColor}`);
	$('.interact_btn').mouseover(function (){
		$('.interact_btn').css('background-color', `${color}`);
	})
	$('.interact_btn').mouseleave(function (){
		$('.interact_btn').css('background-color', `${lightColor}`);
	})

	$('.interact_accord_btn').css('background-color', `${lightColor}`);
	$('.interact_accord_btn.active').css('background-color', `${color}`);
	$('.interact_accord_btn').mouseover(function (){
		$(this).css('background-color', `${color}`);
	})
	$('.interact_accord_btn').mouseleave(function (){
		$(this).css('background-color', `${lightColor}`);
	})
	$('.interact_accord_btn.active').mouseleave(function (){
		$(this).css('background-color', `${color}`);
	})
	$('.panel').css('background-color', `${ultraLightColor}`)

	if(rgbToHsl(darkRGB).l < 20){
		$('header p').css({'color': `${ultraLightColor}`});
		$('.interact_accord_btn').css('color', `${ultraLightColor}`);
		$('.interact_btn').css('color', `${ultraLightColor}`);
	}
	else {
		$('header p').css({'color': `black`});
		$('.interact_accord_btn').css('color', `black`);
		$('.interact_btn').css('color', `black`);
	}
}