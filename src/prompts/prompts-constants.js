
export const prompts = {
    singleMethod_01: {
        system: (progLanguage, progFramework, testFramework, externalContext) => {
            return `
                Given the following aspects of the method being tested:
                - Programming Language: ${progLanguage}
                - Programming Framework: ${progFramework}
                - Test Framework: ${testFramework}
                And the following rules:
                - Write easy to read code
                - Output only the test, no more information
                Use these information to help writing the test:
                ${externalContext}
            `
        },
        user: (testedCode) => {
            return `
                Create a unit test for the following code:
                ${testedCode}
            `
        }
    }
}