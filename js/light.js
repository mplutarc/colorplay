let elem = document.querySelector('input[type="range"]');

let rangeValue = function(){
	let newValue = elem.value;
	let target = document.querySelector('.lightValue');
	target.innerHTML = newValue;
}


elem.addEventListener("input", rangeValue);