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
			aiAssistant.openAI
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

const testFileQuestions = [
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
]

export const commandsConstants = {
	configureQuestions: [
		...configOptions,
	],
	inputFileQuestions: [
		...inputFileQuestions,
		...configOptions,
	],
	inputFileQuestionsNoConfig: [...inputFileQuestions],
	testFileQuestionsNoConfig: [...testFileQuestions],
	contextQuestion: [
		{
			type: 'editor',
			name: "externalContext",
			message: "Provide external context (such as folder structure, models and services)"
		},
	],
	singleInputQuestion: [
		{
			type: "editor",
			name: "method",
			message: "Provide the method to be tested"
		},
	]
}