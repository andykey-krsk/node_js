const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30.44 * DAY;
const YEAR = 12 * MONTH;

const getSeconds = (date) => {
    let [hors, days, months, years] = date.split('-');
    return (hors * HOUR) + (days * DAY) + (months * MONTH) + (years * YEAR);
}

const secondToString = (time) => {
    let years, months, days, hours, minutes, seconds = 0
    if (time > 0) {
        years = Math.floor(time / YEAR);
        time -=  years * YEAR;
        months = Math.floor(time / MONTH);
        time -=  months * MONTH;
        days = Math.floor(time / DAY);
        time -=  days * DAY;
        hours = Math.floor(time / HOUR);
        time -=  hours * HOUR;
        minutes = Math.floor(time / MINUTE);
        seconds = Math.round(time - minutes * MINUTE).toString().padStart(2, 0);

    }
    return `${years} years ${months} months ${days} days 
            ${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds}`
}

module.exports = {getSeconds, secondToString};
