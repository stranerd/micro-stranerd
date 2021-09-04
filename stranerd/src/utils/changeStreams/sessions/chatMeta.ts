import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity } from '@modules/sessions/domain/entities/chatMeta'
import { ChatMetaFromModel } from '@modules/sessions/data/models/chatMeta'
import { FindUser } from '@modules/users'
import { UpdateChatMetaBio } from '@modules/sessions'

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