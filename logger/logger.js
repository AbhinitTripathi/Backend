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

// Costantly istening to an event named "message"
logger.on("message", log_to_file);

setInterval(() => {
    const memory_usage = (os.freemem() / os.totalmem()) * 100;
    logger.log(`Current Memory Usage: ${ memory_usage.toFixed(2) }`);
}, 3000)

logger.log("Application started");
logger.log("Application event occured");