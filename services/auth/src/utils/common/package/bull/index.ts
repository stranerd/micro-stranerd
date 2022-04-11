import Bull from 'bull'
import { redisURI } from '../config'
import { CronCallback, CronTypes, DelayedJobCallback, JobNames } from './types'

export { CronTypes } from './types'

export const queue = new Bull('task-queues', redisURI)

export async function addDelayedJob<Event> (data: Event, delayInMs: number): Promise<string | number> {
	const job = await queue.add(JobNames.DelayedJob, data, {
		delay: delayInMs,
		removeOnComplete: true,
		backoff: 1000,
		attempts: 3
	})
	return job.id
}

const addCronJob = async (type: CronTypes, cron: string) => {
	const job = await queue.add(JobNames.CronJob, { type }, {
		repeat: { cron },
		removeOnComplete: true,
		backoff: 1000,
		attempts: 3
	})
	return job.id
}

export const removeDelayedJob = async (jobId: string | number) => {
	const job = await queue.getJob(jobId)
	if (job) await job.discard()
}

export const retryAllFailedJobs = async () => {
	const failedJobs = await queue.getFailed()
	await Promise.all(failedJobs.map((job) => job.retry()))
}

const cleanup = async () => {
	await retryAllFailedJobs()
	const repeatableJobs = await queue.getRepeatableJobs()
	await Promise.all(repeatableJobs.map((job) => queue.removeRepeatableByKey(job.key)))
}

export async function startProcessingQueues<DelayedJobEvent> (callbacks: { onDelayed: DelayedJobCallback<DelayedJobEvent>, onCron: CronCallback }) {
	await cleanup()
	const crons = [
		{ name: CronTypes.halfHourly, cron: '*/30 * * * *' },
		{ name: CronTypes.hourly, cron: '0 * * * *' },
		{ name: CronTypes.daily, cron: '0 0 * * *' },
		{ name: CronTypes.weekly, cron: '0 0 * * SUN' },
		{ name: CronTypes.monthly, cron: '0 0 1 * *' },
		{ name: CronTypes.quarterly, cron: '0 0 1 */3 *' },
		{ name: CronTypes.yearly, cron: '0 0 1 1 *' }
	]
	await Promise.all(
		crons.map(({ cron, name }) => addCronJob(name, cron))
	)
	await Promise.all([
		queue.process(JobNames.DelayedJob, async (job) => await callbacks.onDelayed(job.data)),
		queue.process(JobNames.CronJob, async (job) => await callbacks.onCron(job.data.type as CronTypes))
	])
}