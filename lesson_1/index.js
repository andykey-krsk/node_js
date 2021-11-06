const colors = require("colors");

const colorList = ['green', 'yellow', 'red'];

const arg_1 = Number(process.argv[2])
const arg_2 = Number(process.argv[3])

if (isNaN(arg_1)) {
    console.log(colors.red.bold(process.argv[2]) + ' - этот аргумент не является числом');
    process.exit(0)
}

if (isNaN(arg_2)) {
    console.log(colors.red.bold(process.argv[3]) + ' - этот аргумент не является числом');
    process.exit(0)
}

const isPrime = (number) => {
    if (number <= 1) return false;

    if (number <= 3) return true;

    for (let div = 2; div < number; div++) {
        if (number % div === 0) return false;
    }

    return true;
}

function getPrimeList(start, finish) {
    const result = []
    for (let i = start; i <= finish; i++) {
        if (isPrime(i)) result.push(i);
    }
    return result;
}

function output(primeList) {
    if (primeList.length === 0) {
        console.log(colors.red.bold('В заданном диапазоне нет простых чисел'));
        process.exit(0);
    }

    let colorIndex = 0;
    for (let i = 0; i <= primeList.length - 1; i++) {
        console.log(colors[colorList[colorIndex]](primeList[i]));
        colorIndex = colorIndex + 1 === colorList.length ? 0 : colorIndex + 1;
    }

}

const primeList = getPrimeList(arg_1,arg_2);

output(primeList);
