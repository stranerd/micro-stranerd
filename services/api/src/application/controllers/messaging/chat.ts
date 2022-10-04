import { ChatMetasUseCases, ChatsUseCases, ChatType } from '@modules/messaging'
import {
	BadRequestError, Conditions,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	validate,
	Validation
} from '@utils/app/package'
import { UploaderUseCases } from '@modules/storage'
import { UsersUseCases } from '@modules/users'

export class ChatController {
	static async getChats (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'data.members', condition: Conditions.in, value: req.authUser!.id }]
		return await ChatsUseCases.get(query)
	}

	static async findChat (req: Request) {
		const chat = await ChatsUseCases.find(req.params.id)
		if (!chat || !chat.data.members.includes(req.authUser!.id)) return null
		return chat
	}

	static async addChat (req: Request) {
		const { body, media: mediaFile, to } = validate({
			body: req.body.body,
			media: req.files.media?.[0] ?? null,
			to: req.body.to
		}, {
			body: {
				required: true, rules: [Validation.isString]
			},
			media: {
				required: true, nullable: true,
				rules: [Validation.isNotTruncated, Validation.isFile]
			},
			to: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] }
		})

		const media = mediaFile ? await UploaderUseCases.upload('messaging/chats', mediaFile) : null

		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('profile not found')

		const { results } = await ChatMetasUseCases.get({
			where: [
				{ field: 'members', value: authUserId },
				{
					condition: QueryKeys.or,
					value: [
						{
							condition: QueryKeys.and,
							value: [
								{ field: 'data.type', value: ChatType.personal },
								{ field: 'members', value: to }
							]
						},
						{
							condition: QueryKeys.and,
							value: [
								{ field: 'data.type', value: ChatType.classes },
								{ field: 'data.group.id', value: to }
							]
						}
					]
				}
			]
		})
		if (!results[0]) throw new NotAuthorizedError()

		return await ChatsUseCases.add({
			body, media, from: user.getEmbedded(), to, data: results[0].getEmbedded(),
			links: Validation.extractUrls(body)
		})
	}

	static async markChatRead (req: Request) {
		const data = validate({
			to: req.body.to
		}, {
			to: { required: true, rules: [Validation.isString] }
		})

		const authUserId = req.authUser!.id
		return await ChatsUseCases.markRead({
			from: authUserId, to: data.to
		})
	}
}