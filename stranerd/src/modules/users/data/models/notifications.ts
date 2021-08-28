export interface NotificationFromModel extends NotificationToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface NotificationToModel {
	body: string
	seen: boolean
	action: string
	userId: string
}