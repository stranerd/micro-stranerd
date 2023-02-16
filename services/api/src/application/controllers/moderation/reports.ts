import { ReportsUseCases, ReportType } from '@modules/moderation'
import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { PastQuestionsUseCases } from '@modules/school'
import { FlashCardsUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

const finders = {
	[ReportType.users]: UsersUseCases,
	[ReportType.questions]: QuestionsUseCases,
	[ReportType.answers]: AnswersUseCases,
	[ReportType.pastQuestions]: PastQuestionsUseCases,
	[ReportType.flashCards]: FlashCardsUseCases
}

export class ReportController {
	static async GetReports (req: Request) {
		const query = req.query as QueryParams
		return await ReportsUseCases.get(query)
	}

	static async FindReport (req: Request) {
		return await ReportsUseCases.find(req.params.id)
	}

	static async DeleteReport (req: Request) {
		return await ReportsUseCases.delete(req.params.id)
	}

	static async CreateReport (req: Request) {
		const { entity, message } = validateReq({
			message: Schema.string().min(1),
			entity: Schema.object({
				id: Schema.string().min(1),
				type: Schema.any<ReportType>().in(Object.values(ReportType))
			})
		}, req.body)

		const reporter = await UsersUseCases.find(req.authUser!.id)
		if (!reporter || reporter.isDeleted()) throw new BadRequestError('reporter not found')

		const finder = finders[entity.type]
		if (!finder) throw new BadRequestError('entity cannot be reported')
		if (!(await finder.find(entity.id))) throw new BadRequestError('entity not found')

		return await ReportsUseCases.create({
			message, entity, user: reporter.getEmbedded()
		})
	}
}