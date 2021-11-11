const fs = require('fs');

const isFile = (filepath) => {
    return fs.lstatSync(filepath).isFile();
}

const getFileNamesInDirectory = (directory) => {
    return fs.readdirSync(directory);
}

const listFolders = (nameArray, folder) => {
    let result = "<ul>";
    if (nameArray.length <= 0) {
        return 'no files';
    }

    nameArray.forEach(item => {
        result += "<li><a href=\'" + "?folder=" + folder + "\\" + item + "\'>" + item + "</a></li>";
    })
    return result + "</ul>";
}

const showFileContents = (filepath) => {
    const content = fs.readFileSync(filepath, 'utf-8');
    let result = `<p>${content}</p>`;

    return result.toString();
}

module.exports = {
    getFileNamesInDirectory,
    listFolders,
    showFileContents,
    isFile,
}
