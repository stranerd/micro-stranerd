import { PushNotification } from '@utils/commons'

export const sendNotification = async (notification: PushNotification) => {
	console.log(notification)
}

export const subscribeToTopic = async (userId: string, app: string, topics: string[], subscribe: boolean) => {
	console.log(topics, userId, app, subscribe)
	return true
}