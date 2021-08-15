import express from 'express'

const app = express()

export const startServer = (port: number) => {
	app.listen(port, () => {
		console.log(`Example app listening at port ${port}`)
	})
}