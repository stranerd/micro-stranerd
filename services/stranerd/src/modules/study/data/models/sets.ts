import { UserBio } from '../../domain/types'

export interface SetFromModel extends SetToModel {
	_id: string
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		playlists: string[]
	}
	children: string[]
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
	isPublic: boolean
	userId: string
	userBio: UserBio
	tags: string[]
	parent: string | null
}