import { startServer } from './application/app'

const port = parseInt(process.env.PORT || '5000')

startServer(port)