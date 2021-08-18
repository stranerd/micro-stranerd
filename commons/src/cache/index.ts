import { RedisCache } from './types/redis-cache'
import { Cache } from './cache'

export const getCacheInstance: Cache = new RedisCache()