import { program } from "commander";
import inquirer from "inquirer";
import ollama from "ollama";
import chalk from "chalk";
import fs from 'fs';
import path from 'path';

export const testFile = () => {
    program.command('test-file')
        .description('Test the methods on a given file')
        .action(async() => {

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
            if ( userAnswer.pathType === 'relative' ) {
                fileContent = fs.readFileSync(userAnswer.path, 'utf8');
            } else {
                const absolutePath = path.join(__dirname, userAnswer.path);
                fileContent = fs.readFileSync(absolutePath, 'utf8');
            }

            console.log(fileContent);

    })
}