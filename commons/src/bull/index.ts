import Bull from 'bull'
import { redisURI } from '../config'
import { CronTypes } from '../events/types/tasks'

export const queue = new Bull('task-queues', { redis: redisURI })

export const addDelayedJob = async (type: string, data: any, delay: number): Promise<string | number> => {
	const job = await queue.add('delayedJobs', { type, data }, {
		delay,
		removeOnComplete: true,
		backoff: 1000,
		attempts: 3
	})
	return job.id
}

const addCronJob = async (type: CronTypes, cron: string) => {
	await queue.add('cronJobs', type, {
		repeat: { cron },
		removeOnComplete: true,
		backoff: 1000,
		attempts: 3
	})
}

export const removeDelayedJob = async (jobId: string | number) => {
	const job = await queue.getJob(jobId)
	if (job) await job.discard()
}

const cleanup = async () => {
	const failedJobs = await queue.getFailed()
	await Promise.all(failedJobs.map((job) => job.retry()))
	const repeatableJos = await queue.getRepeatableJobs()
	await Promise.all(repeatableJos.map((job) => queue.removeRepeatableByKey(job.key)))
}

type DelayedJobCallback = (data: Record<string, any>) => Promise<void>
type CronCallback = (name: CronTypes) => Promise<void>

export const startProcessingQueues = async (callbacks: { onDelayed: DelayedJobCallback, onCron: CronCallback }) => {
	await cleanup()
	const crons = [
		{ name: CronTypes.hourly, cron: '0 * * * *' },
		{ name: CronTypes.daily, cron: '0 0 * * *' },
		{ name: CronTypes.weekly, cron: '0 0 * * SUN' },
		{ name: CronTypes.monthly, cron: '0 0 1 * *' },
		{ name: CronTypes.yearly, cron: '0 0 1 1 *' }
	]
	await Promise.all(
		crons.map(({ cron, name }) => addCronJob(name, cron))
	)
	await queue.process(async (job) => {
		job.name === 'cronJobs' ?
			await callbacks.onCron(job.data as CronTypes) :
			await callbacks.onDelayed(job.data)
	})
}