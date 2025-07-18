
export const commandsConstants = {
	configureQuestions: [
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
		}
	],
	inputFileQuestions: [
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
		}
	]
}