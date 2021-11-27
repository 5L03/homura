import { Express } from "express"
import { hlog } from "./common";
import { MusicRoom, Music } from "./music_room"
const qqMusic = require('qq-music-api');

let Rooms = new Map<string, MusicRoom>()

function setupApi(app: Express) {
	// Join a room with its name. Returns errcode.
	// 0: OK.
	// 1: The nick name is already in use.
	// 2: Invalid format.
	app.post("/api/join", (req, res) => {
		const body: {
			name: string,
			nick: string,
		} = req.body
		
		const ret = {
			errcode: 0
		}

		// Check format
		if (!(body.name && body.nick)) {
			ret.errcode = 2
			res.send(ret)
			return
		}

		// Create a new room if not exists.
		if (!Rooms.has(body.name)) {
			Rooms.set(body.name, new MusicRoom(body.name))
		}
		
		const room = Rooms.get(body.name)!
		if (!room.JoinListener(body.nick)) {
			ret.errcode = 1
			res.send(ret)
			return
		}
		room.JoinOperator(body.nick)
		res.send(ret)
	})

	// Set QQMusic cookie. Returns errcode.
	// 0: OK.
	// 1: Invalid format.
	app.post("/api/setCookie", (req, res) => {
		const cookie: string = req.body.data
		if (!cookie) {
			res.send({errcode: 1})
			return
		}

		qqMusic.setCookie(cookie)
		hlog("Server cookie set.")
		res.send({errcode: 0})
	})

	// Search keywords of music. Return at most 10 records. Returns errcode.
	// 0: OK.
	// 1: Invalid format.
	app.post("/api/search", async (req, res) => {
		const keyword: string = req.body.key
		if (!keyword) {
			res.send({errcode: 1})
			return
		}
		hlog(`searches <${keyword}>`)
		const response = await qqMusic.api("search", {key: keyword, pageSize: 10})
		const list: any[] = response.data.list
		res.send({
			errcode: 0,
			list: list.map(e => ({
				albummid: e.albummid,
				albumname: e.albumname,
				singer: e.singer.map((s:{mid: string, name: string}) => ({mid: s.mid, name: s.name})),
				songmid: e.songmid,
				songname: e.songname,
				strMediaMid: e.strMediaMid,
			}))
		})
	})

	// Add a song.
	// 0: OK.
	// 1: Invalid format.
	// 2: Room not exists.
	// 3: Not operator.
	// 4: Song already exists in this room.
	app.post("/api/add", async (req, res) => {
		const body: {
			nick: string,
			name: string,
			songname: string,
			artist: string,
			songmid: string,
			mediamid: string,
		} = req.body

		if (!body.nick || !body.name || !body.songname || !body.artist || !body.songmid || !body.mediamid) {
			res.send({errcode: 1})
			return
		}

		if (!Rooms.has(body.name)) {
			res.send({errcode: 2})
			return
		}

		const room = Rooms.get(body.name)!
		if (!room.IsOperator(body.nick)) {
			res.send({errcode: 3})
			return
		}

		if (room.CheckSong(body.songmid)) {
			res.send({errcode: 4})
			return
		}

		const requests = [
			qqMusic.api("song/url", {id: body.songmid, mediaId: body.mediamid}),
			qqMusic.api("lyric", {songmid: body.songmid}),
		]
		let responses
		try {
			responses = await Promise.all(requests)
		}
		catch(e) {
			console.error(e)
			return
		}

		const music: Music = {
			name: body.songname,
			artist: body.artist,
			url: responses[0].data,
			cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${body.songmid}.jpg`,
			lyric: responses[1].data.lyric,
		}
		room.AddSong(body.songmid, music)

		res.send({errcode: 0})
	})
}

export {
	setupApi
}
