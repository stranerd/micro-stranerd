import { mongoose } from './index'
import { BaseEntity } from '../structure'

export type ChangeStreamCallbacks<Model, Entity> = {
	created?: (data: { before: null, after: Entity }) => Promise<void>
	updated?: (data: { before: Entity, after: Entity, changes: Partial<Model> }) => Promise<void>
	deleted?: (data: { before: Entity, after: null }) => Promise<void>
}

export async function generateChangeStreams<Model extends { _id: string }, Entity extends BaseEntity> (
	collection: mongoose.Model<Model | any>,
	callbacks: ChangeStreamCallbacks<Model, Entity>,
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

			if (data.operationType === 'update') {
				const _id = data.documentKey._id
				const after = data.fullDocument as Model
				const before = await getClone().findOneAndUpdate({ _id }, after) as Model
				const { updatedFields, removedFields } = data.updateDescription
				const changed = removedFields
					.map((f) => f.toString())
					.concat(Object.keys(updatedFields))
				const changes = getObjectsFromKeys(changed)
				await callbacks.updated?.({
					before: mapper(before)!,
					after: mapper(after)!,
					changes
				})
			}
		})
}

const deepMerge = (objFrom: any, objTo: any) => Object.keys(objFrom)
	.reduce(
		(merged, key) => {
			merged[key] = objFrom[key] instanceof Object && !Array.isArray(objFrom[key])
				? deepMerge(objFrom[key], merged[key] ?? {})
				: objFrom[key]
			return merged
		}, { ...objTo }
	)

const formObject = (key: string) => key.split('.').reverse().reduce((acc, value) => {
	return { [value]: acc ?? true }
}, null as unknown as any)

const getObjectsFromKeys = (keys: string[]) => keys.map(formObject).reduce(deepMerge, {})