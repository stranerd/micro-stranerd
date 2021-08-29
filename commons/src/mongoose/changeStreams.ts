import { mongoose } from './index'

declare type DeepPartial<T> = T extends Nullable ? T : {
	[K in keyof T]?: DeepPartial<T[K]>
}

type Require = string | number | boolean
type Nullable = Require | undefined | null

export type ChangeStreamCallbacks<Model> = {
	created?: (data: Model) => Promise<void>
	updated?: (data: Model, fields: DeepPartial<Model>) => Promise<void>
	deleted?: (data: { _id: string }) => Promise<void>
}

export async function generateChangeStreams<Model> (collection: mongoose.Model<Model | any>, callbacks: ChangeStreamCallbacks<Model>) {
	if (callbacks.created) {
		const createdPipeline = [{ $match: { operationType: 'insert' } }]
		collection.watch(createdPipeline, { fullDocument: 'updateLookup' })
			.on('change', async (data) => {
				if (data.operationType === 'insert') await callbacks.created?.(data.fullDocument)
			})
	}

	if (callbacks.deleted) {
		const deletedPipeline = [{ $match: { operationType: 'delete' } }]
		collection.watch(deletedPipeline, { fullDocument: 'updateLookup' })
			.on('change', async (data) => {
				if (data.operationType === 'delete') await callbacks.deleted?.({
					_id: (data.documentKey._id as string).toString()
				})
			})
	}

	if (callbacks.updated) {
		const updatedPipeline = [{ $match: { operationType: 'update' } }]
		collection.watch(updatedPipeline, { fullDocument: 'updateLookup' })
			.on('change', async (data) => {
				if (data.operationType === 'update') {
					const { updatedFields, removedFields } = data.updateDescription
					const changed = removedFields
						.map((f) => f.toString())
						.concat(Object.keys(updatedFields))
					const fields = getObjectsFromKeys(changed)
					await callbacks.updated?.(data.fullDocument, fields)
				}
			})

	}
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