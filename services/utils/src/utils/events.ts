import { appInstance, CronTypes, Events, EventTypes, TypedEmail } from '@utils/commons'
import { DeleteFile } from '@modules/storage'
import { GetAndDeleteAllErrors } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'
import { DeleteUserTokens } from '@modules/push'
import { sendNotification } from '@utils/modules/push'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.AUTHUSERDELETED]: eventBus.createSubscriber<Events[EventTypes.AUTHUSERDELETED]>(EventTypes.AUTHUSERDELETED, async (data) => {
		await DeleteUserTokens.execute(data.id)
	}),
	[EventTypes.PUSHNOTIFICATION]: eventBus.createSubscriber<Events[EventTypes.PUSHNOTIFICATION]>(EventTypes.PUSHNOTIFICATION, async (data) => {
		await sendNotification(data)
	}),
	[EventTypes.SENDMAIL]: eventBus.createSubscriber<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await appInstance.job.retryAllFailedJobs()
		if (data.type === CronTypes.hourly) {
			const errors = await GetAndDeleteAllErrors.execute()
			await Promise.all(
				errors.map(async (error) => {
					await sendMailAndCatchError(error as unknown as TypedEmail)
				})
			)
		}
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE, async (data) => {
		if (data?.path) await DeleteFile.call(data.path)
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED)
}