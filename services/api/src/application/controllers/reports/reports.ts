import { FindAnswer, FindQuestion } from '@modules/questions'
import { CreateReport, DeleteReport, FindReport, GetReports, ReportData, ReportType } from '@modules/reports'
import { UsersUseCases } from '@modules/users'
import { FindPastQuestion } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ReportController {
	static async GetReports (req: Request) {
		const query = req.query as QueryParams
		return await GetReports.execute(query)
	}

	static async FindReport (req: Request) {
		return await FindReport.execute(req.params.id)
	}

	static async DeleteReport (req: Request) {
		return await DeleteReport.execute(req.params.id)
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
				reported: { userId: user.id, userBio: user.bio, userRoles: user.roles }
			}
		}

		if (type == ReportType.questions) {
			const question = await FindQuestion.execute(reportedId)
			if (!question) throw new BadRequestError('question not found')
			reportedData = {
				type: ReportType.questions,
				reported: { userId: question.userId, body: question.body }
			}
		}

		if (type == ReportType.answers) {
			const answer = await FindAnswer.execute(reportedId)
			if (!answer) throw new BadRequestError('answer not found')
			reportedData = {
				type: ReportType.answers,
				reported: {
					userId: answer.userId,
					body: answer.body,
					title: answer.title,
					questionId: answer.questionId
				}
			}
		}

		if (type == ReportType.pastQuestions) {
			const question = await FindPastQuestion.execute(reportedId)
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

		return await CreateReport.execute({
			message, reportedId, data: reportedData,
			reporterId: reporter.id,
			reporterBio: reporter.bio,
			reporterRoles: reporter.roles
		})
	}
}