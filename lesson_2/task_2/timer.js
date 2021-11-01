class Timer {
    start = null;
    remainingTime = null;


    constructor(props) {
        this.set = props.set;
        this.status = props.status;
    }

    run() {
        if (this.status === null){
            this.status = 'started';
            this.start = Date.now();
            this.remainingTime = this.set - Math.floor((Date.now() - this.start)/1000);
        }
    }
}

module.exports = {Timer};
