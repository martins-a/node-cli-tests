
import { prompts } from '../constants/prompts-constants.js';

export const promptFactory = {
    testSingleMethod: (progLanguage, progFramework, testFramework, testedCode, externalContext) => {
        const prompt = prompts.someShots;
        return [
            prompt.system(progLanguage, progFramework, testFramework, externalContext),
            prompt.user(testedCode)
        ]
    }
}