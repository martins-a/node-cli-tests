import ollama from "ollama";
import {getCurrentModel} from "../constants/current-model.js";
import {aiAssistant} from "../constants/ai-assistants.js";

export const ollamaConnector = {
	handleRequest: async (systemPrompt, userPrompt) => {
		try {
			const response = await ollama.chat({
				model: getCurrentModel(aiAssistant.ollama),
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