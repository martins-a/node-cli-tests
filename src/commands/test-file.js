import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import fs from 'fs';
import path from 'path';
import {findFunctionsByAnnotation} from "../utils/helpers.js";
import {validationMiddleware} from "../validation/validation-middleware.js";
import {fsHelper} from "../utils/fs-helper.js";
import {fileURLToPath} from "url";
import {commandsConstants} from "../constants/commands-constants.js";
import {connectorsRouter} from "../connectors/connector-router.js";
import {promptFactory} from "../prompts/prompt-factory.js";

const annotationText = "//testbot";

export const testFile = () => {
    try {

        program.command('test-file')
            .description('Test the methods on a given file')
            .action(async () => {

                // TODO: refactoring

                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const grandParentDir = path.resolve(__dirname, '..', '..');

                let cachedOptions = fsHelper.readJsonSync(path.join(grandParentDir, 'data/configurations.json'));

                await validationMiddleware.validate(cachedOptions);

                const userAnswer = await inquirer.prompt(commandsConstants.testFileQuestionsNoConfig);

                let fileContent = fsHelper.readFileFromPath(userAnswer.path, userAnswer.pathType === 'relative');

                //console.log(chalk.red('file content...'));
                //console.log(fileContent);

                const functions = findFunctionsByAnnotation(fileContent, annotationText);

                //console.log(chalk.red('I parsed the functions...'));

                const responses = [];
                for (const fn of functions) {
                    const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(fn);
                    const llmResponse = await connectorsRouter.resolve(null, systemPrompt, userPrompt);
                    responses.push(llmResponse);
                }
                const output = responses.join('\n\n');

                //console.log(chalk.red('output...'));
                //console.log(output);

                // TODO: let the user configure the output path.
                const fileName = `tests_output_${Date.now()}`;

                fsHelper.saveFileToPath(path.join(grandParentDir, 'data'), output, fileName);

            })
    } catch(error) {
        console.log(error);
    }
}