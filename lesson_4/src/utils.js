const fs = require('fs');
const inquirer = require('inquirer');
const readline = require("readline")

const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileNamesInDirectory = async (directory) => {
    const itemsInDirectory = await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            resolve(data);
        });
    });

    return itemsInDirectory;
}

const promptUser = async (choices) => {
    const optionKey = 'optionKey';

    const result = await inquirer.prompt([{
        name: optionKey,
        type: 'list',
        message: 'Please choose a file to read',
        choices,
    }]);

    return result[optionKey];
}

const showFileContents = async (filepath, pattern) => {
    let i = 0;
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filepath, 'utf-8');

        const rl = readline.createInterface({
            input: stream,
            output: process.stdout,
            terminal: false
        });

        rl.on('line', function (line) {
            if (line.indexOf(pattern) > 0) {
                console.log(line);
            }
        });
    });
}

module.exports = {
    getFileNamesInDirectory,
    promptUser,
    showFileContents,
    isFile,
}
