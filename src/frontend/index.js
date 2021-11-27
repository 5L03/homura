const terminalElement = document.getElementById("terminal")
const term = new Terminal({cursorBlink: true})

// xterm
term.onData(data => {
	console.log(data)
	term.write(data.replaceAll("\r", "\r\n"))
})
term.open(terminalElement)
term.write("> ")

// control button
function switchVisible() {
	if (terminalElement.style.visibility === "visible") {
		terminalElement.style.visibility = "hidden"
	}
	else {
		terminalElement.style.visibility = "visible"
	}
}

// APlayer
const ap = new APlayer({
	container: document.getElementById('player'),
	audio: [{
		name: 'name',
		artist: 'artist',
		url: 'url.mp3',
		cover: 'cover.jpg',
	}]
});
