import {aiAssistant} from "./ai-assistants.js";

const configOptions = [
	{
		type: "list",
		name: "language",
		message: "Select a programming language",
		choices: [
			'Javascript',
			'Typescript'
		]
	},
	{
		type: "list",
		name: "programmingFramework",
		message: "Select a programming framework",
		choices: [
			'Angular 20'
		]
	},
	{
		type: "list",
		name: "testFramework",
		message: "Select a test framework",
		choices: [
			'Jest'
		]
	},
	{
		type: "list",
		name: "aiAssistant",
		message: "Select the AI assistant",
		choices: [
			aiAssistant.ollama,
			aiAssistant.claudeAI,
		]
	},
	{
		type: "input",
		name: "outputPath",
		message: "Configure the output path (use a absolute path)",
	}
]

const inputFileQuestions = [
	{
		type: "editor",
		name: "method",
		message: "Provide the method to be tested"
	},
	{
		type: 'editor',
		name: "externalContext",
		message: "Provide external context"
	},
]

export const commandsConstants = {
	configureQuestions: [
		...configOptions,
	],
	inputFileQuestions: [
		...inputFileQuestions,
		...configOptions,
	],
	inputFileQuestionsNoConfig: [...inputFileQuestions]
}