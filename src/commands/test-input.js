import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import fs from 'fs';
import path from 'path';
import {assureOllamaIsOn, checkIsInstalled} from '../utils/helpers.js';

export const testInput = () => {

    program.command('test-input')
    .description('Test a given method')
    .action(async () => {

        try {

            checkIsInstalled('ollama');
            await assureOllamaIsOn();

             const userAnswer = await inquirer.prompt([
                    {
                        type: "editor",
                        name: "method",
                        message: "Provide the method to be tested"
                    },
                    {
                        type: "list",
                        name: "language",
                        message: "Select a programming language",
                        choices: [
                            'Javascript'
                        ]
                    }
             ]);

            //console.log(chalk.green('Tests are being generated...'));

            const llmResponse = await ollama.chat({
                model: 'llama3.2',
                messages: [
                    {
                        role: 'system',
                        content: 'Output only the test methods'
                    },
                    {
                        role: 'user',
                        content: `Write a unit test for the following method that is written in ${userAnswer.language}: ${userAnswer.method}`
                    }
                ]
            });

            const textToSave = llmResponse.message.content;

            const fileName = `tests_output_${Date.now()}`;
            // TODO: let the user configure the output path.
            const filePath = path.join('data', fileName);

            fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                    return;
                }

                fs.writeFile(filePath, textToSave, (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('Text saved successfully to', filePath);
                });
            });

        } catch(error) {
            console.log(chalk.red('Error:'));
            console.log(error);
        }
    
    });
};