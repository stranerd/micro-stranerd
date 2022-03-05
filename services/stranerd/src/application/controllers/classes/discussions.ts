import { AddDiscussion, FindDiscussion, FindGroup, GetDiscussions } from '@modules/classes'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class DiscussionController {
	static async FindDiscussion (req: Request) {
		return await FindDiscussion.execute(req.params.id)
	}

	static async GetDiscussions (req: Request) {
		const query = req.query as QueryParams
		return await GetDiscussions.execute(query)
	}

	static async CreateDiscussion (req: Request) {
		const data = validate({
			content: req.body.content,
			media: req.body.media,
			groupId: req.body.groupId
		}, {
			content: { required: true, rules: [Validation.isString] },
			media: {
				required: false,
				rules: [Validation.isRequiredIfX(!req.body.content), Validation.isFile]
			},
			groupId: { required: true, rules: [Validation.isString] }
		})

		const userId = req.authUser!.id
		const group = await FindGroup.execute(data.groupId)
		if (!group) throw new NotFoundError()
		if (!group.getAllUsers().includes(userId)) throw new NotAuthorizedError()
		const user = await FindUser.execute(userId)

		if (user) return await AddDiscussion.execute({
			...data,
			links: [],
			classId: group.classId,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})

		throw new NotFoundError()
	}
}