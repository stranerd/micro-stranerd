import { UserEntity } from '@modules/domain/entities/users'
import { DeleteUsers, GetUsers, SendVerificationEmail } from '@modules/index'

export const deleteUnverifiedUsers = async () => {
	const unverifiedUsers = await getUnverifiedUsers()
	const sevenDays = 7 * 24 * 60 * 60 * 1000
	const olderUsers = unverifiedUsers.filter((u) => u.signedUpAt <= (Date.now() - sevenDays))
	const recentUsers = unverifiedUsers.filter((u) => u.signedUpAt > (Date.now() - sevenDays))

	await DeleteUsers.execute(olderUsers.map((u) => u.id))
	await Promise.all(recentUsers.map(async (u) => await SendVerificationEmail.execute(u.email)))
}

const getUnverifiedUsers = async () => {
	const users = [] as UserEntity[]
	const usersQuery = await GetUsers.execute({
		where: [{ field: 'isVerified', value: false }]
	})
	usersQuery.results.forEach((u) => users.push(u))
	if (usersQuery.docs.total > usersQuery.docs.count) {
		const pages = usersQuery.pages.last
		const res = [] as number[]
		for (let i = 2; i <= pages; i++) res.push(i)
		const paginatedRes = await Promise.all(res.map((i) => GetUsers.execute({
			where: [{ field: 'isVerified', value: false }],
			page: i
		})))
		paginatedRes.forEach((p) => users.push(...p.results))
	}
	return users
}