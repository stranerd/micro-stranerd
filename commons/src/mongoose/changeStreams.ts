import { mongoose } from './index'

export type ChangeStreamCallbacks<Entity> = {
	created?: (data: { before: null, after: Entity }) => Promise<void>
	updated?: (data: { before: Entity, after: Entity }) => Promise<void>
	deleted?: (data: { before: Entity, after: null }) => Promise<void>
}

export async function generateChangeStreams<Model, Entity> (
	collection: mongoose.Model<Model | any>,
	callbacks: ChangeStreamCallbacks<Entity>,
	mapper: (model: Model | null) => Entity | null) {

	const cloneName = collection.collection.collectionName + '_streams_cloned'
	const getClone = () => collection.collection.conn.db.collection(cloneName)

	collection.watch([], { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'insert') {
				const _id = data.documentKey._id
				const after = data.fullDocument as Model
				await getClone().insertOne({ ...after, _id })
				await callbacks.created?.({
					before: null,
					after: mapper(after)!
				})
			}

			if (data.operationType === 'delete') {
				const _id = data.documentKey._id
				const before = await getClone().findOneAndDelete({ _id }) as Model
				await callbacks.deleted?.({
					before: mapper(before)!,
					after: null
				})
			}

			if (data.operationType === 'update' || data.operationType === 'replace') {
				const _id = data.documentKey._id
				const after = data.fullDocument as Model
				const before = await getClone().findOneAndUpdate({ _id }, after) as Model
				await callbacks.updated?.({
					before: mapper(before)!,
					after: mapper(after)!
				})
			}
		})
}