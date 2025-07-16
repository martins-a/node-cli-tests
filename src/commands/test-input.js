import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import fs from 'fs';
import path from 'path';
import {assureOllamaIsOn, checkIsInstalled} from '../utils/helpers.js';
import {promptFactory} from "../prompts/prompt-factory.js";

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
                        type: 'editor',
                        name: "externalContext",
                        message: "Provide external context"
                    }
                    /*{
                        type: "list",
                        name: "language",
                        message: "Select a programming language",
                        choices: [
                            'Javascript'
                        ]
                    }*/
             ]);

            //console.log(chalk.green('Tests are being generated...'));

            // TODO: let the user select all parameters or configure and save then
            const [systemPrompt, userPrompt ] = promptFactory.testSingleMethod(
                'typescript',
                'angular 20',
                'jest',
                userAnswer.method,
                userAnswer.externalContext
            );

            // TODO: let the user select the model
            // TODO: create the connector layer
            const llmResponse = await ollama.chat({
                model: 'qwen2.5-coder:1.5b',
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
            const filePath = path.join('data', fileName);

            // TODO: create a file-helper
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