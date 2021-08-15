const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/api/test', (_, res) => {
	res.json({ message: 'Hello World! Haha' })
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})