export interface NotificationFromModel extends NotificationToModel {
	_id: string
	createdAt: number
	updatedAt: number
	seen: boolean
}

export interface NotificationToModel {
	body: string
	userId: string
	action: string
	data: Record<string, any>
}