#!/usr/bin/env node

// ^ a linha acima é chamada de shebang e serve para indicar ao sistema operacional que o script deve ser executado usando o interpretador Node.js
// util para Quando você quer que seu arquivo JavaScript seja executado diretamente via terminal, como um script

import { program } from "commander"; //The complete solution for node.js command-line interfaces
import chalk from "chalk"; // add color to outputs
import inquirer from "inquirer"; // Prompting Made Easy
import ora from "ora";
import figlet from "figlet";

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

program.action(() => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Choose an option:",
          choices: ["Option 1", "Option 2", "Option 3"],
        },
      ])
      .then((result) => {
        const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner
  
        setTimeout(() => {
          spinner.succeed(chalk.green("Done!"));
        }, 3000);
      });
});

program.parse(process.argv);