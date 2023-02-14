import { UserSchoolType, UsersUseCases } from '@modules/users'
import { BadRequestError, Conditions, QueryParams, Request, validate, Validation } from '@utils/app/package'
import { CoursesUseCases, DepartmentsUseCases } from '@modules/school'

export class UsersController {
	static async getUsers (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'dates.deletedAt', value: null }]
		return await UsersUseCases.get(query)
	}

	static async findUser (req: Request) {
		const user = await UsersUseCases.find(req.params.id)
		if (user?.isDeleted()) return null
		return user
	}

	static async updateSchool (req: Request) {
		const isCollege = req.body.type === UserSchoolType.college
		const isAspirant = req.body.type === UserSchoolType.aspirant

		const { type, departmentId, exams } = validate({
			type: req.body.type,
			departmentId: req.body.departmentId,
			exams: req.body.exams
		}, {
			type: {
				required: true,
				rules: [Validation.isString(), Validation.arrayContains(Object.values(UserSchoolType), (cur, val) => cur === val)]
			},
			departmentId: { required: isCollege, rules: [Validation.isString()] },
			exams: {
				required: isAspirant,
				rules: [
					Validation.isArrayOf((exam: any) => {
						const matches = [Validation.isString()(exam?.institutionId).valid]
						matches.push(Validation.isNumber()(exam?.startDate).valid)
						matches.push(Validation.isNumber()(exam?.endDate).valid)
						matches.push(Validation.isMoreThanOrEqualTo(exam?.startDate)(exam?.endDate).valid)
						matches.push(Validation.isArrayOf((cur) => Validation.isString()(cur).valid, 'courses')(exam?.courseIds).valid)
						return matches.every((m) => m)
					}, 'array of exams')
				]
			}
		})

		if (isCollege) {
			const department = await DepartmentsUseCases.find(departmentId)
			if (!department) throw new BadRequestError('department not found')
			return await UsersUseCases.updateSchool({
				userId: req.authUser!.id, data: {
					type: UserSchoolType.college,
					institutionId: department.institutionId,
					facultyId: department.facultyId,
					departmentId: department.id
				}
			})
		} else {
			for (const exam of exams) {
				const { results: courses } = await CoursesUseCases.get({
					where: [{ field: 'id', condition: Conditions.in, value: exam.courseIds }],
					all: true
				})
				if (courses.length !== exam.courseIds.length) throw new BadRequestError('courses not found')
				if (courses.find((c) => c.institutionId !== exam.institutionId)) throw new BadRequestError('mismatched courses and institutions')
			}
			return await UsersUseCases.updateSchool({ userId: req.authUser!.id, data: { type, exams } })
		}
	}
}