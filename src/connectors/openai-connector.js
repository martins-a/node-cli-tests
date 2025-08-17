import OpenAI from 'openai';
import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";
import {getCurrentModel} from "../constants/current-model.js";
import {aiAssistant} from "../constants/ai-assistants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const grandParentDir = path.resolve(__dirname, '..', '..');

dotenv.config({path: path.join(grandParentDir, ".env")});
console.log(path.join(grandParentDir, ".env"));

const client = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
})

export const openaiConnector = {
	handleRequest: async (
		systemPrompt,
		userPrompt,
		externalContext,
		history="",
		nextTask=""
	) => {
		try {
			/*console.log(systemPrompt);
			console.log(userPrompt);
			console.log(externalContext);
			console.log(history);
			console.log(nextTask);*/
			const completion = await client.chat.completions.create({
				model: getCurrentModel(aiAssistant.openAI),
				messages: [
					{
						role: 'system',
						content: systemPrompt
					},
					{
						role: 'assistant',
						content: history
					},
					{
						role: 'assistant',
						content:externalContext
					},
					{
						role: 'user',
						content: userPrompt
					},
					{
						role: 'user',
						content: nextTask
					},
				]
			});
			return completion.choices[0].message.content;
		} catch (error) {
			throw error;
		}
	}
}