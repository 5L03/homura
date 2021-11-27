function hlog(log: string) {
	console.log(insertTimestamp(log))
}

function hwarn(log: string) {
	console.warn(insertTimestamp(log))
}

function herror(log: string) {
	console.error(insertTimestamp(log))
}

function insertTimestamp(log: string): string {
	let now = new Date(Date.now())
	return `[${now.toISOString()}] ${log}`
}

export {
	hlog,
	hwarn,
	herror,
}
