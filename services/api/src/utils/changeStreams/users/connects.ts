import { ChangeStreamCallbacks } from '@utils/commons'
import { ConnectEntity, ConnectFromModel, UserMeta, UsersUseCases } from '@modules/users'
import { getSocketEmitter } from '@index'
import { ChatMetasUseCases, ChatType } from '@modules/sessions'

export const ConnectChangeStreamCallbacks: ChangeStreamCallbacks<ConnectFromModel, ConnectEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`users/connects/${after.from.id}`, after)
		await getSocketEmitter().emitCreated(`users/connects/${after.to.id}`, after)
		await getSocketEmitter().emitCreated(`users/connects/${after.id}/${after.from.id}`, after)
		await getSocketEmitter().emitCreated(`users/connects/${after.id}/${after.to.id}`, after)
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`users/connects/${after.from.id}`, after)
		await getSocketEmitter().emitUpdated(`users/connects/${after.to.id}`, after)
		await getSocketEmitter().emitUpdated(`users/connects/${after.id}/${after.from.id}`, after)
		await getSocketEmitter().emitUpdated(`users/connects/${after.id}/${after.to.id}`, after)

		if (changes.accepted) await Promise.all([
			await ChatMetasUseCases.add({
				members: [after.from.id, after.to.id],
				data: {
					type: ChatType.personal,
					users: {
						[after.from.id]: after.from,
						[after.to.id]: after.to
					}
				}
			}),
			UsersUseCases.incrementMeta({
				id: after.from.id, property: UserMeta.connects, value: after.accepted ? 1 : -1
			}),
			UsersUseCases.incrementMeta({
				id: after.to.id, property: UserMeta.connects, value: after.accepted ? 1 : -1
			})
		])
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`users/connects/${before.from.id}`, before)
		await getSocketEmitter().emitDeleted(`users/connects/${before.to.id}`, before)
		await getSocketEmitter().emitDeleted(`users/connects/${before.id}/${before.from.id}`, before)
		await getSocketEmitter().emitDeleted(`users/connects/${before.id}/${before.to.id}`, before)

		if (before.accepted) await Promise.all([
			UsersUseCases.incrementMeta({ id: before.from.id, property: UserMeta.connects, value: -1 }),
			UsersUseCases.incrementMeta({ id: before.to.id, property: UserMeta.connects, value: -1 })
		])
	}
}
