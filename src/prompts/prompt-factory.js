
import { prompts } from './prompts-constants.js';

export const promptFactory = {
    testSingleMethod: (progLanguage, progFramework, testFramework, testedCode, externalContext) => {
        const prompt = prompts.singleMethod_01;
        return [
            prompt.system(progLanguage, progFramework, testFramework, externalContext),
            prompt.user(testedCode)
        ]
    }
}