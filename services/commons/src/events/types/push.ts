import { AuthApps } from '../../utils/authUser'

type NotificationData = {
	type: 'notifications'
	data: {
		action: string
		data: Record<string, any>
	}
}

export type PushNotification = {
	userId: string,
	app: AuthApps
	title: string
	body: string
	data: NotificationData
}