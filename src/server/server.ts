import { Express } from "express"
import { MusicRoom } from "./music_room"

let Rooms = new Map<string, MusicRoom>()

function setupApi(app: Express) {
	// Join a room with its name. Returns errcode.
	// 0: OK.
	// 1: The nick name is already in use.
	app.post("/api/join", (req, res) => {
		const body: {
			name: string,
			nick: string,
		} = req.body
		
		const ret = {
			errcode: 0
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
}

export {
	setupApi
}
