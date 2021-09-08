import { AddChat, GetChats, MarkChatRead } from '@modules/sessions'
import { Conditions, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.body as QueryParams
		query.auth = [{ field: 'path', value: req.authUser!.id, condition: Conditions.in }]
		return await GetChats.execute(query)
	}

	static async addChat (req: Request) {
		const { content, media, sessionId, to } = validate({
			content: req.body.content,
			media: req.body.media,
			sessionId: req.body.sessionId,
			to: req.body.to
		}, {
			content: {
				required: false,
				rules: [Validation.isRequiredIfX(!req.body.media), Validation.isString, Validation.isLongerThanX(0)]
			},
			media: {
				required: false,
				rules: [Validation.isRequiredIfX(!req.body.content), Validation.isFile]
			},
			sessionId: { required: false, rules: [Validation.isValidMongooseId, Validation.isLongerThanX(0)] },
			to: { required: true, rules: [Validation.isValidMongooseId, Validation.isLongerThanX(0)] }
		})

		const authUserId = req.authUser!.id
		return await AddChat.execute({
			path: [authUserId, to],
			data: { content, media, sessionId }
		})
	}

	static async markChatRead (req: Request) {
		const data = validate({
			to: req.body.to,
			chatId: req.body.chatId
		}, {
			to: { required: true, rules: [Validation.isValidMongooseId] },
			chatId: { required: true, rules: [Validation.isValidMongooseId] }
		})

		const authUserId = req.authUser!.id
		return await MarkChatRead.execute({
			path: [authUserId, data.to],
			chatId: data.chatId
		})
	}
}