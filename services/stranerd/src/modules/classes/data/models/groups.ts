export interface GroupFromModel extends GroupToModel {
	_id: string
	admins: string[]
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	classId: string
	name: string
}