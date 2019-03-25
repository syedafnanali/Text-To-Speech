// INIT SPEECH API
const synth = window.speechSynthesis;
// DOM ELEMENTS
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// INIT VOICES ARRAY
let voices = [];

const getVoices = () => {
	voices = synth.getVoices();

	voices.forEach((voice) => {
		// Create an element for options
		const option = document.createElement('option');
		// Fill option with voice and language
		option.textContent = voice.name + '(' + voice.lang + ')';
		// Set option attribues
		option.setAttribute('data-lang', voice.lang);
		option.setAttribute('data-name', voice.name);
		// Append options to Select
		voiceSelect.appendChild(option);
	});
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
	synth.onvoiceschanged = getVoices;
}

const speak = () => {
	// BACKGROUND ANIMATION
	body.style.background = ' #141414 url(./img/wave.gif)';
	body.style.backgroundRepeat = 'repeat-x';
	body.style.backgroundSize = '100% 100%';

	if (synth.speaking) {
		console.error('Already speaking ');
		return;
	}
	if (textInput.value !== '') {
		// Get speech text
		const speakText = new SpeechSynthesisUtterance(textInput.value);

		speakText.onend = (e) => {
			body.style.background = 'black';
		};

		speakText.onerror = (e) => {
			console.error('something went wrong');
		};

		const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

		voices.forEach((voice) => {
			if (voice.name === selectedVoice) {
				speakText.voice = voice;
			}
		});

		speakText.rate = rate.value;
		speakText.pitch = pitch.value;
		synth.speak(speakText);
	}
};

// EVENT LISTENERS
textForm.addEventListener('submit', (e) => {
	e.preventDefault();
	speak();
	textInput.blur();
});

// RATE VALUE CHANGE
rate.addEventListener('change', (e) => (rateValue.textContent = rate.value));
pitch.addEventListener('change', (e) => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener('change', (e) => speak());
