import { AddDiscussion, FindDiscussion, GetDiscussions, GroupsUseCases } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploaderUseCases } from '@modules/storage'

export class DiscussionController {
	static async FindDiscussion (req: Request) {
		return await FindDiscussion.execute({ id: req.params.id, classId: req.params.classId })
	}

	static async GetDiscussions (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'classId', value: req.params.classId }]
		return await GetDiscussions.execute(query)
	}

	static async CreateDiscussion (req: Request) {
		const data = validate({
			content: req.body.content,
			media: req.files.media?.[0] ?? null,
			groupId: req.body.groupId
		}, {
			content: { required: true, rules: [Validation.isString] },
			media: {
				required: false,
				rules: [Validation.isNotTruncated, Validation.isFile]
			},
			groupId: { required: true, rules: [Validation.isString] }
		})

		const userId = req.authUser!.id
		const group = await GroupsUseCases.find({ id: data.groupId, classId: req.params.classId })
		if (!group) throw new BadRequestError('group not found')
		if (!group.getAllUsers().includes(userId)) throw new BadRequestError('not a group member')
		const user = await UsersUseCases.find(userId)
		if (!user) throw new BadRequestError('user not found')
		const media = data.media ? await UploaderUseCases.upload('classes/discussions', data.media) : null

		return await AddDiscussion.execute({
			...data, media,
			links: Validation.extractUrls(data.content),
			classId: group.classId,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})
	}
}