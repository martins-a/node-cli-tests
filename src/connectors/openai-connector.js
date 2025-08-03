import OpenAI from 'openai';
import {openaiModels} from "../constants/openai-models.js";
import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const grandParentDir = path.resolve(__dirname, '..', '..');

dotenv.config({path: path.join(grandParentDir, ".env")});
console.log(path.join(grandParentDir, ".env"));

const client = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
})

export const openaiConnector = {
	handleRequest: async (systemPrompt, userPrompt) => {
		try {
			const completion = await client.chat.completions.create({
				model: openaiModels.gpt41mini,
				messages: [
					{
						role: 'developer',
						content: systemPrompt
					},
					{
						role: 'user',
						content: userPrompt
					}
				]
			});
			return completion.choices[0].message.content;
		} catch (error) {
			throw error;
		}
	}
}