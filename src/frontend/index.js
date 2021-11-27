const terminalElement = document.getElementById("terminal")
terminalElement.style.visibility = "visible"
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
