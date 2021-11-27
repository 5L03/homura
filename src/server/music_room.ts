import { hlog } from "./common";
import { Listener } from "./listener"

class MusicRoom {
	private static readonly SyncInterval: number = 5

	readonly name: string
	private readonly listeners: Map<string, Listener>;
	private readonly operators: Set<string>

	constructor(name: string) {
		this.name = name
		this.listeners = new Map<string, Listener>()
		this.operators = new Set<string>()
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

	// JoinOperator adds a new operator with given nickname into this music room
	// if not exists.
	JoinOperator(nick: string): void {
		this.operators.add(nick)
		hlog(`<${nick}> joins <${this.name}> as operator.`)
	}
}

export {
	MusicRoom
}
