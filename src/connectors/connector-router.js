import {ollamaConnector} from "./ollama-connector.js";
import {aiAssistant} from "../constants/ai-assistants.js";
import {openaiConnector} from "./openai-connector.js";

export const connectorsRouter = {
	resolve: async (assistant, systemPrompt, userPrompt) => {
		try {
			switch (assistant) {
				case aiAssistant.ollama:
					return ollamaConnector.handleRequest(systemPrompt, userPrompt);
				case aiAssistant.openAI:
					return openaiConnector.handleRequest(systemPrompt, userPrompt);
				default:
					return ollamaConnector.handleRequest(systemPrompt, userPrompt);
			}
		} catch (error) {
			console.error(error);
		}
	}
}