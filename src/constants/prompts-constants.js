
export const prompts = {
    someShots: {
        system: (progLanguage, progFramework, testFramework, externalContext) => `
                ${contexts.contextA(progLanguage, testFramework, externalContext)}
                ${constraints.constraintA()}
            `
        ,
        user: (testedCode) => `
            ${tasks.taskA()}
            ${testedCode}
        `
    }
}

const constraints = {
    constraintA: () => `
            - You must output only the tests, do not output other information
            - Write clean and easy to understand code
    `
}

const examples = {
    samples1: () => `
        
    `
}

const contexts = {
    contextA: (progLanguage, testFramework, progFramework) => {
        return `
            Write unit tests following these instructions
            1) the programming language used is ${progLanguage}
            2) the test framework must be ${testFramework}
            3) the programming framework used is the code is ${progFramework}
        `
    }
}

const tasks = {
    taskA: () => {
        return `Write unit test for the following code:`
    }
}