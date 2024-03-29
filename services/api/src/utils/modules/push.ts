import { appInstance, PushNotification } from '@utils/app/types'
import { TokensUseCases } from '@modules/push'
import { messaging } from 'firebase-admin'

const chunkArray = <T> (arr: T[], size: number) => new Array(Math.ceil(arr.length / size))
	.fill([])
	.map((_, index) => arr.slice(index * size, (index + 1) * size))
	.filter((chunk) => chunk.length > 0)

export const sendPushNotification = async (notification: PushNotification) => {
	try {
		const { userIds, data, title, body } = notification
		await Promise.all(userIds.map(async (userId) => {
			const userTokens = await TokensUseCases.find({ userId })
			const chunks = chunkArray(userTokens.tokens, 500)
			const invalidTokens = [] as string[]

			await Promise.all(chunks.map(async (tokens) => {
				const res = await messaging().sendMulticast({
					tokens,
					notification: { title, body },
					data: { value: JSON.stringify(data) }
				})
				res.responses.forEach((resp, index) => {
					if (resp.success) return
					const err = resp.error!
					const invalids = [
						'messaging/invalid-argument',
						'messaging/invalid-registration-token',
						'messaging/registration-token-not-registered'
					]
					if (invalids.includes(err.code)) invalidTokens.push(tokens[index])
					else appInstance.logger.error(err)
				})
			}))

			if (invalidTokens.length) await TokensUseCases.update({
				userId, tokens: invalidTokens, add: false
			})
		}))
	} catch (err) {
		await appInstance.logger.error(err)
	}
}
