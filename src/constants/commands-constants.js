import {aiAssistant} from "./ai-assistants.js";
import {programmingFrameworks} from "./programming-frameworks.js";
import {programmingLanguages} from "./programming-languages.js";
import {testFrameworks} from "./test-frameworks.js";

const configOptions = [
	{
		type: "list",
		name: "language",
		message: "Select a programming language",
		choices: [
			programmingLanguages.typescript
		]
	},
	{
		type: "list",
		name: "programmingFramework",
		message: "Select a programming framework",
		choices: [
			programmingFrameworks.angular20
		]
	},
	{
		type: "list",
		name: "testFramework",
		message: "Select a test framework",
		choices: [
			testFrameworks.jest
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
		name: "code",
		message: "Provide the code to be tested"
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
			name: "code",
			message: "Provide the code to be tested"
		},
	],
	continueConversation: [
		{
			name: "continueConversation",
			message: "Continue Conversation?",
			default: false,
			type: "confirm",
		}
	],
	addMoreInformation: [
		{
			name: "task",
			message: "Add more information",
			type: "editor"
		}
	]

}