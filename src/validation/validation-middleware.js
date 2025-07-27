import {exec} from "child_process";
import os from "os";
import {aiAssistant as AiAssistant} from "../constants/ai-assistants.js";

export const validationMiddleware = {

	validate: async ({ aiAssistant }) => {
		switch (aiAssistant) {
			case AiAssistant.ollama:
				await validationMiddleware.checkIsInstalled('ollama');
				await validationMiddleware.assureOllamaIsOn();
				return true;
			default:
				// currently the default option is using ollama
				await validationMiddleware.checkIsInstalled('ollama');
				await validationMiddleware.assureOllamaIsOn();
				return true;
		}
	},
	assureOllamaIsOn: () => {
		return new Promise((resolve, _) => {
			const command = 'ollama ps';
			exec(command, (error, stdout, stderr) => {
				if (error) {
					console.log('Ollama is not running.');
				} else {
					console.log('Ollama is running.');
				}
			})
			resolve();
		});
	},
	checkIsInstalled: (programName) => {
		return new Promise((resolve, reject) => {
			const command = os.platform() === 'win32' ? `where ${programName}` : `which ${programName}`;

			exec(command, (error, stdout, stderr) => {
				if (error) {
					console.log('Is not installed.');
					reject();
				} else {
					console.log('Is installed.');
					resolve();
				}
			})
		})
	}

}