const fs = require('fs')
const os = require('os')

// whole event is a class
const EventEmitter = require('events') 

class Logger extends EventEmitter{
    log(message){
        this.emit('message', {message}) // emit - broadcast 
    }
}

const logger = new Logger()
const logFile = './eventlog.txt'

