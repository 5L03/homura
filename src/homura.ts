import express from "express"
import { setupApi } from "./server/server"
import bodyParser from "body-parser"

if (process.env.NODE_ENV == "production") {
	console.warn("Launched as production env!!!!")
}

const app = express()
app.use(bodyParser.json())

// Serve the single page website.
app.use("/", express.static("src/frontend"))

// Provide APIs.
setupApi(app)

const PORT = 8000
app.listen(PORT, () => {
	console.log(`Homura listening at port ${PORT}`)
})
