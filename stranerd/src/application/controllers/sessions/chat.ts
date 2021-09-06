import { AddChat, GetChats, MarkChatRead } from '@modules/sessions'
import { NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.body as QueryParams
		return await GetChats.execute(query)
	}

	static async addChat (req: Request) {

		const isLongerThan0 = (val: string) => Validation.isLongerThan(val, 0)
		const isLongerThan10 = (val: string) => Validation.isLongerThan(val, 11)

		const data = validate({
			content: req.body.content,
			media: req.body.media,
			sessionId: req.body.sessionId,
			receiverUserId: req.body.receiverUserId
		}, {
			content: { required: false, rules: [isLongerThan0] },
			media: { required: false, rules: [] },
			sessionId: { required: true, rules: [isLongerThan10] },
			receiverUserId: { required: true, rules: [isLongerThan0] }
		})
		
		const authUserId = await req.authUser?.id

		if (authUserId) return await AddChat.execute({path:[data.receiverUserId,authUserId],data})

		throw new NotAuthorizedError()
	}

	static async markChatRead (req: Request) {
		const data = validate({
			id: req.params.id,
			receiverUserId: req.body.receiverUserId
		}, {
			id: { required: true, rules: [] },
			receiverUserId: { required: true, rules: [] }
		})

		const authUserId = await req.authUser?.id

		if (authUserId) return await MarkChatRead.execute({path:[data.receiverUserId,authUserId],chatId: data.id})

		throw new NotAuthorizedError()
	}
}