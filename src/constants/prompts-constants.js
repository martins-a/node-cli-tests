import {programmingFrameworks} from "./programming-frameworks.js";
import {testFrameworks} from "./test-frameworks.js";

export const prompts = {
    promptA: {
        system: (progLanguage, progFramework, testFramework) => `
        ${contexts.contextA(progLanguage, testFramework, progFramework)}
${constraints.constraintA()}
${examples.exampleA(progFramework,testFramework)}`
        ,
        user: (codeToTest) => `
${tasks.taskA(codeToTest)}
        `
    }
}

const examples = {
    exampleA: (progFramework,testFramework) => {
        if (progFramework===programmingFrameworks.angular20 && testFramework===testFrameworks.jest) {
        return `
You can use these examples as a reference:
const fn = jest.fn().mockReturnValue('mocked')
jest.spyOn(obj, 'method').mockResolvedValue(123)
jest.spyOn(obj, 'syncMethod').mockReturnValue('ok')
jest.mock('./service', () => ({ get: jest.fn(() => 'data') }))
jest.mock('./service', () => ({ fetch: jest.fn().mockResolvedValue([]) }))
jest.mock('./Widget', () => () => null)
jest.requireMock('./service').get.mockReturnValue('x')
jest.fn().mockImplementation(x => x * 2)
jest.mocked(api.call).mockResolvedValue(true)
    ` }
        return "";
    }
}

const constraints = {
    constraintA: () => `- You must output only the tests, do not output other information
- Write clean and easy to understand code`
}

const contexts = {
    contextA: (progLanguage, testFramework, progFramework) => {
        return `
Write unit tests following these instructions
- the programming language used is "${progLanguage}"
- IMPORTANT: the test framework must be "${testFramework}", do not use another test framework
- the programming framework used is the code is "${progFramework}"`
    }
}

const tasks = {
    taskA: (codeToTest) => {
return `Write unit test for the following code:
\`\`\`
${codeToTest}
\`\`\`
`
    }
}