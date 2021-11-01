// Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111,
// а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”.

const fs = require("fs")
const path = require("path")
const {EOL} = require("os")

const fileEnding = '_requests.log';

const ipAddresses = ['89.123.1.41', '34.48.240.111'];

const logFiles = ipAddresses.map(string => string.replace(/\./g, "-") + fileEnding);

const writeStreams = [];

let rest = '';

const readStream = new fs.ReadStream(path.join(__dirname, './access.log'), 'utf8');

logFiles.forEach((logFile) => {
    writeStreams.push(fs.createWriteStream(path.join(__dirname, `./${logFile}`), {flags: 'as+', encoding: 'utf8'}))
})

const chunkToArray = (chunk) => {
    return chunk.split("\n").filter(item => item ? true : false)
}

const sortAndWriteLog = (logString) => {
    ipAddresses.forEach((ipAddress, index) => {
        if (logString.includes(ipAddress)) {
            writeStreams[index].write(`${logString}${EOL}`);
        }
    })
}

readStream.on('data', (chunk) => {
    chunk = rest + chunk;
    let chunkArray = chunkToArray(chunk)
    rest = chunkArray.pop();
    chunkArray.forEach(logString => sortAndWriteLog(logString))
});

readStream.on('end', () => {
    if (rest) {
        sortAndWriteLog(rest);
        rest = EOL;
    }

    logFiles.forEach((logFile, index) => {
        writeStreams[index].end(() => console.log(`File ${logFile} writing finished`))
    })
});
