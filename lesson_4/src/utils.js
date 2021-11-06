const fs = require('fs');
const inquirer = require('inquirer');
const readline = require("readline");
const colors = require("colors");

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
    return new Promise((resolve) => {
        let i = 0;
        let finded = false;

        const stream = fs.createReadStream(filepath, 'utf-8');

        const rl = readline.createInterface({
            input: stream,
            output: process.stdout,
            terminal: false
        });

        rl.on('line', function (line) {
            i++;
            if (line.indexOf(pattern) > 0) {
                console.log(colors.green.bold(`В строке №${i} найден паттерн ${pattern}`));
                console.log(line);
                finded = true;
            }
        });

        stream.on('end', ()=> {
            if (!finded) console.log(colors.red.bold(`Паттерн - ${pattern} в файле не найден`));
        })

    });
}

module.exports = {
    getFileNamesInDirectory,
    promptUser,
    showFileContents,
    isFile,
}
