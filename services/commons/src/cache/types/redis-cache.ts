import { createClient } from 'redis'
import { Cache } from '../cache'
import { Instance } from '../../instance'
import { addWaitBeforeExit } from '../../exit'

export class RedisCache extends Cache {
	client: ReturnType<typeof createClient>

	constructor (connection: string) {
		super()
		this.client = createClient({ url: connection })
		this.client.on('error', async (error) => {
			await Instance.getInstance().logger.error('Redis failed with error:', error)
			process.exit(1)
		})
		addWaitBeforeExit(() => this.client.quit())
	}

	async connect () {
		await this.client.connect()
	}

	async delete (key: string) {
		await this.client.del(key)
	}

	async get (key: string) {
		return await this.client.get(key)
	}

	async set (key: string, data: string, ttlInSecs: number) {
		if (ttlInSecs > 0) await this.client.setEx(key, ttlInSecs, data)
		else this.client.set(key, data)
	}

	async setInTransaction (key: string, data: string, ttlInSecs: number) {
		return await this.client.multi()
			.get(key)
			.setEx(key, ttlInSecs, data)
			.exec() as [string, string]
	}
}