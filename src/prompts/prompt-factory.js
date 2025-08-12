
import { prompts } from '../constants/prompts-constants.js';

export const promptFactory = {
    testSingleMethod: (progLanguage, progFramework, testFramework, testedCode) => {
        const prompt = prompts.promptA;
        return [
            prompt.system(progLanguage, progFramework, testFramework),
            prompt.user(testedCode)
        ]
    }
}