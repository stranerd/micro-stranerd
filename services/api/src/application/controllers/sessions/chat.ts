import { ChatsUseCases, SessionsUseCases } from '@modules/sessions'
import { BadRequestError, QueryKeys, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploaderUseCases } from '@modules/storage'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'from', value: req.authUser!.id }, { field: 'to', value: req.authUser!.id }]
		query.authType = QueryKeys.or
		return await ChatsUseCases.get(query)
	}

	static async findChat (req: Request) {
		return await ChatsUseCases.find({ id: req.params.id, userId: req.authUser?.id! })
	}

	static async addChat (req: Request) {
		const { content, media: mediaFile, sessionId, to } = validate({
			content: req.body.content,
			media: req.files.media?.[0] ?? null,
			sessionId: req.body.sessionId,
			to: req.body.to
		}, {
			content: {
				required: true,
				rules: [Validation.isString, Validation.isLongerThanX(0)]
			},
			media: {
				required: false,
				rules: [Validation.isNotTruncated, Validation.isFile]
			},
			sessionId: { required: false, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			to: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		if (sessionId) {
			const session = await SessionsUseCases.find(sessionId)
			if (!session) throw new BadRequestError('session not found')
		}
		const media = mediaFile ? await UploaderUseCases.upload('sessions/chats', mediaFile) : null

		const authUserId = req.authUser!.id
		return await ChatsUseCases.add({ content, media, sessionId, from: authUserId, to })
	}

	static async markChatRead (req: Request) {
		const data = validate({
			to: req.body.to
		}, {
			to: { required: true, rules: [Validation.isString] }
		})

		const authUserId = req.authUser!.id
		return await ChatsUseCases.markRead({
			from: authUserId, to: data.to,
			chatId: req.params.id
		})
	}
}