import { EventBus, EventTypes, Logger } from '@utils/commons'
import { CreateUserWithBio, UpdateUserWithBio } from '../modules/users'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.AUTHUSERCREATED]: eventBus.createSubscriber(EventTypes.AUTHUSERCREATED, async (data) => {
		await CreateUserWithBio.execute({ id: data.id, data: data.data })
	}),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createSubscriber(EventTypes.AUTHUSERUPDATED, async (data) => {
		await UpdateUserWithBio.execute({ id: data.id, data: data.data })
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher(EventTypes.SENDMAIL)
}
