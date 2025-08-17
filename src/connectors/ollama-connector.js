import ollama from "ollama";
import {getCurrentModel} from "../constants/current-model.js";
import {aiAssistant} from "../constants/ai-assistants.js";

export const ollamaConnector = {
	handleRequest: async (
		systemPrompt,
		userPrompt,
		externalContext,
		history="",
		nextTask="",) => {
		try {

			//console.log(systemPrompt);
			//console.log(userPrompt);
			//console.log(externalContext);
			//console.log(history);
			//console.log(nextTask);

			const response = await ollama.chat({
				model: getCurrentModel(aiAssistant.ollama),
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
			return response.message.content;
		} catch (error) {
			throw error;
		}
	}
}