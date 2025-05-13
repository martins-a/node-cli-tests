#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";

import {testInput} from "../src/commands/test-input.js";
import {testFile} from "../src/commands/test-file.js";

console.log(
    chalk.yellow(figlet.textSync("ChatBot is running", { horizontalLayout: "full" }))
);

program.version("1.0.0").description("My Node CLI");

// commands
testInput();
testFile();

program.parse(process.argv);