#!/usr/bin/env node

// ^ a linha acima é chamada de shebang e serve para indicar ao sistema operacional que o script deve ser executado usando o interpretador Node.js
// util para Quando você quer que seu arquivo JavaScript seja executado diretamente via terminal, como um script

import { program } from "commander"; //The complete solution for node.js command-line interfaces
import chalk from "chalk"; // add color to outputs
import inquirer from "inquirer"; // Prompting Made Easy
import ora from "ora";
import figlet from "figlet";
import ollama from 'ollama';
import fs from 'fs';
import path from 'path';

// program
//   .version("1.0.0")
//   .description("My Node CLI")
//   .option("-n, --name <type>", "Add your name")
//   .action((options) => {
//     console.log(chalk.blue(`Hey, ${options.name}!`));
//     console.log(chalk.green(`Hey, ${options.name}!`));
//     console.log(chalk.red(`Hey, ${options.name}!`));
// });

console.log(
    chalk.yellow(figlet.textSync("My Node CLI", { horizontalLayout: "full" }))
);

program.version("1.0.0").description("My Node CLI");

// program.action(() => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "name",
//         message: "What's your name?",
//       },
//     ])
//     .then((answers) => {
//       console.log(chalk.green(`Hey there, ${answers.name}!`));
//     });
// });

// const response = await ollama.chat({
//     model: 'llama3.1',
//     messages: [{ role: 'user', content: 'Why is the sky blue?' }],
//   })
//   console.log(response.message.content)

program.action(() => {

    inquirer
        .prompt([
            {
                type: "input",
                name: "method",
                message: "What method do you want to test?"
            },
            {
                type: "input",
                name: "language",
                message: "What is the programming language of this code?"
            }
        ])
        .then((answer => {
            ollama.chat({
                model: 'llama3.2',
                messages: [
                    {
                        role: 'system',
                        content: 'Output only the test methods'
                    },
                    {
                        role: 'user',
                        content: `Write a unit test for the following method that is written in ${answer.language}: ${answer.method}`
                    }
                ]
            }).then((chatResponse) => {

                console.log(chalk.green(`----------------------`));
                console.log(chatResponse);
                const textToSave = chatResponse.message.content;

                console.log('--------');
                console.log(typeof textToSave);
                

                const filePath = path.join('data', 'output.txt');

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

            });
        }));

});

// program.action(() => {
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "choice",
//           message: "Choose an option:",
//           choices: ["Option 1", "Option 2", "Option 3"],
//         },
//       ])
//       .then((result) => {
//         const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner
  
//         setTimeout(() => {
//           spinner.succeed(chalk.green("Done!"));
//         }, 3000);
//       });
// });



program.parse(process.argv);