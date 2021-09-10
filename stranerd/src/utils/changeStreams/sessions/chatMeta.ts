import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity, ChatMetaFromModel, UpdateChatMetaBio } from '@modules/sessions'
import { FindUser } from '@modules/users'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		if (!after.userBio && after.userId) {
			const user = await FindUser.execute(after.userId)
			if (user) await UpdateChatMetaBio.execute({
				id: after.id,
				userBio: user.bio
			})
		}
	}
}