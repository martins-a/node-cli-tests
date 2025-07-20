

import fs from 'fs';
import path from 'path';
import chalk from "chalk";

export const fsHelper = {
	saveFileToPath: (filePath, fileData, fileName=null) => {
		try {

			let finalPath = fileName ? path.join(filePath, fileName) : filePath;

			console.log(chalk.yellow(finalPath));

			const dir = path.dirname(filePath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {recursive: true});
			}

			fs.writeFileSync(finalPath, fileData, 'utf8');
			console.log(chalk.green(`File successfully saved on: ${finalPath}`));
		} catch (error) {
			console.error(chalk.red(`Error saving the file`,  error));
		}
	},
	readJsonSync: (filePath) => {
		try {
			if (!fs.existsSync(filePath)) {
				throw new Error(`File ${filePath} does not exist!`);
			}

			const dataRaw = fs.readFileSync(filePath, 'utf8');

			return JSON.parse(dataRaw);

		} catch (error) {
			console.error(chalk.red(`Error reading file`,  error));
			return null;
		}
	}
}