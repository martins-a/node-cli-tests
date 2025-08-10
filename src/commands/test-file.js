import { program } from "commander";
import path from 'path';
import {findFunctionsByAnnotation} from "../utils/helpers.js";
import {validationMiddleware} from "../validation/validation-middleware.js";
import {fsHelper} from "../utils/fs-helper.js";
import {fileURLToPath} from "url";
import {connectorsRouter} from "../connectors/connector-router.js";
import {promptFactory} from "../prompts/prompt-factory.js";
import inquirer from "inquirer";
import {commandsConstants} from "../constants/commands-constants.js";

const annotationText = "//test-bot";

export const testFile = () => {
    try {

        program.command('test-file')
            .description('Test the methods on a given file')
            .argument('<string>', 'path to the file')
            .option('-c, --context', 'Request external context')
            .action(async (filePath, opts) => {

                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const grandParentDir = path.resolve(__dirname, '..', '..');

                let cachedOptions = fsHelper.readJsonSync(path.join(grandParentDir, 'data/configurations.json'));

                let userInput = {};
                // User wants to use additional external context
                if ( opts.context ) {
                    // noinspection JSCheckFunctionSignatures
                    userInput = await inquirer.prompt(commandsConstants.contextQuestion);
                }

                const { language, programmingFramework, testFramework, aiAssistant, outputPath, externalContext } =
                    { ...cachedOptions, ...userInput };

                await validationMiddleware.validate(cachedOptions);

                let fileContent = fsHelper.readFileFromPath(filePath, true);

                const functions = findFunctionsByAnnotation(fileContent, annotationText);

                const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(
                    language,
                    programmingFramework,
                    testFramework,
                    functions,
                    externalContext
                );

                const llmResponse = await connectorsRouter.resolve(aiAssistant, systemPrompt, userPrompt);

                const fileName = `tests_output_${Date.now()}`;

                fsHelper.saveFileToPath(outputPath || path.join(grandParentDir, 'data'), llmResponse, fileName);

            })
    } catch(error) {
        console.log(error);
    }
}