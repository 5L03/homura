let nickname = ""
let roomname = ""
const songmidMap = new Map()

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

async function setc(term, argv) {
	if (argv.length != 2) {
		term.writeln("usage: setc <cookie>")
		return
	}

	let res
	try {
		res = await axios.post("/api/setCookie", {data: argv[1]})
	}
	catch(e) {
		term.writeln(e.toString())
		return
	}

	res = res.data
	if (res.errcode !== 0) {
		term.writeln("Server setCookie fail.")
		return
	}
}

async function srch(term, argv) {
	if (argv.length <= 1) {
		term.writeln("usage: srch <keyword1> <keyword2> ... <keyword n>")
		return
	}

	let res
	argv.shift()
	try {
		res = await axios.post("/api/search", {
			key: argv.join(" "),
		})
	}
	catch(e) {
		term.writeln(e.toString())
		return
	}

	res = res.data
	if (res.errcode !== 0) {
		term.writeln("Server search fail.")
		return
	}

	const list = res.list
	for (let i in list) {
		const song = list[i]
		term.write(`\x1b[38;5;3m${song.songmid} \x1b[38;5;51m${song.songname} `)
		const singers = song.singer
		let allSingers = ""
		for (let singer of singers) {
			allSingers += singer.name + ", "
		}
		allSingers = allSingers.substr(0, allSingers.length - 2)
		term.writeln(`\x1b[38;5;165m${allSingers} \x1b[38;5;226m${song.albumname}`)
		song.singer = allSingers
		songmidMap.set(song.songmid, song)
	}

	term.write("\x1b[0m")
}

async function adds(term, argv) {
	if (argv.length != 2) {
		term.writeln("usage: adds <songmid>")
		return
	}

	if (!songmidMap.has(argv[1])) {
		term.writeln("Please use 'srch' first.")
		return
	}
	const song = songmidMap.get(argv[1])
	console.log(song)

	let res
	try {
		res = await axios.post("/api/add", {
			nick: nickname,
			name: roomname,
			songname: song.songname,
			artist: song.singer,
			songmid: song.songmid,
			mediamid: song.strMediaMid,
		})
	}
	catch(e) {
		term.writeln(e.toString())
		return
	}

	res = res.data
	if (res.errcode !== 0) {
		term.writeln(`Server return errcode ${res.errcode}`)
		return
	}
}

function networkError(response) {
	return `Network error ${response.status}: ${response.statusText}`
}
