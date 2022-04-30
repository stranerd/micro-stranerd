import Bull from 'bull'
import { Instance } from '../instance'
import { CronTypes } from './types'

enum JobNames {
	CronJob = 'CronJob',
	DelayedJob = 'DelayedJob'
}

type DelayedJobCallback<Event> = (data: Event) => Promise<void>
type CronCallback = (name: CronTypes) => Promise<void>

export class BullJob {
	private queue: Bull.Queue

	constructor () {
		this.queue = new Bull(Instance.getInstance().settings.bullQueueName, Instance.getInstance().settings.redisURI)
	}

	async addDelayedJob<Event> (data: Event, delayInMs: number): Promise<string | number> {
		const job = await this.queue.add(JobNames.DelayedJob, data, {
			delay: delayInMs,
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id
	}

	async removeDelayedJob (jobId: string | number) {
		const job = await this.queue.getJob(jobId)
		if (job) await job.discard()
	}

	async retryAllFailedJobs () {
		const failedJobs = await this.queue.getFailed()
		await Promise.all(failedJobs.map((job) => job.retry()))
	}

	async startProcessingQueues<DelayedJobEvent> (crons: { name: CronTypes | string, cron: string }[], callbacks: { onDelayed: DelayedJobCallback<DelayedJobEvent>, onCron: CronCallback }) {
		await this.cleanup()
		await Promise.all(
			crons.map(({ cron, name }) => this.addCronJob(name, cron))
		)
		await Promise.all([
			this.queue.process(JobNames.DelayedJob, async (job) => await callbacks.onDelayed(job.data)),
			this.queue.process(JobNames.CronJob, async (job) => await callbacks.onCron(job.data.type as CronTypes))
		])
	}

	private async addCronJob (type: CronTypes | string, cron: string) {
		const job = await this.queue.add(JobNames.CronJob, { type }, {
			repeat: { cron },
			removeOnComplete: true,
			backoff: 1000,
			attempts: 3
		})
		return job.id
	}

	private async cleanup () {
		await this.retryAllFailedJobs()
		const repeatableJobs = await this.queue.getRepeatableJobs()
		await Promise.all(repeatableJobs.map((job) => this.queue.removeRepeatableByKey(job.key)))
	}
}