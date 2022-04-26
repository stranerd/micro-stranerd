type NotificationData = {
	type: 'notifications'
	data: {
		id: string
		action: string
		data: Record<string, any>
	}
}

type ClassDiscussionData = {
	type: 'classes-discussions'
	data: {
		id: string
		classId: string
		groupId: string
	}
}

export type PushNotification = {
	userIds: string[],
	title: string
	body: string
	data: NotificationData | ClassDiscussionData
}