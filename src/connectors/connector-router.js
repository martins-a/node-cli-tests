import {ollamaConnector} from "./ollama-connector.js";
import {aiAssistant} from "../constants/ai-assistants.js";
import {openaiConnector} from "./openai-connector.js";

export const connectorsRouter = {
	resolve: async (
		assistant,
		systemPrompt,
		userPrompt,
		externalContext="",
		history="",
		nextTask=""
	) => {
		try {
			switch (assistant) {
				case aiAssistant.ollama:
					return ollamaConnector.handleRequest(systemPrompt, userPrompt, externalContext, history, nextTask);
				case aiAssistant.openAI:
					return openaiConnector.handleRequest(systemPrompt, userPrompt, externalContext, history, nextTask);
				default:
					return ollamaConnector.handleRequest(systemPrompt, userPrompt, externalContext, history, nextTask);
			}
		} catch (error) {
			console.error(error);
		}
	}
}