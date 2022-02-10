import { AddSet, GetSets, SetSaved, UpdateSetProp } from '@modules/study'
import { FindUser, UserEntity } from '@modules/users'

export const createRootSet = async (user: UserEntity) => {
	return await AddSet.execute({
		name: '', parent: null, isPublic: false,
		userId: user!.id, userBio: user!.bio, tags: []
	})
}

export const getRootSet = async (userId) => {
	let rootSet = (await GetSets.execute({
		where: [
			{ field: 'parent', value: null },
			{ field: 'userId', value: userId }
		],
		sort: { field: 'createdAt', order: 1 }
	})).results[0]
	if (!rootSet) {
		const user = await FindUser.execute(userId)
		rootSet = await createRootSet(user!)
	}
	return rootSet
}

export const saveNewItemToSet = async ({
	                                       itemId, userId, type, setId
}: { itemId: string, userId: string, type: SetSaved, setId: string | null }) => {
	if (!setId) {
		const rootSet = await getRootSet(userId)
		setId = rootSet.id
	}

	if (setId) await UpdateSetProp.execute({
		id: setId,
		prop: type,
		values: [itemId],
		userId: userId,
		add: true
	})
}