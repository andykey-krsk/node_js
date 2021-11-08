const express = require('express');
const path = require('path');
const {getFileNamesInDirectory, promptUser, showFileContents, isFile} = require('./utils');

const app = express();

let CWD = process.cwd();

const viewFolder = async (folder) => {
    console.log(folder);
    const filesInCwd = await getFileNamesInDirectory(folder);
    const userInput = await promptUser(filesInCwd);
    if (isFile(path.join(folder, userInput))) {
        //показать файл
        await showFileContents(path.join(folder, userInput));
    } else {
        //зайти в папку и показать файлы
        console.log(path.join(folder, userInput));
        //viewFolder(path.join(folder, userInput));
    }
};

app.get('/', (request,response) => {
    //const {folder} = app.query;
    //response.send(folder);
    response.send(viewFolder(CWD));
});

app.listen(3000, 'localhost', () => {
    console.log('Server listen http://localhost:3000');
    console.log('Current directory', CWD);
})


