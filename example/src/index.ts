import { getNewExpressInstance } from './commons'
import { routes } from './application/routes/'

const app = getNewExpressInstance(routes)
const port = parseInt(process.env.PORT || '5000')

app.startServer(port).then(() => {})
