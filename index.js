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

//Download Modal Stuff
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let downloadButton = document.querySelector(".download-file");

// Get the <span> element that closes the modal
let span = document.querySelector(".close span");

// When the user clicks on the button, open the modal
downloadButton.onclick = function () {
	modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
