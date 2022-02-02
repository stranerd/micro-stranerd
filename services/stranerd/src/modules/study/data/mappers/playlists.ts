import { PlaylistFromModel, PlaylistToModel } from '../models/playlists'
import { PlaylistEntity } from '../../domain/entities/playlists'
import { BaseMapper } from '@utils/commons'

export class PlaylistMapper extends BaseMapper<PlaylistFromModel, PlaylistToModel, PlaylistEntity> {
	mapFrom (model: PlaylistFromModel | null) {
		if (!model) return null
		const {
			_id, title, description, tags, userId, userBio, links,
			createdAt, updatedAt, isPublic
		} = model
		return new PlaylistEntity({
			id: _id.toString(), title, description, tags, userId, userBio, links, createdAt, updatedAt, isPublic
		})
	}

	mapTo (entity: PlaylistEntity) {
		return {
			title: entity.title,
			description: entity.description,
			tags: entity.tags,
			userId: entity.userId,
			userBio: entity.userBio,
			isPublic: entity.isPublic,
			links: entity.links
		}
	}
}
