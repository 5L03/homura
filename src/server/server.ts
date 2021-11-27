import { Express } from "express"
import { hlog } from "./common";
import { MusicRoom } from "./music_room"
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
			}))
		})
	})
}

export {
	setupApi
}
