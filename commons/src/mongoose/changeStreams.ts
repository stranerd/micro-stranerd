import { mongoose } from './index'

export type ChangeStreamCallbacks<Model> = {
	created?: (data: { before: null, after: Model }) => Promise<void>
	updated?: (data: { before: Model, after: Model }) => Promise<void>
	deleted?: (data: { before: Model, after: null }) => Promise<void>
}

export async function generateChangeStreams<Model> (collection: mongoose.Model<Model | any>, callbacks: ChangeStreamCallbacks<Model>) {
	const cloneName = collection.collection.collectionName + '_streams_cloned'
	const getClone = () => collection.collection.conn.db.collection(cloneName)

	collection.watch([], { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'insert') {
				const _id = data.documentKey._id
				const after = data.fullDocument as Model
				await getClone().insertOne({ ...after, _id })
				await callbacks.created?.({ before: null, after })
			}

			if (data.operationType === 'delete') {
				const _id = data.documentKey._id
				const before = await getClone().findOneAndDelete({ _id }) as Model
				await callbacks.deleted?.({ before, after: null })
			}

			if (data.operationType === 'update' || data.operationType === 'replace') {
				const _id = data.documentKey._id
				const after = data.fullDocument as Model
				const before = await getClone().findOneAndUpdate({ _id }, after) as Model
				await callbacks.updated?.({ before: before!, after })
			}
		})
}