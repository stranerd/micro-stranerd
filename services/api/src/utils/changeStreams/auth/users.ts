import { ChangeStreamCallbacks, deleteCachedAccessToken, EmailsList, readEmailFromPug } from '@utils/app/package'
import { EventTypes } from '@utils/app/types'
import { publishers } from '@utils/events'
import { AuthUserEntity, UserFromModel } from '@modules/auth'
import { subscribeToMailingList } from '@utils/mailing'
import { isProd } from '@utils/environment'
import { ReferralsUseCases, UsersUseCases } from '@modules/users'
import { TokensUseCases } from '@modules/push'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, AuthUserEntity> = {
	created: async ({ after }) => {
		await UsersUseCases.createWithBio({
			id: after.id,
			timestamp: after.signedUpAt,
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				fullName: after.fullName,
				email: after.email,
				description: after.description,
				phone: after.phone,
				photo: after.photo
			}
		})
		await UsersUseCases.updateRoles({ id: after.id, data: after.roles, timestamp: Date.now() })
		if (isProd) await subscribeToMailingList(after.email)
		if (after.referrer) await ReferralsUseCases.create({ userId: after.referrer, referred: after.id })

		const emailContent = await readEmailFromPug('emails/newUser.pug', {})

		await publishers[EventTypes.SENDMAIL].publish({
			to: after.email,
			subject: 'Welcome To Stranerd',
			from: EmailsList.NO_REPLY,
			content: emailContent,
			data: {}
		})
	},
	updated: async ({ before, after, changes }) => {
		if (changes.photo && before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)

		const updatedBio = AuthUserEntity.bioKeys().some((key) => changes[key])
		if (updatedBio) await UsersUseCases.updateWithBio({
			id: after.id,
			timestamp: Date.now(),
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				fullName: after.fullName,
				email: after.email,
				description: after.description,
				phone: after.phone,
				photo: after.photo
			}
		})

		const updatedRoles = changes.roles
		if (updatedRoles) await UsersUseCases.updateRoles({ id: after.id, data: after.roles, timestamp: Date.now() })
		if (updatedRoles) await deleteCachedAccessToken(after.id)
		if (changes.referrer && after.referrer) await ReferralsUseCases.create({
			userId: after.referrer,
			referred: after.id
		})
	},
	deleted: async ({ before }) => {
		if (before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)
		await UsersUseCases.markDeleted({ id: before.id, timestamp: Date.now() })
		await TokensUseCases.delete(before.id)
	}
}