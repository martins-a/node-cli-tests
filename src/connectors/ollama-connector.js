import ollama from "ollama";
import {ollamaModels} from "../constants/ollama-models.js";

export const ollamaConnector = {
	handleRequest: async (systemPrompt, userPrompt) => {
		try {
			const response = await ollama.chat({
				model: ollamaModels.qwen25coder3b,
				messages: [
					{
						role: 'system',
						content: systemPrompt
					},
					{
						role: 'user',
						content: userPrompt
					}
				]
			});
			return response.message.content;
		} catch (error) {
			throw error;
		}
	}
}