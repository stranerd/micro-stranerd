import { AddChat, GetChats, MarkChatRead } from '@modules/sessions'
import { QueryParams, Request, validate, Validation } from '@utils/commons'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.body as QueryParams
		return await GetChats.execute(query)
	}

	static async addChat (req: Request) {
		const isLongerThan0 = (val: string) => Validation.isLongerThan(val, 0)

		const data = validate({
			content: req.body.content,
			media: req.body.media,
			sessionId: req.body.sessionId,
			to: req.body.to
		}, {
			content: { required: false, rules: [(val: any) => Validation.isRequiredIf(val, !req.body.content), isLongerThan0] },
			media: { required: false, rules: [(val: any) => Validation.isRequiredIf(val, !req.body.content)] },
			sessionId: { required: false, rules: [isLongerThan0] },
			to: { required: true, rules: [isLongerThan0] }
		})
		
		const authUserId = req.authUser!.id
		return await AddChat.execute({
			path: [authUserId, data.to],
			data
		})
	}

	static async markChatRead (req: Request) {
		const isLongerThan0 = (val: string) => Validation.isLongerThan(val, 0)

		const data = validate({
			to: req.body.to
		}, {
			to: { required: true, rules: [isLongerThan0] }
		})

		const authUserId = req.authUser!.id
		return await MarkChatRead.execute({
			path: [authUserId, data.to],
			chatId: req.params.id
		})
	}
}