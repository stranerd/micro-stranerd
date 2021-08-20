import { EventBus, EventTypes, Logger } from '@utils/commons'
import { sendMailAndCatchError } from '@utils/email'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.SENDMAIL]: eventBus.createSubscriber(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	})
}

export const publishers = {}
