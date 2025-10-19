const fs = require("fs");
const os = require("os");

const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(message) {
        this.emit("Message", { message });
    }
}

const logger = new Logger();
const log_file = "./eventlog.txt";

const log_to_file = (event) => {
    const log_message = `${new Date().toISOString()} - ${event.message}`;
    fs.appendFileSync(log_file, log_message);
}