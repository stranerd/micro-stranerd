import { AddVideo, DeleteVideo, FindVideo, GetVideos, UpdateVideo } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class VideoController {
	static async FindVideo (req: Request) {
		return await FindVideo.execute(req.params.id)
	}

	static async GetVideo (req: Request) {
		const query = req.query as QueryParams
		return await GetVideos.execute(query)
	}

	static async UpdateVideo (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isVideo] }
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
			tags: req.body.tags,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.body.media
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: false, rules: [Validation.isRequiredIfX(!req.body.isHosted), Validation.isString] },
			media: { required: false, rules: [Validation.isRequiredIfX(!!req.body.isHosted), Validation.isVideo] }
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddVideo.execute({
			...data,
			userBio: user.bio,
			userId: authUserId
		})
		throw new NotFoundError()
	}

	static async DeleteVideo (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteVideo.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}