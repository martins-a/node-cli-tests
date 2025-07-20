import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import {assureOllamaIsOn, checkIsInstalled} from '../utils/helpers.js';
import {promptFactory} from "../prompts/prompt-factory.js";
import {commandsConstants} from "./commands-constants.js";
import {fsHelper} from "../utils/fs-helper.js";

export const testInput = () => {

    program.command('test-input')
    .description('Test a given method')
    .option('-p', '--preference', 'Configure preferences')
    .action(async (_, args) => {

        try {

            const opts = args.opts();

            checkIsInstalled('ollama');
            await assureOllamaIsOn();

            let cachedOptions = {};
            let userInput = {};
            if (opts.p || opts.preference) {
                userInput = await inquirer.prompt(commandsConstants.inputFileQuestions);
            } else {
                userInput = await inquirer.prompt(commandsConstants.inputFileQuestionsNoConfig);
                cachedOptions = fsHelper.readJsonSync('data/configurations.json');
            }

            console.log(JSON.stringify(cachedOptions));

            console.log(chalk.green('Tests are being generated...'));

			const { method, externalContext, language, programmingFramework, testFramework } = { cachedOptions, userInput };

            const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(
				language,
				programmingFramework,
				testFramework,
				method,
				externalContext
            );

            // TODO: let the user select the model
            // TODO: create the connector layer
            const llmResponse = await ollama.chat({
                model: 'qwen2.5-coder:3b',
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

            const textToSave = llmResponse.message.content;

            const fileName = `tests_output_${Date.now()}`;
            // TODO: let the user configure the output path.

            fsHelper.saveFileToPath('data', textToSave, fileName);

        } catch(error) {
            console.log(chalk.red('Error:'));
            console.log(error);
        }
    
    });
};