import { AuthApps } from '../../utils/authUser'

export type PushNotification = {
	userId: string,
	app: AuthApps
} & ({
	type: 'notifications'
	data: {
		action: string
		data: Record<string, any>
	}
})