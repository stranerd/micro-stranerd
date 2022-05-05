import { AnswersUseCases, QuestionsUseCases } from '@modules/questions'
import { ReportData, ReportsUseCases, ReportType } from '@modules/reports'
import { UsersUseCases } from '@modules/users'
import { PastQuestionsUseCases } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

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
		const { type, reportedId, message } = validate({
			type: req.body.type,
			reportedId: req.body.reportedId,
			message: req.body.message
		}, {
			message: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values<string>(ReportType), (cur, val) => cur === val)]
			},
			reportedId: { required: true, rules: [Validation.isString] }
		})

		let reportedData: ReportData | null = null

		const reporter = await UsersUseCases.find(req.authUser!.id)
		if (!reporter) throw new BadRequestError('reporter not found')

		if (type == ReportType.users) {
			const user = await UsersUseCases.find(reportedId)
			if (!user) throw new BadRequestError('user not found')
			reportedData = {
				type: ReportType.users,
				reported: user.getEmbedded()
			}
		}

		if (type == ReportType.questions) {
			const question = await QuestionsUseCases.find(reportedId)
			if (!question) throw new BadRequestError('question not found')
			reportedData = {
				type: ReportType.questions,
				reported: { user: question.user, body: question.body }
			}
		}

		if (type == ReportType.answers) {
			const answer = await AnswersUseCases.find(reportedId)
			if (!answer) throw new BadRequestError('answer not found')
			reportedData = {
				type: ReportType.answers,
				reported: {
					user: answer.user,
					body: answer.body,
					title: answer.title,
					questionId: answer.questionId
				}
			}
		}

		if (type == ReportType.pastQuestions) {
			const question = await PastQuestionsUseCases.find(reportedId)
			if (!question) throw new BadRequestError('past question not found')
			reportedData = {
				type: ReportType.pastQuestions,
				reported: {
					question: question.question,
					questionMedia: question.questionMedia
				}
			}
		}

		if (!reportedData) throw new BadRequestError('invalid report data')

		return await ReportsUseCases.create({
			message, reportedId, data: reportedData,
			user: reporter.getEmbedded()
		})
	}
}