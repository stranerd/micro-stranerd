import { CronTypes, Email, EventBus, EventTypes, retryAllFailedJobs } from '@utils/commons'
import { DeleteFile } from '@modules/storage'
import { GetAndDeleteAllErrors } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.SENDMAIL]: eventBus.createSubscriber(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await retryAllFailedJobs()
		if (data.type === CronTypes.hourly) {
			const errors = await GetAndDeleteAllErrors.execute()
			await Promise.all(
				errors.map(async (error) => {
					await sendMailAndCatchError(error as unknown as Email)
				})
			)
		}
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber(EventTypes.DELETEFILE, async (data) => {
		await DeleteFile.call(data?.path ?? '')
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED),
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}