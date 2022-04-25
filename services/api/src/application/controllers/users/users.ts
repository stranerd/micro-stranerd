import { FindUser, GetUsers, UpdateUserSchoolData, UserSchoolType } from '@modules/users'
import { BadRequestError, Conditions, QueryParams, Request, validate, Validation } from '@utils/commons'
import { FindDepartment, GetCourses } from '@modules/school'

export class UsersController {
	static async getUsers (req: Request) {
		const query = req.query as QueryParams
		return await GetUsers.execute(query)
	}

	static async findUser (req: Request) {
		return await FindUser.execute(req.params.id)
	}

	static async updateSchool (req: Request) {
		const isCollege = req.body.type === UserSchoolType.college
		const isAspirant = req.body.type === UserSchoolType.aspirant
		const isSecondary = req.body.type === UserSchoolType.secondary

		const { type, departmentId, exams } = validate({
			type: req.body.type,
			departmentId: req.body.departmentId,
			exams: req.body.exams
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(UserSchoolType), (cur, val) => cur === val)]
			},
			departmentId: { required: false, rules: [Validation.isRequiredIfX(isCollege), Validation.isString] },
			exams: {
				required: false,
				rules: [
					Validation.isRequiredIfX(isAspirant || isSecondary),
					Validation.isArrayOfX((exam: any) => {
						const matches = [Validation.isString(exam?.institutionId).valid]
						matches.push(Validation.isNumber(exam?.startDate).valid)
						matches.push(Validation.isNumber(exam?.endDate).valid)
						matches.push(Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'courses')(exam?.courseIds).valid)
						return matches.every((m) => m)
					}, 'array of exams')
				]
			}
		})

		if (isCollege) {
			const department = await FindDepartment.execute(departmentId)
			if (!department) throw new BadRequestError('department not found')
			return await UpdateUserSchoolData.execute({
				userId: req.authUser!.id, data: {
					type: UserSchoolType.college,
					institutionId: department.institutionId,
					facultyId: department.facultyId,
					departmentId: department.id
				}
			})
		} else {
			for (const exam of exams) {
				const { results: courses } = await GetCourses.execute({
					where: [{ field: 'id', condition: Conditions.in, value: exam.courseIds }],
					all: true
				})
				if (courses.length !== exam.courseIds.length) throw new BadRequestError('courses not found')
				if (courses.find((c) => c.institutionId !== exam.institutionId)) throw new BadRequestError('mismatched courses and institutions')
			}
			return await UpdateUserSchoolData.execute({ userId: req.authUser!.id, data: { type, exams } })
		}
	}
}