import Redis from 'redis'
import { Cache } from '../cache'
import { redisURI } from '../../config'
import { Logger } from '../../logger'

export class RedisCache extends Cache {
	client: Redis.RedisClient

	constructor () {
		super()
		this.client = Redis.createClient(redisURI)
		this.client.on('error', async function (error) {
			await Logger.error('Redis failed with error:', error)
			process.exit(1)
		})
	}

	async delete (key: string) {
		return new Promise((res: (_: void) => void, rej) => {
			this.client.del(key, (err, val) => {
				if (err) rej(err)
				res()
			})
		})
	}

	async get (key: string) {
		return new Promise((res: (_: string | null) => void, rej) => {
			this.client.get(key, (err, val) => {
				if (err) res(null)
				res(val)
			})
		})
	}

	async set (key: string, data: string, ttlInSecs: number) {
		return new Promise((res: (_: void) => void, rej) => {
			this.client.setex(key, ttlInSecs, data, (err) => {
				if (err) rej(err)
				res()
			})
		})
	}
}