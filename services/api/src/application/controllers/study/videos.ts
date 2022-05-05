import { VideosUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { UploaderUseCases } from '@modules/storage'

export class VideoController {
	static async FindVideo (req: Request) {
		return await VideosUseCases.find(req.params.id)
	}

	static async GetVideo (req: Request) {
		const query = req.query as QueryParams
		return await VideosUseCases.get(query)
	}

	static async UpdateVideo (req: Request) {
		const uploadedMedia = req.files.media?.[0]
		const changedMedia = !!uploadedMedia || req.body.media === null
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: uploadedMedia as any
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: !req.body.isHosted, rules: [Validation.isString] },
			media: {
				required: !!req.body.isHosted,
				rules: [Validation.isNotTruncated, Validation.isVideo]
			}
		})
		if (uploadedMedia) data.media = await UploaderUseCases.upload('study/videos', uploadedMedia)
		const { title, description, isHosted, link, media } = data
		const validateData = {
			title, description, isHosted, link,
			...(changedMedia ? { media } : {})
		}

		const authUserId = req.authUser!.id

		const updatedVideo = await VideosUseCases.update({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedVideo) return updatedVideo
		throw new NotAuthorizedError()
	}

	static async CreateVideo (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isHosted: req.body.isHosted,
			link: req.body.link,
			media: req.files.media?.[0] ?? null
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString] },
			isHosted: { required: false, rules: [Validation.isBoolean] },
			link: { required: !req.body.isHosted, rules: [Validation.isString] },
			media: { required: !!req.body.isHosted, rules: [Validation.isVideo] }
		})

		const media = data.media ? await UploaderUseCases.upload('study/videos', data.media) : null
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await VideosUseCases.add({
			...data, media,
			userBio: user.bio,
			userRoles: user.roles,
			userId: user.id
		})
	}

	static async DeleteVideo (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await VideosUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}