import { getNewServerInstance } from './commons'
import { routes } from './application/routes'

const app = getNewServerInstance('/api/example', routes)
const port = parseInt(process.env.PORT || '5000')

app.start(port).then(() => {})
