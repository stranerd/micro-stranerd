import { AddPlaylist, DeletePlaylist, FindPlaylist, GetPlaylists, UpdatePlaylist } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { saveNewItemToSet } from '@utils/modules/study/sets'

export class PlaylistController {
	static async FindPlaylist (req: Request) {
		return await FindPlaylist.execute(req.params.id)
	}

	static async GetPlaylist (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'isPublic', value: true }, ...(req.authUser ? [{
			field: 'userId',
			value: req.authUser.id
		}] : [])]
		return await GetPlaylists.execute(query)
	}

	static async UpdatePlaylist (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			links: req.body.links
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			links: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0)]
			}
		})

		const authUserId = req.authUser!.id

		const updatedPlaylist = await UpdatePlaylist.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedPlaylist) return updatedPlaylist
		throw new NotAuthorizedError()
	}

	static async CreatePlaylist (req: Request) {
		const data = validate({
			title: req.body.title,
			description: req.body.description,
			isPublic: req.body.isPublic,
			tags: req.body.tags,
			links: req.body.links
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			links: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0)]
			}
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) {
			const playlist = await AddPlaylist.execute({
				...data,
				userBio: user.bio,
				userId: authUserId
			})
			await saveNewItemToSet({
				setId: req.query.setId?.toString() ?? null,
				itemId: playlist.id,
				userId: playlist.userId,
				type: 'playlists'
			})
			return playlist
		}
		throw new NotFoundError()
	}

	static async DeletePlaylist (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeletePlaylist.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}