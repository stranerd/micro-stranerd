import { AddVideo, DeleteVideo, FindVideo, GetVideos, SetSaved, UpdateVideo } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { saveNewItemToSet } from '@utils/modules/study/sets'

export class VideoController {
	static async FindVideo (req: Request) {
		return await FindVideo.execute(req.params.id)
	}

	static async GetVideo (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPublic', value: true }, ...(req.authUser ? [{
			field: 'userId',
			value: req.authUser.id
		}] : [])]
		return await GetVideos.execute(query)
	}

	static async UpdateVideo (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media,
			preview: req.body.preview
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isVideo] },
			preview: { required: false, rules: [Validation.isImage] }
		})

		const authUserId = req.authUser!.id

		const updatedVideo = await UpdateVideo.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedVideo) return updatedVideo
		throw new NotAuthorizedError()
	}

	static async CreateVideo (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media,
			preview: req.body.preview
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isVideo] },
			preview: { required: false, rules: [Validation.isImage] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) {
			const video = await AddVideo.execute({
				...data,
				userBio: user.bio,
				userRoles: user.roles,
				userId: authUserId
			})
			await saveNewItemToSet({
				setId: req.body.setId?.toString() ?? null,
				itemId: video.id,
				userId: video.userId,
				type: SetSaved.videos
			})
			return video
		}
		throw new NotFoundError()
	}

	static async DeleteVideo (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteVideo.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}