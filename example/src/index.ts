import { getNewServerInstance } from './commons'
import { routes } from './application/routes'
import { subscribers } from './utils/events'

const app = getNewServerInstance('/api/example', routes)
const port = parseInt(process.env.PORT || '5000')

app.start(port).then(async () => {
	Object.values(subscribers)
		.map(async (subscriber) => {
			await subscriber.subscribe()
		})
})
