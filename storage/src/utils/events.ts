import { EventBus, EventTypes } from '@utils/commons'
import { DeleteFile } from '@modules/index'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.DELETEFILE]: eventBus.createSubscriber(EventTypes.DELETEFILE, async (data) => {
		await DeleteFile.call(data?.path ?? '')
	})
}

export const publishers = {}
