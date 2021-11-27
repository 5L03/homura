import express from "express"

console.log("Hello world!")
if (process.env.NODE_ENV == "production") {
	console.log("production!")
}
else {
	console.log("debug")
}

const app = express()

app.get("/", (req, res) => {
	res.send("Hello from Homura!")
})

const PORT = 8000
app.listen(PORT, () => {
	console.log(`Homura listening at port ${PORT}`)
})
