import { appInstance, Events, EventTypes } from '@utils/app/types'
import { sendMailAndCatchError } from '@utils/modules/feedback/email'
import { UploaderUseCases } from '@modules/storage'
import { sendTextAndCatchError } from '@utils/modules/feedback/phone'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.SENDMAIL]: eventBus.createSubscriber<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.SENDTEXT]: eventBus.createSubscriber<Events[EventTypes.SENDTEXT]>(EventTypes.SENDTEXT, async (data) => {
		await sendTextAndCatchError(data)
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE, async (data) => {
		if (data?.path) await UploaderUseCases.delete(data.path)
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL),
	[EventTypes.SENDTEXT]: eventBus.createPublisher<Events[EventTypes.SENDTEXT]>(EventTypes.SENDTEXT),
	[EventTypes.DELETEFILE]: eventBus.createPublisher<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE)
}
