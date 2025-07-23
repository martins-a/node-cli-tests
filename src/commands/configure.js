import { program } from "commander";
import inquirer from "inquirer";
import {commandsConstants} from "../constants/commands-constants.js";
import {fsHelper} from "../utils/fs-helper.js";

export const configure = () => {

	program.command('configure')
		.description('Configure and save parameters')
		.action(async (args) => {

			try {

				const userAnswer = await inquirer.prompt(commandsConstants.configureQuestions);

				fsHelper.saveFileToPath('data', JSON.stringify(userAnswer), 'configurations.json');

			} catch (error) {
				console.error(error);
			}

		})

}