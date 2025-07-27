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

export const testInput = () => {

    program.command('test-input')
    .description('Test a given method')
    .option('-p', '--preference', false)
    .action(async (_, args) => {

        try {

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const grandParentDir = path.resolve(__dirname, '..', '..');

            const opts = args.opts();

            let cachedOptions = fsHelper.readJsonSync(path.join(grandParentDir, 'data/configurations.json'));

            await validationMiddleware.validate(cachedOptions);

            let userInput = {};

            if (opts.p || opts.preference) {
                userInput = await inquirer.prompt(commandsConstants.inputFileQuestions);
            } else {
                userInput = await inquirer.prompt(commandsConstants.inputFileQuestionsNoConfig);
            }

            console.log(chalk.green('Tests are being generated...'));

			const { method, externalContext, language, programmingFramework, testFramework, aiAssistant, outputPath } = { ...cachedOptions, ...userInput };

            const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(
				language,
				programmingFramework,
				testFramework,
				method,
				externalContext
            );


            const llmResponse = await connectorsRouter.resolve(aiAssistant, systemPrompt, userPrompt);

            const fileName = `tests_output_${Date.now()}`;

            fsHelper.saveFileToPath(outputPath || path.join(grandParentDir, 'data'), llmResponse, fileName);

        } catch(error) {
            console.log(chalk.red('Error:'));
            console.log(error);
        }
    
    });
};