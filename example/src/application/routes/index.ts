import Express from 'express'
import { makeController } from '@stranerd/api-commons'

const router = Express.Router()

const con = makeController({
	path: '/',
	method: 'get',
	cb: async () => {
		return {
			status: 200,
			result: { hello: 'Hello World' }
		}
	}
})

router[con.method]?.(con.path, con.controller)