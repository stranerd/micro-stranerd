import { EventBus, EventTypes, Logger } from '@utils/commons'
import { CronTypes } from '@stranerd/api-commons'
import { deleteUnverifiedUsers } from '@utils/modules/emails'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async ({ type }) => {
		if (type === CronTypes.daily) await deleteUnverifiedUsers()
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher(EventTypes.DELETEFILE),
	[EventTypes.AUTHUSERCREATED]: eventBus.createPublisher(EventTypes.AUTHUSERCREATED),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createPublisher(EventTypes.AUTHUSERUPDATED),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createPublisher(EventTypes.AUTHROLESUPDATED),
	[EventTypes.AUTHUSERDELETED]: eventBus.createPublisher(EventTypes.AUTHUSERDELETED)
}