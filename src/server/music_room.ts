import { hlog } from "./common";
import { Listener } from "./listener"

type Music = {
	name: string,
	artist: string,
	url: string,
	cover: string,
	lrc: string,
}

class MusicRoom {
	private static readonly SyncInterval: number = 5

	readonly name: string
	private readonly listeners: Map<string, Listener>
	private readonly operators: Set<string>
	private readonly playlist: Map<string, Music>

	constructor(name: string) {
		this.name = name
		this.listeners = new Map<string, Listener>()
		this.operators = new Set<string>()
		this.playlist = new Map<string, Music>()
	}

	// JoinListener adds a new listener with given nickname into this music room.
	// If the nickname is already in use, it will return false. Otherwise true.
	JoinListener(nick: string): boolean {
		if (this.listeners.has(nick)) {
			hlog(`Repeated nickname <${nick}> wants to join <${this.name}> as listener.`)
			return false
		}

		this.listeners.set(nick, new Listener(nick))
		hlog(`<${nick}> joins <${this.name}> as listener.`)
		return true
	}

	// LeaveListener makes a listener leave this music room.
	LeaveListener(nick: string) {
		this.listeners.delete(nick)
		hlog(`Listener <${nick}> leaves <${this.name}>.`)
	}

	// JoinOperator adds a new operator with given nickname into this music room
	// if not exists.
	JoinOperator(nick: string): void {
		this.operators.add(nick)
		hlog(`<${nick}> joins <${this.name}> as operator.`)
	}

	// LeaveOperator makes an operator leave this music room.
	LeaveOperator(nick: string) {
		this.listeners.delete(nick)
		hlog(`Operator <${nick}> leaves <${this.name}>.`)
	}

	// IsOperator checks where a given nickname is operator or not.
	IsOperator(nick: string): boolean {
		return this.operators.has(nick)
	}

	// CheckSong checks if the given song has already been in the playlist.
	CheckSong(songmid: string): boolean {
		return this.playlist.has(songmid)
	}

	// AddSong adds a possibly new song to the playlist.
	AddSong(songmid: string, song: Music): void {
		this.playlist.set(songmid, song)
	}
}

export {
	MusicRoom,
	Music,
}
