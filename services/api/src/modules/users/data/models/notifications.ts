export interface NotificationFromModel extends NotificationToModel {
	_id: string
	createdAt: number
	updatedAt: number
	seen: boolean
}

export interface NotificationToModel {
	title: string
	body: string
	userId: string
	action: string
	sendEmail: boolean
	data: Record<string, any>
}