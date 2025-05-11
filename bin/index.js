#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";

import {testAMethod} from "../src/commands/test-a-method.js";

console.log(
    chalk.yellow(figlet.textSync("My Node CLI", { horizontalLayout: "full" }))
);

program.version("1.0.0").description("My Node CLI");

// commands
testAMethod();

program.parse(process.argv);