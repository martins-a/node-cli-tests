import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import fs from 'fs';
import {commandsConstants} from "./commands-constants.js";

export const configure = () => {

	program.command('configure')
		.description('Configure and save parameters')
		.action(async (args) => {

			try {

				const userAnswer = await inquirer.prompt(commandsConstants.configureQuestions);

				// TODO: save options on file

			} catch (error) {
				console.error(error);
			}

		})

}