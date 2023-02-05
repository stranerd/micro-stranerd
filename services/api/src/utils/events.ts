import { appInstance } from '@utils/app/types'
import { EventTypes, Events } from '@utils/app/package'
import { sendMailAndCatchError } from '@utils/modules/feedback/email'
import { UploaderUseCases } from '@modules/storage'
import { sendTextAndCatchError } from '@utils/modules/feedback/phone'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.SENDMAIL]: eventBus.createSubscriber<Events['SENDMAIL']>(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.SENDTEXT]: eventBus.createSubscriber<Events['SENDTEXT']>(EventTypes.SENDTEXT, async (data) => {
		await sendTextAndCatchError(data)
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber<Events['DELETEFILE']>(EventTypes.DELETEFILE, async (data) => {
		if (data?.path) await UploaderUseCases.delete(data.path)
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher<Events['SENDMAIL']>(EventTypes.SENDMAIL),
	[EventTypes.SENDTEXT]: eventBus.createPublisher<Events['SENDTEXT']>(EventTypes.SENDTEXT),
	[EventTypes.DELETEFILE]: eventBus.createPublisher<Events['DELETEFILE']>(EventTypes.DELETEFILE)
}
