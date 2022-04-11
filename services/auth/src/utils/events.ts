import { appInstance, CronTypes, Events, EventTypes } from '@utils/commons'
import { deleteUnverifiedUsers } from '@utils/modules/emails'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.TASKSCRON]: eventBus.createSubscriber<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON, async ({ type }) => {
		if (type === CronTypes.daily) await deleteUnverifiedUsers()
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE),
	[EventTypes.AUTHUSERCREATED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERCREATED]>(EventTypes.AUTHUSERCREATED),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERUPDATED]>(EventTypes.AUTHUSERUPDATED),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createPublisher<Events[EventTypes.AUTHROLESUPDATED]>(EventTypes.AUTHROLESUPDATED),
	[EventTypes.AUTHUSERDELETED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERDELETED]>(EventTypes.AUTHUSERDELETED),
	[EventTypes.AUTHNEWREFERRAL]: eventBus.createPublisher<Events[EventTypes.AUTHNEWREFERRAL]>(EventTypes.AUTHNEWREFERRAL)
}