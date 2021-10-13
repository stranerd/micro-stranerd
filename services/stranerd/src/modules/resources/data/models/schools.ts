export interface SchoolFromModel extends SchoolToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface SchoolToModel {
	name: string
}