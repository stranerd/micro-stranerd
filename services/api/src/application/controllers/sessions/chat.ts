import { AddChat, FindChat, FindSession, GetChats, MarkChatRead } from '@modules/sessions'
import { BadRequestError, Conditions, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploadFile } from '@modules/storage'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'path', value: req.authUser!.id, condition: Conditions.in }]
		return await GetChats.execute(query)
	}

	static async findChat (req: Request) {
		return await FindChat.execute({ id: req.params.id, userId: req.authUser?.id! })
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
			const session = await FindSession.execute(sessionId)
			if (!session) throw new BadRequestError('session not found')
		}
		const media = mediaFile ? await UploadFile.call('sessions/chats', mediaFile) : null

		const authUserId = req.authUser!.id
		return await AddChat.execute({
			path: [authUserId, to],
			data: { content, media, sessionId }
		})
	}

	static async markChatRead (req: Request) {
		const data = validate({
			to: req.body.to
		}, {
			to: { required: true, rules: [Validation.isString] }
		})

		const authUserId = req.authUser!.id
		return await MarkChatRead.execute({
			path: [authUserId, data.to],
			chatId: req.params.id
		})
	}
}