import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import {promptFactory} from "../prompts/prompt-factory.js";
import {commandsConstants} from "../constants/commands-constants.js";
import {fsHelper} from "../utils/fs-helper.js";
import {connectorsRouter} from "../connectors/connector-router.js";
import {validationMiddleware} from "../validation/validation-middleware.js";
import {fileURLToPath} from "url";
import path from "path";
import {countTokens} from "../utils/helpers.js";
import {getCurrentModel} from "../constants/current-model.js";

export const testInput = () => {

    program.command('test-input')
    .option('-c, --context', 'Request external context')
	.option('-m, --multiturn', 'Use multiturn to multiple requests in the same conversation')
    .description('Test a given method')
    .action(async (opts) => {

        try {

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const grandParentDir = path.resolve(__dirname, '..', '..');

            let cachedOptions = fsHelper.readJsonSync(path.join(grandParentDir, 'data/configurations.json'));

            await validationMiddleware.validate(cachedOptions);

			let userInput = {};
			if (opts.context) {
            	userInput = await inquirer.prompt(commandsConstants.inputFileQuestionsNoConfig);
			} else {
				// noinspection JSCheckFunctionSignatures
				userInput = await inquirer.prompt(commandsConstants.singleInputQuestion);
			}

            console.log(chalk.green('Tests are being generated...'));

			const { code, externalContext="", language, programmingFramework, testFramework, aiAssistant, outputPath } = { ...cachedOptions, ...userInput };

            const [systemPrompt, userPrompt] = promptFactory.testCode(
				language,
				programmingFramework,
				testFramework,
				code
            );

			const inputTokens = countTokens(systemPrompt+userPrompt+externalContext,getCurrentModel(aiAssistant));
			console.log(chalk.bgCyan(`Input tokens: ${inputTokens}`));

			console.log(chalk.cyan(`Using the model: ${getCurrentModel(aiAssistant)}`));

            const llmResponse = await connectorsRouter.resolve(aiAssistant, systemPrompt, userPrompt, "", externalContext);

			const outputTokens = countTokens(llmResponse,getCurrentModel(aiAssistant));
			console.log(chalk.bgCyan(`Output tokens: ${outputTokens}`));

            const fileName = `tests_output_${Date.now()}`;

            fsHelper.saveFileToPath(outputPath || path.join(grandParentDir, 'data'), llmResponse, fileName);

			if ( opts.multiturn ) {

				while(true) {
					const checkContinue = await inquirer.prompt(commandsConstants.continueConversation);

					console.log(checkContinue.continueConversation);

					if ( checkContinue.continueConversation ) {

						const nextTask = await inquirer.prompt(commandsConstants.addMoreInformation);
						const nextLlmResponse = await connectorsRouter.resolve(
							aiAssistant,
							systemPrompt,
							userPrompt,
							externalContext,
							llmResponse,
							nextTask.task
						);

						fsHelper.saveFileToPath(outputPath || path.join(grandParentDir, 'data'), nextLlmResponse, `tests_output_${Date.now()}`);
					} else {
						break;
					}
				}

			}


        } catch(error) {
            console.log(chalk.red('Error:'));
            console.log(error);
        }
    
    });
};