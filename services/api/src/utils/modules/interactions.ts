import { CommentsUseCases, InteractionEntities } from '@modules/interactions'
import { BadRequestError } from '@utils/app/package'
import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { PostsUseCases } from '@modules/teachers'

type Interactions = 'comments' | 'likes' | 'dislikes' | 'views'

const finders = {
	[InteractionEntities.coursesPosts]: async (id: string) => (await PostsUseCases.find(id))?.user.id,
	[InteractionEntities.questions]: async (id: string) => (await QuestionsUseCases.find(id))?.user.id,
	[InteractionEntities.answers]: async (id: string) => (await AnswersUseCases.find(id))?.user.id,
	[InteractionEntities.comments]: async (id: string) => {
		const comment = await CommentsUseCases.find(id)
		if (!comment || comment.entity.type === InteractionEntities.comments) return undefined
		return comment.user.id
	}
}

export const verifyInteractionEntity = async (type: InteractionEntities, id: string, interaction: Interactions) => {
	const types = (() => {
		if (interaction === 'comments') return [InteractionEntities.coursesPosts, InteractionEntities.questions, InteractionEntities.answers, InteractionEntities.comments]
		if (interaction === 'likes') return [InteractionEntities.answers]
		if (interaction === 'dislikes') return [InteractionEntities.answers]
		if (interaction === 'views') return []
		return []
	})().reduce((acc, cur) => {
		acc[cur] = finders[cur]
		return acc
	}, {} as Record<InteractionEntities, (id: string) => Promise<string | undefined>>)

	const finder = types[type]
	if (!finder) throw new BadRequestError(`${interaction} not supported for ${type}`)
	const res = await finder(id)
	if (!res) throw new BadRequestError(`no ${type} with id ${id} found`)
	return res
}