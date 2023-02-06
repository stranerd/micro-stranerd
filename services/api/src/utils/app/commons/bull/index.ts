import Bull from 'bull'
import { Instance } from '../instance'
import { CronTypes, CronLikeJobEvent, DelayedJobEvent } from './types'
import { Random } from '../utils/utils'

enum JobNames {
	CronJob = 'CronJob',
	CronLikeJob = 'CronLikeJob',
	DelayedJob = 'DelayedJob'
}

type DelayedJobCallback = (data: DelayedJobEvent) => Promise<void>
type CronCallback = (name: CronTypes) => Promise<void>
type CronLikeCallback = (data: CronLikeJobEvent) => Promise<void>

export class BullJob {
	private queue: Bull.Queue

	constructor () {
		this.queue = new Bull(Instance.getInstance().settings.bullQueueName, Instance.getInstance().settings.redisURI)
	}

	private static getNewId () {
		return [Date.now(), Random.string()].join(':')
	}

	async addDelayedJob (data: DelayedJobEvent, delayInMs: number): Promise<string> {
		const job = await this.queue.add(JobNames.DelayedJob, data, {
			jobId: BullJob.getNewId(),
			delay: delayInMs,
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id.toString()
	}

	async addCronLikeJob (data: CronLikeJobEvent, cron: string, tz?: string): Promise<string> {
		const job = await this.queue.add(JobNames.CronLikeJob, data, {
			jobId: BullJob.getNewId(),
			repeat: { cron, ...(tz ? { tz } : {}) },
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return (job.opts?.repeat as any)?.key ?? ''
	}

	async removeDelayedJob (jobId: string) {
		const job = await this.queue.getJob(jobId)
		if (job) await job.discard()
	}

	async removeCronLikeJob (jobKey: string) {
		await this.queue.removeRepeatableByKey(jobKey)
	}

	async retryAllFailedJobs () {
		const failedJobs = await this.queue.getFailed()
		await Promise.all(failedJobs.map((job) => job.retry()))
	}

	async startProcessingQueues (crons: { name: CronTypes | string, cron: string }[],
		callbacks: { onDelayed?: DelayedJobCallback, onCron?: CronCallback, onCronLike?: CronLikeCallback }) {
		await this.cleanup()
		await Promise.all(
			crons.map(({ cron, name }) => this.addCronJob(name, cron))
		)
		await Promise.all([
			this.queue.process(JobNames.DelayedJob, async (job) => await (callbacks.onDelayed as any)?.(job.data)),
			this.queue.process(JobNames.CronJob, async (job) => await (callbacks.onCron as any)?.(job.data.type)),
			this.queue.process(JobNames.CronLikeJob, async (job) => await (callbacks.onCronLike as any)?.(job.data))
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