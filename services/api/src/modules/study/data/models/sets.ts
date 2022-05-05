import { EmbeddedUser, SetSaved } from '../../domain/types'

export interface SetFromModel extends SetToModel {
	_id: string
	saved: Record<SetSaved, string[]>
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
	user: EmbeddedUser
}