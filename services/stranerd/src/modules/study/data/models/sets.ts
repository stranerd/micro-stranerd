import { UserBio } from '../../domain/types'
import { SetSaved } from '@modules/study/domain/types/sets'

export interface SetFromModel extends SetToModel {
	_id: string
	saved: Record<SetSaved, string[]>
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