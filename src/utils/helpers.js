import os from 'os';
import { exec } from 'child_process';

export const checkIsInstalled = (programName) => {
    const command =  os.platform() === 'win32' ? `where ${programName}` : `which ${programName}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log('Is not installed.');
        } else {
            console.log('Is installed.');
        }
    })
}

export const assureOllamaIsOn = () => {
    return new Promise((resolve, reject) => {
        const command = 'ollama ps';
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log('Ollama is not running.');
                reject();
            } else {
                console.log('Ollama is running.');
                resolve();
            }
        })
    });
}