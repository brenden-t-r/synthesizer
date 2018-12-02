
var keyCodes = {
	65 : 'A',
	83 : 'S',
	68 : 'D',
	70 : 'F',
	71 : 'G',
	72 : 'H',
	74 : 'J',
	75 : 'K'
};

var frequencies = {
	65 : 261.63, // C4
	83 : 293.66,
	68 : 329.63,
	70 : 349.23,
	71 : 392.00,
	72 : 440.00,
	74 : 493.88,
	75 : 523.25 // C5
}


window.onload = function () { 

	var context = new AudioContext();
	var masterVolume = context.createGain();
	
	var oscillators = {};
	
	masterVolume.gain.value = 0.3;
	masterVolume.connect(context.destination);
	 
	$( "body" ).keydown(function () {
		var char = event.which || event.keyCode;
		console.log(event.key);
		
		if (event.key == 'z') {
			// Increase octave
			Object.keys(frequencies).forEach((x) => {
				frequencies[x] = frequencies[x] / 2;
			});
			return;
		} else if (event.key == 'x') {
			// Decrease octave
			Object.keys(frequencies).forEach((x) => {
				frequencies[x] = frequencies[x] * 2;
			});
			return;
		}
		
		
		$("#keyLabel").text(char);
		
		if (oscillators[char]) {
			return;
		}
		
		var osc = context.createOscillator();
		osc.type = 'sine';
		osc.connect(masterVolume);
		masterVolume.connect(context.destination);

		osc.frequency.value = frequencies[char]; 
		oscillators[char] = osc;
		
		osc.start(context.currentTime);
		
	});
	
	$( "body" ).keyup(function () {
		var char = event.which || event.keyCode;
		
		if (!oscillators[char]) {
			return;
		}
		
		oscillators[char].stop(context.currentTime);
		delete oscillators[char];
	});
	
	$("#noiseButton").click(function () {
		var osc = context.createOscillator();
		osc.type = 'sine';
		osc.connect(masterVolume);
		masterVolume.connect(context.destination);

		osc.frequency.value = 140.0; 
		
		osc.start(context.currentTime);
		osc.stop(context.currentTime + 1);
	});



}
