import { EventBus, EventTypes, Logger } from '@utils/commons'
import { CreateUserWithBio, MarkUserAsDeleted, UpdateUserWithBio, UpdateUserWithRoles } from '../modules/users'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.AUTHUSERCREATED]: eventBus.createSubscriber(EventTypes.AUTHUSERCREATED, async (data) => {
		await CreateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createSubscriber(EventTypes.AUTHUSERUPDATED, async (data) => {
		await UpdateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createSubscriber(EventTypes.AUTHROLESUPDATED, async (data) => {
		await UpdateUserWithRoles.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERDELETED]: eventBus.createSubscriber(EventTypes.AUTHUSERDELETED, async (data) => {
		await MarkUserAsDeleted.execute({ id: data.id, timestamp: data.timestamp })
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher(EventTypes.SENDMAIL),
	[EventTypes.STRANERDUSERBIOUPDATED]: eventBus.createPublisher(EventTypes.STRANERDUSERBIOUPDATED)
}
