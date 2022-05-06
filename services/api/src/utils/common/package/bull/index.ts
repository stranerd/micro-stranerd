import Bull from 'bull'
import { Instance } from '../instance'
import { CronTypes } from './types'

enum JobNames {
	CronJob = 'CronJob',
	CronLikeJob = 'CronLikeJob',
	DelayedJob = 'DelayedJob'
}

type DelayedJobCallback<Event> = (data: Event) => Promise<void>
type CronCallback = (name: CronTypes) => Promise<void>
type CronLikeCallback<Event> = (data: Event) => Promise<void>

export class BullJob {
	private queue: Bull.Queue

	constructor () {
		this.queue = new Bull(Instance.getInstance().settings.bullQueueName, Instance.getInstance().settings.redisURI)
	}

	async addDelayedJob<Event> (data: Event, delayInMs: number): Promise<string> {
		const job = await this.queue.add(JobNames.DelayedJob, data, {
			delay: delayInMs,
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id.toString()
	}

	async addCronLikeJob<Event> (data: Event, cron: string): Promise<string> {
		const job = await this.queue.add(JobNames.CronLikeJob, data, {
			repeat: { cron },
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id.toString()
	}

	async removeDelayedJob (jobId: string | number) {
		const job = await this.queue.getJob(jobId)
		if (job) await job.discard()
	}

	async removeCronLikeJob (jobId: string | number, cron: string) {
		await this.queue.removeRepeatable({ cron, jobId }).catch()
	}

	async retryAllFailedJobs () {
		const failedJobs = await this.queue.getFailed()
		await Promise.all(failedJobs.map((job) => job.retry()))
	}

	async startProcessingQueues<DelayedJobEvent, CronLikeEvent> (crons: { name: CronTypes | string, cron: string }[], callbacks: { onDelayed?: DelayedJobCallback<DelayedJobEvent>, onCron?: CronCallback, onCronLike?: CronLikeCallback<CronLikeEvent> }) {
		await this.cleanup()
		await Promise.all(
			crons.map(({ cron, name }) => this.addCronJob(name, cron))
		)
		await Promise.all([
			this.queue.process(JobNames.DelayedJob, async (job) => await callbacks.onDelayed?.(job.data)),
			this.queue.process(JobNames.CronJob, async (job) => await callbacks.onCron?.(job.data.type as CronTypes)),
			this.queue.process(JobNames.CronLikeJob, async (job) => await callbacks.onCronLike?.(job.data))
		])
	}

	private async addCronJob (type: CronTypes | string, cron: string): Promise<string> {
		const job = await this.queue.add(JobNames.CronJob, { type }, {
			repeat: { cron },
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id.toString()
	}

	private async cleanup () {
		await this.retryAllFailedJobs()
		const repeatableJobs = await this.queue.getRepeatableJobs()
		await Promise.all(repeatableJobs
			.filter((job) => job.name === JobNames.CronJob)
			.map((job) => this.queue.removeRepeatableByKey(job.key)))
	}
}