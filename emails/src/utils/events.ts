import { CronTypes, Email, EventBus, EventTypes } from '@utils/commons'
import { sendMailAndCatchError } from '@utils/email'
import { GetAndDeleteAllErrors } from '@modules/index'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.SENDMAIL]: eventBus.createSubscriber(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.hourly) {
			const errors = await GetAndDeleteAllErrors.execute()
			await Promise.all(
				errors.map(async (error) => {
					await sendMailAndCatchError(error as unknown as Email)
				})
			)
		}
	})
}

export const publishers = {}
