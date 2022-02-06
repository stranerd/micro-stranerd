import { CronTypes, Email, eventBus, EventTypes, retryAllFailedJobs } from '@utils/commons'
import { DeleteFile } from '@modules/storage'
import { GetAndDeleteAllErrors } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'
import { DeleteUserTokens } from '@modules/push'
import { sendNotification } from '@utils/modules/push'

export const subscribers = {
	[EventTypes.AUTHUSERDELETED]: eventBus.createSubscriber(EventTypes.AUTHUSERDELETED, async (data) => {
		await DeleteUserTokens.execute(data.id)
	}),
	[EventTypes.AUTHUSERSIGNOUT]: eventBus.createSubscriber(EventTypes.AUTHUSERSIGNOUT, async (data) => {
		await DeleteUserTokens.execute(data.id)
	}),
	[EventTypes.PUSHNOTIFICATION]: eventBus.createSubscriber(EventTypes.PUSHNOTIFICATION, async (data) => {
		await sendNotification(data)
	}),
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
		if (data?.path) await DeleteFile.call(data.path)
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED)
}