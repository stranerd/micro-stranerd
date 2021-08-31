export interface NotificationFromModel extends NotificationToModel {
	_id: string
	createdAt: number
	updatedAt: number
	seen: boolean
}

export interface NotificationToModel {
	body: string
	action: string
	userId: string
}