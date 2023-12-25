//Getting titleSpace
const titleSpace = document.querySelector(".title");
//Setting titleSpace
if (titleSpace.textContent == "") {
	titleSpace.textContent = new Date().toUTCString();
}
//Getting the textArea
const textArea = document.querySelector(".textarea");

// Get start button
const startButton = document.querySelector(".start");

//element to take in transcribed text
let spokenWords = document.createElement("span");
textArea.appendChild(spokenWords);

// For switching mic on/off
let on = false;

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

function doYourThing(e) {
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	if (textArea.textContent !== "") {
		spokenWords.textContent = ` ${transcript} `;
	} else {
		spokenWords.textContent = `${transcript} `;
	}

	if (e.results[0].isFinal) {
		spokenWords = document.createElement("span");
		textArea.appendChild(spokenWords);
	}
}

function keepListening() {
	recognition.start();
}

function startRecognition() {
	recognition.addEventListener("result", doYourThing);
	recognition.start();
	recognition.addEventListener("end", keepListening);
	on = true;
	startButton.classList.remove("start");
	startButton.classList.add("stop");
}

function stopRecognition() {
	recognition.removeEventListener("result", doYourThing);
	recognition.removeEventListener("end", keepListening);
	recognition.stop();
	on = false;
	startButton.classList.remove("stop");
	startButton.classList.add("start");
}

// toggle on and off switch
startButton.addEventListener("click", () => {
	if (!on) {
		startRecognition();
	} else {
		stopRecognition();
	}
});
