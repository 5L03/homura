let nickname = ""
let roomname = ""

async function join(term, argv) {
	if (argv.length != 3) {
		term.writeln("usage: join <your_nickname> <room_name>")
		return
	}

	if (nickname !== "") {
		term.writeln("Client side detected: you are already in a room.")
		return
	}

	if (argv[1].includes("#wechat$")) {
		term.writeln("Invalid nickname.")
		return
	}

	let res
	try {
		res = await axios.post("/api/join", {
			nick: argv[1],
			name: argv[2],
		})
	}
	catch(e) {
		term.writeln(e.toString())
		return
	}

	res = res.data

	if (res.errcode !== 0) {
		term.writeln("Server side detected: you are already in a room.")
		return
	}

	nickname = argv[1]
	roomname = argv[2]
	term.writeln(`You, as <${argv[1]}>, join room <${argv[2]}>`)
}

function networkError(response) {
	return `Network error ${response.status}: ${response.statusText}`
}
