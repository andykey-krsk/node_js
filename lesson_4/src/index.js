#!/usr/bin/env node

const path = require('path');
const {getFileNamesInDirectory, promptUser, showFileContents, isFile} = require('./utils');
const yargs = require('yargs');

const options = yargs
    .usage("Usage: -p path")
    .option(
        "p",
        {
            alias: "path",
            describe: "Path to file",
            type: "string",
            demandOption: false,
        })
    .option(
        "P",
        {
            alias: "pattern",
            desctibe: "Search pattern",
            type: "string",
            demandOption: false,
        }
    )
    .argv;

let CWD = options.path ? options.path : process.cwd();

if (process.argv[2]){
    if (process.argv[2][0] !== '-') {
        CWD = path.join(process.cwd(), process.argv[2]);
    }
}

const pattern = options.pattern || "";

const viewFolder = async (folder) => {
    const filesInCwd = await getFileNamesInDirectory(folder);
    const userInput = await promptUser(filesInCwd);
    if (isFile(path.join(folder, userInput))) {
        await showFileContents(path.join(folder, userInput), pattern);
    } else {
        viewFolder(path.join(folder, userInput));
    }
};

viewFolder(CWD);
