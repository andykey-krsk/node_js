const {eventEmitter} = require('./MyEventEmitter');
const {Timer} = require('./timer');
const {getSeconds, secondToString} = require('./utils');

const EVENT_TIMER_STARTED = 'started';
const EVENT_TIMER_STOPPED = 'stopped';
const EVENT_ALL_TIMER_STOPPED = 'all stopped';

eventEmitter.on(EVENT_TIMER_STOPPED, timerId => {
    console.log(`Timer №${timerId + 1}, stopped.`)
});
eventEmitter.on(EVENT_TIMER_STARTED, timerId => {
    console.log(`Timer №${timerId + 1}, ststus: ${timers[timerId].status}, remaining time ${secondToString(timers[timerId].remainingTime)}`)
});
eventEmitter.on(EVENT_ALL_TIMER_STOPPED, () => {
    console.log('All timers stopped');
});

const timers = []

process.argv.forEach((date, i) => {
    const timeInSeconds = getSeconds(date);

    if (!isNaN(timeInSeconds)) {
        timers.push(new Timer({set: timeInSeconds, status: null}))
    }
})

timers.forEach(timer => timer.run())

const interval = setInterval(() => {
    let countTimer = timers.length

    timers.forEach((timer, timerId) => {
        timer.remainingTime = Math.floor(timer.set - (Date.now() - timer.start)/1000);

        if (timer.remainingTime <= 0) {
            if (timer.status != 'stopped') timer.status = 'stopped';
            eventEmitter.emit(EVENT_TIMER_STOPPED, timerId);
        }
        if (timer.remainingTime > 0) {
            eventEmitter.emit(EVENT_TIMER_STARTED, timerId);
        }

        if (timer.status === 'stopped') {
            countTimer--;
        }
    })

    if (!countTimer) {
        clearInterval(interval);
        eventEmitter.emit(EVENT_ALL_TIMER_STOPPED);
    }

}, 1000)
