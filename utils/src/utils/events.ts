import { CronTypes, EventBus, EventTypes, retryAllFailedJobs } from '@utils/commons'
import { DeleteFile } from '@modules/storage'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await retryAllFailedJobs()
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber(EventTypes.DELETEFILE, async (data) => {
		await DeleteFile.call(data?.path ?? '')
	})

}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED),
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}