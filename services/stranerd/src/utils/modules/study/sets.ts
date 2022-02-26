import { AddSet, GetSets } from '@modules/study'
import { FindUser, UserBio, UserRoles } from '@modules/users'
import { SetData, SetType } from '@modules/study/domain/types'
import { FindClass } from '@modules/classes'

export const createRootSet = async (userId: string, userBio: UserBio, userRoles: UserRoles, data: SetData) => {
	return await AddSet.execute({
		name: '', parent: null, isPublic: false, data,
		userId, userBio, userRoles, tags: []
	})
}

export const getUserRootSet = async (userId: string) => {
	let rootSet = (await GetSets.execute({
		where: [
			{ field: 'parent', value: null },
			{ field: 'userId', value: userId }
		],
		sort: { field: 'createdAt', order: 1 }
	})).results[0]
	if (!rootSet) {
		const user = await FindUser.execute(userId)
		rootSet = await createRootSet(user!.id, user!.bio, user!.roles, { type: SetType.users })
	}
	return rootSet
}

export const getClassRootSet = async (classId: string) => {
	let rootSet = (await GetSets.execute({
		where: [
			{ field: 'parent', value: null },
			{ field: 'data.classId', value: classId }
		],
		sort: { field: 'createdAt', order: 1 }
	})).results[0]
	if (!rootSet) {
		const classInstance = await FindClass.execute(classId)
		rootSet = await createRootSet(classInstance!.userId, classInstance!.userBio, classInstance!.userRoles, {
			type: SetType.classes, classId
		})
	}
	return rootSet
}
