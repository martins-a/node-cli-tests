import os from 'os';
import { exec } from 'child_process';
import chalk from "chalk";

export const findFunctionsByAnnotation = (fileContent, annotation) => {
    try {

        const lines = fileContent.split('\n');
        let i = 0;
        const functions = [];

        //console.log(chalk.red('functions will be parsed - total lines:'));
        //console.log(lines.length);

        while (i < lines.length) {

            const line = lines[i].trim();
            if (line === annotation) {

                console.log(chalk.red('found a function to be tested...'));

                const fnLines = [];

                let braceCount = 0;
                let foundStart = false;

                while (i < lines.length ) {

                    i++;
                    let currentLine = lines[i];
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
        }

        return functions;

    } catch(error) {
        console.error(error);
        throw error;
    }
}