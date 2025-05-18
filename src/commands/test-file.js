import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import fs from 'fs';
import path from 'path';
import {assureOllamaIsOn, checkIsInstalled} from "../utils/helpers.js";

export const testFile = () => {
    try {

        program.command('test-file')
            .description('Test the methods on a given file')
            .action(async () => {

                checkIsInstalled('ollama');
                await assureOllamaIsOn();

                const userAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'pathType',
                        message: 'Select the type of path',
                        choices: [
                            'relative',
                            'absolute'
                        ]
                    },
                    {
                        type: 'input',
                        name: 'path',
                        message: "Where's your file located?"
                    }
                ]);

                let fileContent = '';
                if (userAnswer.pathType === 'relative') {
                    fileContent = fs.readFileSync(userAnswer.path, 'utf8');
                } else {
                    const absolutePath = path.join(__dirname, userAnswer.path);
                    fileContent = fs.readFileSync(absolutePath, 'utf8');
                }

                //console.log(chalk.red('file content...'));
                //console.log(fileContent);

                const lines = fileContent.split('\n');
                let i = 0;
                const functions = [];

                //console.log(chalk.red('functions will be parsed - total lines:'));
                //console.log(lines.length);

                while (i < lines.length) {

                    const line = lines[i].trim();
                    if (line === '//testbot') {

                        console.log(chalk.red('found a function to be tested...'));

                        const fnLines = [];

                        let braceCount = 0;
                        let foundStart = false;

                        while (i < lines.length ) {

                            i++;
                            let currentLine = lines[i];
                            //console.log(`line index is ... : ${i}`);
                            fnLines.push(currentLine);

                            // Detect if the function started (to start counting braces)
                            if (!foundStart && currentLine.includes('{')) {
                                foundStart = true;
                            }

                            // Count braces to detect the end of a function
                            if (foundStart) {
                                braceCount += (currentLine.match(/{/g) || []).length;
                                braceCount -= (currentLine.match(/}/g) || []).length;

                                if (braceCount === 0) {
                                    break;
                                }
                            }

                        }

                        functions.push(fnLines.join('\n').trim());

                    }

                    i++;
                    //console.log(`line index is ... : ${i}`);
                }

                //console.log(chalk.red('I parsed the functions...'));

                const responses = [];
                for (const fn of functions) {
                    console.log(fn);
                    const llmResponse = await ollama.chat({
                        model: 'llama3.2',
                        messages: [
                            {
                                role: 'system',
                                content: 'Output only the test methods'
                            },
                            {
                                role: 'user',
                                content: `Write a unit test for the following method that is written in javascript: ${fn}`
                            }
                        ]
                    });
                    responses.push(llmResponse.message.content);
                }

                const output = responses.join('\n\n');
                //console.log(chalk.red('output...'));
                //console.log(output);

                // TODO: let the user configure the output path.
                const fileName = `tests_output_${Date.now()}`;
                const filePath = path.join('data', fileName);

               fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                    if (err) {
                        console.error('Error creating directory:', err);
                        return;
                    }

                    fs.writeFile(filePath, output, (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                            return;
                        }
                        console.log('Text saved successfully to', filePath);
                    });
                });

            })
    } catch(error) {
        console.log(error);
    }
}