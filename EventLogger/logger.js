const fs = require("fs");
const os = require("os");

// whole event is a class
const EventEmitter = require("events");
const { log } = require("console");

class Logger extends EventEmitter {
  log(message) {
    this.emit("message", { message }); // emit --> broadcasting
  }
}

const logger = new Logger();
const logFile = "./eventlog.txt";

// method to grab data
const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message} \n`;
  fs.appendFileSync(logFile, logMessage);
};

// "message" event happening, execute "logToFile"
logger.on("message", logToFile);

// run method after certain interval
setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100; //
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);
}, 3000); // 3 sec

logger.log("Application started");
logger.log("Application event occured");
