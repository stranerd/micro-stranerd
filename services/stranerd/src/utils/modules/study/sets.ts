import { GetSets, SetSaved, UpdateSetProp } from '@modules/study'

export const getRootSet = async (userId) => {
	const rootSet = (await GetSets.execute({
		where: [
			{ field: 'parent', value: null },
			{ field: 'userId', value: userId }
		]
	})).results[0]
	return rootSet ?? null
}

export const saveNewItemToSet = async ({
	                                       itemId, userId, type, setId
}: { itemId: string, userId: string, type: SetSaved, setId: string | null }) => {
	if (!setId) {
		const rootSet = await getRootSet(userId)
		setId = rootSet?.id ?? null
	}

	if (setId) await UpdateSetProp.execute({
		id: setId,
		prop: type,
		values: [itemId],
		userId: userId,
		add: true
	})
}