import { RedisCache } from './types/redis-cache'
import { Cache } from './cache'

let cache: Cache | null = null
export const getCacheInstance = () => {
	if (!cache) cache = new RedisCache()
	return cache
}