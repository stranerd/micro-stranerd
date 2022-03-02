import { SetData, SetSaved, UserBio, UserRoles } from '../../domain/types'

export interface SetFromModel extends SetToModel {
	_id: string
	saved: Record<SetSaved, string[]>
	children: string[]
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	data: SetData
	parent: string
}