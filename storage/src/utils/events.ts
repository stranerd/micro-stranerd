import { EventBus, EventTypes, Logger } from '@utils/commons'
import { DeleteFile } from '@modules/domain'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber(EventTypes.DELETEFILE, async (data) => {
		await DeleteFile.call(data.path)
	})
}

export const publishers = {}
