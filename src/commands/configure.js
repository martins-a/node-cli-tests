import { program } from "commander";
import inquirer from "inquirer";
import {commandsConstants} from "../constants/commands-constants.js";
import {fsHelper} from "../utils/fs-helper.js";
import path from "path";
import { fileURLToPath } from 'url';

export const configure = () => {

	program.command('configure')
		.description('Configure and save parameters')
		.action(async (args) => {

			try {

				const userAnswer = await inquirer.prompt(commandsConstants.configureQuestions);

				const __filename = fileURLToPath(import.meta.url);
				const __dirname = path.dirname(__filename);
				const grandParentDir = path.resolve(__dirname, '..', '..');

				fsHelper.saveFileToPath(path.join(grandParentDir, 'data'), JSON.stringify(userAnswer), 'configurations.json');

			} catch (error) {
				console.error(error);
			}

		})

}