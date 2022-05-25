export interface TagFromModel extends TagToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface TagToModel {
	title: string
	parent: string | null
}
