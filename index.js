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

//Copy text to Clipboard
const copyTextButton = document.querySelector(".copy");
copyTextButton.addEventListener("click", copyText);

function copyText() {
	const storage = document.createElement("textarea");
	storage.value = textArea.textContent;
	textArea.appendChild(storage);
	storage.select();
	storage.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(storage.value);
	textArea.removeChild(storage);
}

//Download Modal Stuff
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let downloadButton = document.querySelector(".download-file");

// Get the <span> element that closes the modal
let span = document.querySelector(".close span");

// When the user clicks on the button, open the modal
downloadButton.onclick = () => {
	modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

const downloadAsTxtButton = document.querySelector(".as-txt");

downloadAsTxtButton.addEventListener("click", () => {
	downloadAsTextFile(titleSpace.textContent, textArea.textContent);
	modal.style.display = "none";
});

function downloadAsTextFile(title, content) {
	const filename = `${title}.txt`;
	const noteText = `${title}\n\n${content}`;
	const blob = new Blob([noteText], { type: "text/plain" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;

	a.style.display = "none";
	document.body.appendChild(a);

	a.click();

	URL.revokeObjectURL(url);
	document.body.removeChild(a);
}

const downloadAsDocxButton = document.querySelector(".as-docx");

downloadAsDocxButton.addEventListener("click", () => {
	downloadAsDocxFile(titleSpace.textContent, textArea.textContent);
	modal.style.display = "none";
});

function downloadAsDocxFile(title, content) {
	const doc = new docx.Document({
		sections: [
			{
				properties: {},
				children: [
					new docx.Paragraph({
						children: [
							new docx.TextRun({
								text: title,
								bold: true,
							}),
							new docx.TextRun({
								break: 1,
							}),

							new docx.TextRun({
								text: content,
							}),
						],
					}),
				],
			},
		],
	});

	docx.Packer.toBlob(doc).then((blob) => {
		saveAs(blob, `${title}.docx`);
	});
}

const featuresContainer = document.querySelector(".features");
const newFile = featuresContainer.querySelector(".new-file");
const folder = featuresContainer.querySelector(".my-files");
const saveButton = featuresContainer.querySelector(".save");
const zoomInButton = featuresContainer.querySelector(".zoom-in");
const zoomOutButton = featuresContainer.querySelector(".zoom-out");

//Features for increasing and decrasing font size
let fontSizePixels = 22;
zoomInButton.addEventListener("click", () => {
	if (fontSizePixels < 46) {
		fontSizePixels += 2;
	}
	textArea.style.fontSize = `${fontSizePixels}px`;
});

zoomOutButton.addEventListener("click", () => {
	if (fontSizePixels > 12) {
		fontSizePixels -= 2;
	}
	textArea.style.fontSize = `${fontSizePixels}px`;
});
