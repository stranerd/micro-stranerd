import { ChangeStreamCallbacks, Emails, EventTypes, readEmailFromPug } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserEntity, UserFromModel } from '@modules/index'
import { subscribeToMailingList } from '@utils/mailing'
import { isProd } from '@utils/environment'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await publishers[EventTypes.AUTHUSERCREATED].publish({
			id: after.id,
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				email: after.email,
				description: after.description,
				photo: after.photo
			},
			timestamp: after.signedUpAt
		})
		if (isProd) await subscribeToMailingList(after.email)
		if (after.referrer) await publishers[EventTypes.AUTHNEWREFERRAL].publish({
			referrer: after.referrer,
			referred: after.id
		})

		const emailContent = await readEmailFromPug('emails/new-user.pug', {})

		await publishers[EventTypes.SENDMAIL].publish({
			to: after.email,
			subject: 'Welcome To Stranerd',
			from: Emails.NO_REPLY,
			content: emailContent,
			attachments: {}
		})
	},
	updated: async ({ before, after, changes }) => {
		if (changes.photo && before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)

		const updatedBio = changes.firstName || changes.lastName || changes.photo || changes.email || changes.description

		if (updatedBio) await publishers[EventTypes.AUTHUSERUPDATED].publish({
			id: after.id,
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				email: after.email,
				description: after.description,
				photo: after.photo
			},
			timestamp: Date.now()
		})

		const updatedRoles = changes.roles
		if (updatedRoles) await publishers[EventTypes.AUTHROLESUPDATED].publish({
			id: after.id,
			data: after.roles,
			timestamp: Date.now()
		})

		if (changes.referrer && after.referrer) await publishers[EventTypes.AUTHNEWREFERRAL].publish({
			referrer: after.referrer,
			referred: after.id
		})
	},
	deleted: async ({ before }) => {
		await publishers[EventTypes.AUTHUSERDELETED].publish({
			id: before.id,
			timestamp: Date.now()
		})
	}
}