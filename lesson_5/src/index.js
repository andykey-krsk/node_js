const express = require('express');
const path = require('path');
const {getFileNamesInDirectory, listFolders, showFileContents, isFile} = require('./utils');

const app = express();

let CWD = process.cwd();

const viewFolder =(folder) => {
    if (isFile(path.join(folder))) {
        //показать файл
        return showFileContents(path.join(folder));
    } else {
        //зайти в папку и показать файлы
        const filesInCwd = getFileNamesInDirectory(path.join(folder));
        return listFolders(filesInCwd, folder);
    }
};

app.get('/',
    (
        request,
        response,
    ) => {
        let {folder} = request.query;

        if (!folder) {
            folder = CWD;
        }

        response.send(`view ${folder} directory <br><br> ${viewFolder(folder)}`);
    });

app.listen(3000, 'localhost', () => {
    console.log('Server listen http://localhost:3000');
    console.log('Current directory', CWD);
})
