import express from "express"

if (process.env.NODE_ENV == "production") {
	console.warn("Launched as production env!!!!")
}

const app = express()

// Serve the single page website.
app.use("/", express.static("src/frontend"))

const PORT = 8000
app.listen(PORT, () => {
	console.log(`Homura listening at port ${PORT}`)
})
