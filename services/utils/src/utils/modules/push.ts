import { Logger, PushNotification } from '@utils/commons'
import { FindUserTokens, UpdateUserTokens } from '@modules/push'
import { messaging } from 'firebase-admin'

const chunkArray = <T> (arr: T[], size: number) => new Array(Math.ceil(arr.length / size))
	.fill([])
	.map((_, index) => arr.slice(index * size, (index + 1) * size))
	.filter((chunk) => chunk.length > 0)

export const sendNotification = async (notification: PushNotification) => {
	try {
		const { userId, app, data, title, body } = notification
		const userTokens = await FindUserTokens.execute({ userId, app })
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
				else Logger.error(err)
			})
		}))

		if (invalidTokens.length) await UpdateUserTokens.execute({
			userId, app, tokens: invalidTokens, add: false
		})
	} catch (err) {
		await Logger.error(err)
	}
}
