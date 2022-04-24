import { ConsoleLogger, Logger } from './logger'
import { BullJob } from './bull'
import { Cache } from './cache/cache'
import { RedisCache } from './cache/types/redis-cache'
import { EventBus } from './events/events'
import { mongoose, startAllChangeStreams } from './mongoose'

type Settings = {
	isDev: boolean
	accessTokenKey: string
	accessTokenTTL: number
	refreshTokenKey: string
	refreshTokenTTL: number
	mongoDbURI: string
	rabbitURI: string
	redisURI: string
	appId: string
	bullQueueName: string
	rabbitColumnName: string
	maxFileUploadSizeInMb: number
	useRateLimit: boolean
	rateLimitPeriodInMs: number
	rateLimit: number
	useSlowDown: boolean
	slowDownPeriodInMs: number
	slowDownAfter: number
	slowDownDelayInMs: number
	hashSaltRounds: number
}

const setting: Settings = {
	isDev: false,
	accessTokenKey: 'accessTokenKey',
	accessTokenTTL: 60 * 60,
	refreshTokenKey: 'refreshTokenKey',
	refreshTokenTTL: 14 * 24 * 60 * 60,
	mongoDbURI: '',
	rabbitURI: '',
	redisURI: '',
	appId: 'appId',
	bullQueueName: 'appTasksQueue',
	rabbitColumnName: 'appEventsColumn',
	maxFileUploadSizeInMb: 500,
	useRateLimit: false,
	rateLimitPeriodInMs: 60 * 60 * 1000,
	rateLimit: 2500,
	useSlowDown: false,
	slowDownPeriodInMs: 10 * 60 * 1000,
	slowDownAfter: 1000,
	slowDownDelayInMs: 500,
	hashSaltRounds: 10
}

export class Instance {
	private static hasInitialized = false
	private static instance: Instance
	private static setting: Settings = setting
	private log: Logger | null = null
	private bullJob: BullJob | null = null
	private cacher: Cache | null = null
	private event: EventBus | null = null

	private constructor () {
	}

	get logger () {
		if (!this.log) this.log = new ConsoleLogger()
		return this.log
	}

	get job () {
		if (!this.bullJob) this.bullJob = new BullJob()
		return this.bullJob
	}

	get cache () {
		if (!this.cacher) this.cacher = new RedisCache(this.settings.redisURI)
		return this.cacher
	}

	get eventBus () {
		if (!this.event) this.event = new EventBus()
		return this.event
	}

	get settings () {
		return Instance.setting
	}

	static initialize (settings: Partial<Settings>) {
		Object.entries(settings).forEach(([key, value]) => this.setting[key] = value)
		Instance.hasInitialized = true
	}

	static getInstance () {
		if (!this.hasInitialized) {
			// eslint-disable-next-line no-console
			console.error('Has not been initialized. Make sure initialize is called before you get an instance')
			process.exit(1)
		}
		if (!Instance.instance) Instance.instance = new Instance()
		return Instance.instance
	}

	async startDbConnection () {
		try {
			await mongoose.connect(this.settings.mongoDbURI)
			await startAllChangeStreams()
			process.on('exit', () => mongoose.disconnect())
		} catch (error) {
			await Instance.getInstance().logger.error('MongoDb failed with error:', error)
			process.exit(1)
		}
	}
}