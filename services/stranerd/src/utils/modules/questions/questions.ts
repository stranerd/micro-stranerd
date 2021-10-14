import { GetQuestions } from '@modules/questions'
import { Conditions } from '@utils/common'
import { sendNotification } from '@utils/modules/users/notifications'

export const handleUnansweredQuestions = async () => {
	const dayInMs = 24 * 60 * 60 * 1000
	const { results: questions } = await GetQuestions.execute({
		where: [
			{ field: 'answers', condition: Conditions.eq, value: [] },
			{ field: 'createdAt', condition: Conditions.gte, value: Date.now() - (2 * dayInMs) },
			{ field: 'createdAt', condition: Conditions.lte, value: Date.now() - dayInMs }
		],
		all: true
	})
	await Promise.all(
		questions.map(async (q) => {
			await sendNotification(q.userId, {
				action: 'questions',
				data: { questionId: q.id },
				body: `
Hello ${q.userBio.firstName ?? 'Anon'}<br><br>
You asked a question and sadly, it hasn’t been answered. But we have an easy fix for that!<br><br>
1. Increase your coin stake on the question so that fellow Nerds can help you out with it.<br><br>
2. Book an expert tutor to give you in-depth assistance with the question and any other difficulty you might be having with school work.<br><br>
				`
			}, 'Unanswered Question')
		})
	)
}