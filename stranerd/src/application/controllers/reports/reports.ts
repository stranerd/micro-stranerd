import { FindAnswer, FindQuestion } from '@modules/questions'
import { CreateReport, DeleteReport, FindReport, GetReports, ReportData, ReportType } from '@modules/reports'
import { FindUser } from '@modules/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ReportController {
	static async GetReports (req: Request) {
		const query = req.body as QueryParams
		return await GetReports.execute(query)
	}

	static async FindReport (req: Request) {
		return await FindReport.execute(req.params.id)
	}

	static async DeleteReport (req: Request) {
		return await DeleteReport.execute(req.params.id)
	}

	static async CreateReport (req: Request) {
		const data = validate({
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

		const reporter = await FindUser.execute(req.authUser!.id)
		if (!reporter) throw new NotFoundError()

		if (data.type == ReportType.users) {
			const user = await FindUser.execute(data.reportedId)
			if (!user) throw new NotFoundError()
			reportedData = {
				type: ReportType.users,
				reported: { userId: user.id, bio: user.bio }
			}
		}

		if (data.type == ReportType.questions) {
			const question = await FindQuestion.execute(data.reportedId)
			if (!question) throw new NotFoundError()
			reportedData = {
				type: ReportType.questions,
				reported: { userId: question.userId, body: question.body }
			}
		}

		if (data.type == ReportType.answers) {
			const answer = await FindAnswer.execute(data.reportedId)
			if (!answer) throw new NotFoundError()
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

		if (!reportedData) throw new NotFoundError()

		return await CreateReport.execute({
			...data, ...reportedData,
			reporterId: reporter.id,
			reporterBio: reporter.bio
		})
	}
}