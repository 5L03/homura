import express from "express"
import { setupServer } from "./server/server"
import { createServer } from "http"
import bodyParser from "body-parser"
import { Server } from "socket.io"

if (process.env.NODE_ENV == "production") {
	console.warn("Launched as production env!!!!")
}

const app = express()
const httpServer = createServer(app)
app.use(bodyParser.json())
const io = new Server(httpServer)

// Serve the single page website.
app.use("/", express.static("src/frontend"))

// Provide APIs.
setupServer(app, io)

const PORT = 8000
httpServer.listen(PORT, () => {
	console.log(`Homura listening at port ${PORT}`)
})
