//Setting initial title of the
const titleSpace = document.querySelector(".title");
if (titleSpace.textContent == "") {
	titleSpace.textContent = new Date().toUTCString();
}
//Getting the textArea
const textArea = document.querySelector(".textarea");

window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.addEventListener("result", (e) => {
	console.log(e.results[0][0].transcript);
	const transcript = Array.from(e.results)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join("");

	if (e.results[0].isFinal) {
		textArea.textContent += transcript + " ";
	}
});

function keepListening() {
	recognition.start();
}

const startButton = document.querySelector(".start");

let on = true;

startButton.addEventListener("click", () => {
	if (on) {
		recognition.start();
		recognition.addEventListener("end", keepListening);
		on = false;
		startButton.classList.remove("start");
		startButton.classList.add("stop");
	} else if (!on) {
		recognition.removeEventListener("end", keepListening);
		recognition.stop();
		on = true;
		startButton.classList.remove("stop");
		startButton.classList.add("start");
	}
});
