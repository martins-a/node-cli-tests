import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import {assureOllamaIsOn, checkIsInstalled} from '../utils/helpers.js';
import {promptFactory} from "../prompts/prompt-factory.js";
import {commandsConstants} from "../constants/commands-constants.js";
import {fsHelper} from "../utils/fs-helper.js";
import {connectorsRouter} from "../connectors/connector-router.js";

export const testInput = () => {

    program.command('test-input')
    .description('Test a given method')
    .option('-p', '--preference', false)
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

            console.log(chalk.green('Tests are being generated...'));

			const { method, externalContext, language, programmingFramework, testFramework, aiAssistant } = { ...cachedOptions, ...userInput };

            const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(
				language,
				programmingFramework,
				testFramework,
				method,
				externalContext
            );


            console.log(systemPrompt);
            console.log(userPrompt);
            const llmResponse = await connectorsRouter.resolve(aiAssistant, systemPrompt, userPrompt);

            const fileName = `tests_output_${Date.now()}`;
            // TODO: let the user configure the output path.

            fsHelper.saveFileToPath('data', llmResponse, fileName);

        } catch(error) {
            console.log(chalk.red('Error:'));
            console.log(error);
        }
    
    });
};