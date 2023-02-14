import { BadRequestError, Instance } from '@utils/app/package'
import { openAIKey } from '@utils/environment'

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({ apiKey: openAIKey })
const client = new OpenAIApi(configuration)

export const getConversationResponse = async (prompt: string) => {
	try {
		const response = await client.createCompletion({
			model: 'text-davinci-003',
			temperature: 0.3,
			max_tokens: 1000,
			prompt
		})
		return response.data.choices.at(0)?.text ?? 'No answer found'
	} catch (err: any) {
		await Instance.get().logger.error(err.message)
		throw new BadRequestError('failed to fetch answer')
	}
}
