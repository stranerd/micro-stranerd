import { CronTypes, EventBus, EventTypes } from '@utils/commons'
import { deleteUnverifiedUsers } from '@utils/modules/emails'

const eventBus = new EventBus()

export const subscribers = {
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
	[EventTypes.AUTHUSERDELETED]: eventBus.createPublisher(EventTypes.AUTHUSERDELETED),
	[EventTypes.AUTHNEWREFERRAL]: eventBus.createPublisher(EventTypes.AUTHNEWREFERRAL)
}