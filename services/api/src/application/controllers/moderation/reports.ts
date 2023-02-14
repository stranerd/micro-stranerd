import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { ReportsUseCases, ReportType } from '@modules/moderation'
import { UsersUseCases } from '@modules/users'
import { PastQuestionsUseCases } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/app/package'
import { FlashCardsUseCases } from '@modules/study'

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
		const { type, id, message } = validate({
			type: req.body.entity?.type,
			id: req.body.entity?.id,
			message: req.body.message
		}, {
			message: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			type: {
				required: true,
				rules: [Validation.isString(), Validation.arrayContains(Object.values<string>(ReportType), (cur, val) => cur === val)]
			},
			id: { required: true, rules: [Validation.isString()] }
		})

		const reporter = await UsersUseCases.find(req.authUser!.id)
		if (!reporter || reporter.isDeleted()) throw new BadRequestError('reporter not found')

		const finder = finders[type]
		if (!finder) throw new BadRequestError('entity cannot be reported')
		if (!(await finder.find(id))) throw new BadRequestError('entity not found')

		return await ReportsUseCases.create({
			message, entity: { type, id }, user: reporter.getEmbedded()
		})
	}
}