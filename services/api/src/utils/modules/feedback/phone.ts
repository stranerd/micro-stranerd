import axios from 'axios'
import { isDev, termiiAPIKey } from '@utils/environment'
import { appInstance } from '@utils/app/types'
import { PhoneErrorsUseCases } from '@modules/feedback'
import { PhoneText } from '@utils/app/package'

export const sendText = async (text: PhoneText) => {
	await axios.post('https://termii.com/api/sms/send', {
		to: text.to,
		from: text.from,
		sms: text.content,
		type: 'plain',
		channel: 'generic',
		api_key: termiiAPIKey
	}).catch((err) => {
		throw new Error(`Failed to send text: ${err.response.data.message}`)
	})
}

export const sendTextAndCatchError = async (text: PhoneText) => {
	try {
		if (isDev) await appInstance.logger.info(text.to, text.content)
		else await sendText(text)
	} catch (e) {
		await PhoneErrorsUseCases.add({
			...text,
			error: (e as Error).message
		})
	}
}