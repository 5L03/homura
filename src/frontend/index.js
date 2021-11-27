const terminalElement = document.getElementById("terminal")
const term = new Terminal({cursorBlink: true})
const ps = "$ "
let input = ""
const commands = new Map()
let executing = false

// register all commands
commands.set("join", join)

// xterm handle keystroke
term.onData(async data => {
	if (executing) {
		return
	}
	for (let e of data) {
		switch(e) {
		case "\u0003":	// Ctrl+C
			term.writeln("^C")
			prompt()
			break
		case "\r":
		case "\n":
			term.writeln("")
			await runCommand(input)
			input = ""
			prompt()
			break
		case "\u007F":	// Backspace (DEL)
			if (input.length > 0) {
				input = input.substr(0, input.length - 1)
				if (term._core.buffer.x > 0) {
					term.write("\b \b")
				}
				else {
					term.write("\x1b[1F\x1b[" + term.cols + "C \b")
				}
			}
			break
		default:
			if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7B) || e >= "\u00a0") {
				input += e
				term.write(e)
			}
		}
	}
})
term.open(terminalElement)
prompt()

async function runCommand(cmd) {
	let argv = cmd.split(" ").filter(e => e.length > 0)
	if (argv.length == 0) {
		return
	}

	if (!commands.has(argv[0])) {
		term.writeln("Command not found.")
		return
	}
	executing = true
	let handler = commands.get(argv[0])
	await handler(term, argv)
	executing = false
}

function prompt() {
	term.write(ps)
}

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
