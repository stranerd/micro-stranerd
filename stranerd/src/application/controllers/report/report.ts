import { FindAnswer, FindQuestion } from '@modules/questions'
import { AnswerEntity, QuestionEntity } from '@modules/questions/domain/entities'
import { CreateReport, FindReport, GetReports } from '@modules/reports'
import { FindUser } from '@modules/users'
import { UserEntity } from '@modules/users/domain/entities/users'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class ReportController {
	static async GetReports (req: Request) {
		const query = req.body as QueryParams
		return await GetReports.execute(query)
	}

	static async FindReport (req: Request) {
		return await FindReport.execute(req.params.id)
	}

	static async CreateReport (req: Request) {
		const data = validate({
			type: req.body.type,
			reporterId: req.body.reporterId,
			reportedId: req.body.reportedId,
			message: req.body.message
		}, {
			message: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			type: { required: true, rules: [Validation.isString] },
			reporterId: { required: true, rules: [Validation.isString] },
			reportedId: { required: true, rules: [Validation.isString] }
		})

		 let reportData: UserEntity | QuestionEntity | AnswerEntity | null = null

		const reporterData = await FindUser.execute(data.reporterId)
		
		if(data.type == 'user') reportData = await FindUser.execute(data.reportedId)
		if(data.type == 'question') reportData = await FindQuestion.execute(data.reportedId)
		if(data.type == 'answer') reportData = await FindAnswer.execute(data.reportedId)

		if (reporterData && reportData) return await CreateReport.execute({
			...data,
			reporterBio: reporterData.bio,
			reported: reportData
		})

		throw new NotFoundError()
	}

	
}