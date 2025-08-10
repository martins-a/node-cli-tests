import {aiAssistant} from "./ai-assistants.js";
import {ollamaModels} from "./ollama-models.js";
import {openaiModels} from "./openai-models.js";

export const getCurrentModel = (_aiAssistant) => {
	if ( _aiAssistant ===  aiAssistant.ollama ) {
		return ollamaModels.qwen25coder7b;
	} else if ( _aiAssistant ===  aiAssistant.openAI ) {
		return openaiModels.gpt41mini;
	}
}