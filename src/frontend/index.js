const terminalElement = document.getElementById("terminal")
terminalElement.style.visibility = "visible"
const term = new Terminal({cursorBlink: true})
const ps = "$ "
let input = ""
const commands = new Map()
let executing = false
let currentInteruptResolver = null

// register all commands
commands.set("join", join)
commands.set("setc", setc)
commands.set("srch", srch)
commands.set("adds", adds)

// xterm handle keystroke
term.onData(async data => {
	if (executing) {
		if (data == "\u0003") {
			sendInteruptSignal()
		}
		return
	}
	for (let e of data) {
		switch(e) {
		case "\u0003":	// Ctrl+C
			term.writeln("^C")
			input = ""
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
	const argv = splitCmd(cmd)
	if (!argv) {
		term.writeln("Invalid syntax")
		return
	}
	console.log(argv)
	if (argv.length == 0) {
		return
	}

	if (!commands.has(argv[0])) {
		term.writeln("Command not found.")
		return
	}
	beginExecute()
	const handler = commands.get(argv[0])
	const interuptPromise = new Promise((resolve, reject) => {
		currentInteruptResolver = resolve
	})
	const res = await Promise.race([handler(term, argv), interuptPromise])
	if (res === "interupt") {
		term.writeln("Command interupted.")
	}
	else {
		currentInteruptResolver()
	}
	endExecute()
}

function prompt() {
	term.write(ps)
}

function beginExecute() {
	executing = true
	term.setOption("cursorBlink", false)
}

function endExecute() {
	term.setOption("cursorBlink", true)
	executing = false
}

function sendInteruptSignal() {
	currentInteruptResolver("interupt")
}

function splitCmd(cmd) {
	let ret = []
	let spaceCmd = cmd + " "
	let acc = ""
	let state = 0
	for (let c of spaceCmd) {
		switch (state) {
		case 0:
			if (c === "'") {
				state = 2
			}
			else if (c !== " ") {
				state = 1
				acc = c
			}
			break
		case 1:
			if (c === " ") {
				ret.push(acc)
				state = 0
				acc = ""
			}
			else {
				acc += c
			}
			break
		case 2:
			if (c === "'") {
				ret.push(acc)
				state = 0
				acc = ""
			}
			else {
				acc += c
			}
			break
		}
	}

	if (state == 2) {
		return null
	}
	return ret
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

// socket.io
const socket = io()
socket.on("add", msg => {
	console.log("add received!!!")
	console.log(msg)
})
